
import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialVideoProps {
  videoUrl: string;
  className?: string;
  previewImageUrl?: string;
}

const TestimonialVideo = ({ videoUrl, className, previewImageUrl }: TestimonialVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleVideoMetadataLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const videoRatio = video.videoWidth / video.videoHeight;
    setAspectRatio(videoRatio);
    setOrientation(videoRatio >= 1 ? "landscape" : "portrait");
    setIsLoaded(true);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    const videoElement = document.getElementById(`testimonial-video-${videoUrl.split('/').pop()}`) as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  // Default preview image if none provided
  const defaultPreviewImage = `https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80`;

  return (
    <div className={cn(
      "testimonial-video-container rounded-md overflow-hidden bg-gray-50 relative", 
      orientation === "landscape" ? "w-full" : "w-3/4 mx-auto",
      className
    )}>
      {aspectRatio ? (
        <AspectRatio ratio={aspectRatio}>
          {!isPlaying && (
            <div 
              className="absolute inset-0 bg-center bg-cover"
              style={{ 
                backgroundImage: `url(${previewImageUrl || defaultPreviewImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}
          <video
            id={`testimonial-video-${videoUrl.split('/').pop()}`}
            src={videoUrl}
            className={cn(
              "w-full h-full object-cover transition-all",
              isPlaying ? "opacity-100" : "opacity-0"
            )}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            controls={isPlaying}
            preload="metadata"
            onLoadedMetadata={handleVideoMetadataLoaded}
            poster={previewImageUrl || defaultPreviewImage}
          />
        </AspectRatio>
      ) : (
        <div className="aspect-video bg-gray-100 animate-pulse">
          <video
            id={`testimonial-video-${videoUrl.split('/').pop()}`}
            src={videoUrl}
            className="opacity-0 w-full h-full"
            preload="metadata"
            onLoadedMetadata={handleVideoMetadataLoaded}
            poster={previewImageUrl || defaultPreviewImage}
          />
        </div>
      )}
      
      {!isPlaying && (
        <button 
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all"
        >
          <div className="w-16 h-16 rounded-full bg-purple-600 bg-opacity-90 flex items-center justify-center text-white shadow-lg hover:bg-opacity-100 transition-all">
            <Play size={32} className="ml-1" />
          </div>
        </button>
      )}
    </div>
  );
};

export default TestimonialVideo;
