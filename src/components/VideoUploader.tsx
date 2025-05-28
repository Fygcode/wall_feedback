
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Video, Upload, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VideoUploaderProps {
  onVideoUploaded: (videoUrl: string) => void;
}

const VideoUploader = ({ onVideoUploaded }: VideoUploaderProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file",
        description: "Please upload a video file.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a video smaller than 100MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Create object URL for preview
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      
      // Simulate upload progress
      const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setUploadProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            simulateCompression();
          }
        }, 300);
      };
      
      const simulateCompression = () => {
        setIsCompressing(true);
        
        // Simulate video compression (in a real app, we would use ffmpeg.wasm or a server-side solution)
        setTimeout(() => {
          setIsCompressing(false);
          setIsUploading(false);
          
          // In a real implementation, we would return the URL of the compressed video from the server
          onVideoUploaded(previewUrl);
          
          toast({
            title: "Video uploaded",
            description: "Your video has been successfully uploaded and compressed to 1080p."
          });
        }, 2000);
      };
      
      simulateUpload();
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  }, [toast, onVideoUploaded]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1,
    disabled: isUploading || isCompressing
  });
  
  const handleCancel = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview(null);
    }
    setIsUploading(false);
    setIsCompressing(false);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-4">
      {!isUploading && !videoPreview ? (
        <Card 
          {...getRootProps()} 
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
            <Upload className="h-10 w-10 text-gray-400" />
            <div className="font-medium">
              {isDragActive ? (
                <p>Drop the video here...</p>
              ) : (
                <p>Drag and drop your video, or click to select</p>
              )}
            </div>
            <p className="text-xs">
              Max 5 minutes, MP4, MOV, AVI or WebM (Max 100MB)
            </p>
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          {videoPreview && !isUploading && !isCompressing ? (
            <div className="space-y-4">
              <video 
                className="w-full rounded" 
                src={videoPreview} 
                controls 
                height="auto"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-center">
                {isCompressing ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Loader className="h-10 w-10 animate-spin text-purple-600" />
                    <p className="text-sm font-medium">Compressing to 1080p...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Video className="h-10 w-10 text-purple-600" />
                    <p className="text-sm font-medium">Uploading video...</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-right text-gray-500">{uploadProgress}%</p>
              </div>
              
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isCompressing}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default VideoUploader;
