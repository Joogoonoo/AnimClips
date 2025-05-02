import { Link } from "wouter";
import { Play, Download, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  displayType?: "recent" | "featured" | "popular";
}

export default function VideoCard({ video, onPlay, displayType }: VideoCardProps) {
  return (
    <Card className="video-card overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button
            onClick={() => onPlay(video)}
            className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg hover:bg-primary hover:text-white transition-colors"
            variant="ghost"
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded">
          {video.duration}
