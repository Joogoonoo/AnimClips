import { Video } from "@shared/schema";
import VideoCard from "./VideoCard";
import { useState } from "react";
import VideoModal from "./VideoModal";

interface VideoGalleryProps {
  videos: Video[];
  isLoading: boolean;
  error: Error | null;
}

export default function VideoGallery({ videos, isLoading, error }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="w-full aspect-video bg-gray-300"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
        <p>Error loading videos: {error.message}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
        <p className="text-gray-600">No videos found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onPreview={() => handleOpenModal(video)}
          />
        ))}
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
