import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video } from "@shared/schema";
import VideoPlayer from "./VideoPlayer";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  // Add keyboard event listener for escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Format video category
  const getCategoryName = (categoryId: number) => {
    const categories = {
      1: "3D Animation",
      2: "2D Animation",
      3: "Motion Graphics",
      4: "Cartoon",
      5: "Anime Style",
      6: "Character Animation"
    };
    return categories[categoryId as keyof typeof categories] || "Unknown";
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-white rounded-lg overflow-hidden">
        <div className="relative">
          {/* Video Player */}
          <div className="aspect-video bg-black relative">
            <VideoPlayer url={video.videoPath} />
          </div>
          
          {/* Video Details */}
          <div className="p-6">
            <h3 className="text-2xl font-bold font-poppins mb-2">{video.title}</h3>
            <p className="text-gray-600 mb-4">{video.description || "No description available."}</p>
            
            <div className="border-t border-b border-gray-200 py-4 my-4">

