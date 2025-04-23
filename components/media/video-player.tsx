'use client'
import { useEffect, useRef, useState } from "react";

export default function VideoPlayer({
    source,
    className = "", // Optional className prop
}: {
    source: string;
    className?: string; // Optional className prop
}) {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element
    const [thumbnail, setThumbnail] = useState<string | null>(null); // State for the thumbnail image
    const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to the canvas element

    // Generate a thumbnail from the first frame of the video
    useEffect(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            // Ensure video is fully loaded before capturing the thumbnail
            video.onloadeddata = () => {
                if (context) {
                    // Set the canvas size to match the video aspect ratio (optional: match the video size)
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    // Draw the first frame of the video onto the canvas
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Get the image data from the canvas as a data URL
                    const dataUrl = canvas.toDataURL();
                    setThumbnail(dataUrl); // Set the thumbnail state to the captured frame
                }
            };

            // Ensure to handle video loading properly
            video.load();
        }
    }, [source]);

    return (
        <div className={`w-full max-w-xl mx-auto ${className} relative aspect-[9/16]`}>
            {/* Canvas element to capture the video frame */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            {/* Video player */}
            <video ref={videoRef} controls autoPlay={false} className="w-full h-full object-cover rounded-lg shadow-md" poster={thumbnail || undefined}>
                <source src={source} type="video/quicktime" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
