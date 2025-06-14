"use client";

import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Upload, FileVideo, X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  platform: "zoom" | "teams" | "meet" | "";
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

export default function TranscriptUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<
    "zoom" | "teams" | "meet"
  >("zoom");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    },
    [selectedPlatform],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      processFiles(selectedFiles);
    },
    [selectedPlatform],
  );

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      platform: selectedPlatform,
      status: "uploading",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((file) => {
      simulateProcessing(file.id);
    });
  };

  const simulateProcessing = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;

      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (progress >= 100) {
              clearInterval(interval);
              return { ...file, status: "completed", progress: 100 };
            }
            return { ...file, progress: Math.min(progress, 99) };
          }
          return file;
        }),
      );
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileVideo className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 bg-white">
      {/* Platform Selection */}
      <Tabs
        value={selectedPlatform}
        onValueChange={(value) =>
          setSelectedPlatform(value as "zoom" | "teams" | "meet")
        }
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="zoom">Zoom</TabsTrigger>
          <TabsTrigger value="teams">Microsoft Teams</TabsTrigger>
          <TabsTrigger value="meet">Google Meet</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPlatform} className="mt-6">
          {/* Upload Area */}
          <Card
            className={cn(
              "border-2 border-dashed transition-colors cursor-pointer",
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Drop {selectedPlatform} recordings here
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                or click to browse files
              </p>
              <input
                type="file"
                multiple
                accept="video/*,audio/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Browse Files
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supports MP4, MOV, AVI, M4A, MP3 files up to 2GB
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Processing Files</h3>
          <div className="space-y-3">
            {files.map((file) => (
              <Card key={file.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    {getStatusIcon(file.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {file.platform.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                        <Badge
                          className={cn("text-xs", getStatusColor(file.status))}
                        >
                          {file.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {file.status !== "completed" && (
                      <div className="w-24">
                        <Progress value={file.progress} className="h-2" />
                        <span className="text-xs text-gray-500 mt-1">
                          {Math.round(file.progress)}%
                        </span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
