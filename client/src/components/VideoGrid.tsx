import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Video } from "@shared/schema";

interface VideoGridProps {
  title: string;
  endpoint: string;
  viewAllLink?: string;
  displayType?: "recent" | "featured" | "popular";
  limit?: number;
  className?: string;
}

export default function VideoGrid({
  title,
  endpoint,
  viewAllLink,
  displayType,
  limit,
  className = "bg-white",
}: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Append limit to endpoint if provided
  const queryEndpoint = limit ? `${endpoint}?limit=${limit}` : endpoint;

  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: [queryEndpoint],
  });

  const handlePlay = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };
