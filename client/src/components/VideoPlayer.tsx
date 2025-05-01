import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when URL changes
    setIsLoading(true);
    setError(null);
  }, [url]);

  const handleReady = () => {
    setIsLoading(false);
  };

  const handleError = (e: any) => {
    console.error("Video playback error:", e);
    setIsLoading(false);
    setError("Failed to load video. Please try again later.");
  };

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <Skeleton className="w-full h-full absolute" />
          <div className="text-white z-10">Loading video...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center p-4">{error}</div>
        </div>
      )}
      
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        onReady={handleReady}
        onError={handleError}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );
}
