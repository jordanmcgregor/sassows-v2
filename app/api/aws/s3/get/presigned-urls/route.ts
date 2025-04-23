// File: /app/api/get-presigned-urls/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest) {
    try {
        const { files } = await req.json();

        if (!files || !Array.isArray(files) || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        // if (!fileType || (fileType !== 'image' && fileType !== 'video')) {
        //     return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        // }

        const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
        const region = process.env.NEXT_PUBLIC_AWS_REGION!;

        // Process each file info and generate presigned URLs in parallel
        const urlPromises = files.map(async (file) => {
            // Create a unique key for the file
            const fileExt = file.name.split('.').pop();
            const key = `${file.type}s/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

            // Create upload command
            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                ContentType: file.type,
            });

            // Get signed URL
            const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

            // Construct the public URL
            const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

            return {
                filename: file.name,
                uploadUrl,
                publicUrl,
                key,
                type: file.type,
            };
        });

        // Wait for all presigned URL generations to complete
        const urls = await Promise.all(urlPromises);

        return NextResponse.json({
            urls
        });
    } catch (error) {
        console.error('Error generating presigned URLs:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}