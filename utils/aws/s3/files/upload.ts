import { createClient } from '@/utils/supabase/client';
import { media } from '@/types/supabase/media/types'

export const uploadToS3 = async (
    files: File[],
    recordId: number,
    foreign_key: string
): Promise<{ imageCount: number, videoCount: number, failCount: number }> => {
    const supabase = createClient()
    try {
        // Separate files by type for tracking purposes
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const videoFiles = files.filter(file => file.type.startsWith('video/'));
        const otherFiles = files.filter(file =>
            !file.type.startsWith('image/') && !file.type.startsWith('video/'));

        // Skip unsupported file types
        if (otherFiles.length > 0) {
            console.warn(`Skipping ${otherFiles.length} files with unsupported types`);
        }

        // Prepare all valid files for processing
        const validFiles = [...imageFiles, ...videoFiles];
        const fileMetadata = validFiles.map(file => ({
            name: file.name,
            type: file.type,
            size: file.size,
            mediaType: file.type.startsWith('image/') ? 'image' : 'video'
        }));

        // Only proceed if we have valid files
        if (fileMetadata.length === 0) {
            return {
                imageCount: 0,
                videoCount: 0,
                failCount: otherFiles.length
            };
        }

        // Get presigned URLs for all files in a single API call
        const urlsResponse = await fetch('/api/aws/s3/get/presigned-urls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ files: fileMetadata })
        });

        if (!urlsResponse.ok) {
            throw new Error(`Failed to get upload URLs: ${urlsResponse.statusText}`);
        }

        const { urls } = await urlsResponse.json();

        // Prepare for parallel uploads
        const uploadPromises = [];
        const mediaRecords: media[] = [];

        // Process all uploads
        for (const urlInfo of urls) {
            const file = validFiles.find(f => f.name === urlInfo.filename);
            if (file) {
                // Add to upload queue
                uploadPromises.push(
                    // Upload file using presigned URL
                    fetch(urlInfo.uploadUrl, {
                        method: 'PUT',
                        headers: { 'Content-Type': file.type },
                        body: file
                    }).then(res => {
                        if (res.ok) {
                            // Prepare database record for successful upload
                            mediaRecords.push({
                                [foreign_key]: recordId,
                                media_url: urlInfo.publicUrl,
                                filename: file.name,
                                s3_key: urlInfo.key,
                                media_type: file.type.startsWith('image/') ? 'image' : 'video',
                                content_type: file.type
                            });
                            return true;
                        }
                        return false;
                    }).catch(() => false)
                );
            }
        }

        // Wait for all uploads to complete in parallel
        const uploadResults = await Promise.all(uploadPromises);
        const successCount = uploadResults.filter(Boolean).length;
        const failCount = uploadResults.length - successCount + otherFiles.length;

        // Insert all successful media records in one batch
        if (mediaRecords.length > 0) {
            const { error: mediaError } = await supabase
                .from('media')  // Single table for all media
                .insert(mediaRecords);

            if (mediaError) {
                console.error('Error inserting media records:', mediaError);
                throw mediaError;
            }
        }

        // Count successful uploads by type
        const successfulImages = mediaRecords.filter(record => record.media_type === 'image').length;
        const successfulVideos = mediaRecords.filter(record => record.media_type === 'video').length;

        return {
            imageCount: successfulImages,
            videoCount: successfulVideos,
            failCount: failCount
        };

    } catch (error) {
        console.error('Error processing files:', error);
        return {
            imageCount: 0,
            videoCount: 0,
            failCount: files.length
        };
    }
};