"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Search,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  Calendar,
  Clock,
  FileText,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transcript {
  id: string;
  title: string;
  platform: "zoom" | "teams" | "meet";
  duration: string;
  createdAt: string;
  size: string;
  content: string;
  participants: string[];
}

// Mock data for demonstration
const mockTranscripts: Transcript[] = [
  {
    id: "1",
    title: "Weekly Team Standup - March 15",
    platform: "zoom",
    duration: "45:32",
    createdAt: "2024-03-15",
    size: "2.3 MB",
    content:
      "This is a sample transcript content from the weekly team standup meeting. We discussed project progress, upcoming deadlines, and resource allocation.",
    participants: ["John Doe", "Jane Smith", "Mike Johnson"],
  },
  {
    id: "2",
    title: "Client Presentation - Product Demo",
    platform: "teams",
    duration: "1:23:45",
    createdAt: "2024-03-14",
    size: "4.7 MB",
    content:
      "Product demonstration transcript showing key features and client feedback discussion.",
    participants: ["Sarah Wilson", "Tom Brown", "Client Team"],
  },
  {
    id: "3",
    title: "Design Review Session",
    platform: "meet",
    duration: "32:18",
    createdAt: "2024-03-13",
    size: "1.8 MB",
    content:
      "Design review meeting transcript covering UI/UX feedback and implementation decisions.",
    participants: ["Alex Chen", "Maria Garcia", "Design Team"],
  },
];

export default function TranscriptList() {
  const [transcripts] = useState<Transcript[]>(mockTranscripts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTranscript, setSelectedTranscript] =
    useState<Transcript | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<string>("all");

  const filteredTranscripts = transcripts.filter((transcript) => {
    const matchesSearch =
      transcript.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform =
      filterPlatform === "all" || transcript.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "zoom":
        return "bg-blue-100 text-blue-800";
      case "teams":
        return "bg-purple-100 text-purple-800";
      case "meet":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (
    transcript: Transcript,
    format: "txt" | "srt" | "json",
  ) => {
    // Mock download functionality
    const content =
      format === "json"
        ? JSON.stringify(transcript, null, 2)
        : transcript.content;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${transcript.title}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (transcriptId: string) => {
    // Mock delete functionality
    console.log("Delete transcript:", transcriptId);
  };

  return (
    <div className="space-y-6 bg-white">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search transcripts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter:{" "}
              {filterPlatform === "all"
                ? "All Platforms"
                : filterPlatform.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterPlatform("all")}>
              All Platforms
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterPlatform("zoom")}>
              Zoom
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterPlatform("teams")}>
              Microsoft Teams
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterPlatform("meet")}>
              Google Meet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Transcripts Grid */}
      {filteredTranscripts.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No transcripts found" : "No transcripts yet"}
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search terms or filters"
              : "Upload your first video conference recording to get started"}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTranscripts.map((transcript) => (
            <Card
              key={transcript.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold truncate">
                      {transcript.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className={cn(
                          "text-xs",
                          getPlatformColor(transcript.platform),
                        )}
                      >
                        {transcript.platform.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedTranscript(transcript)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(transcript, "txt")}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download TXT
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(transcript, "srt")}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download SRT
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(transcript, "json")}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download JSON
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(transcript.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{transcript.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(transcript.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{transcript.size}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {transcript.content}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedTranscript(transcript)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleDownload(transcript, "txt")}
                      >
                        TXT Format
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(transcript, "srt")}
                      >
                        SRT Format
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(transcript, "json")}
                      >
                        JSON Format
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Transcript Viewer Dialog */}
      <Dialog
        open={!!selectedTranscript}
        onOpenChange={() => setSelectedTranscript(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedTranscript && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTranscript.title}</DialogTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Badge
                    className={cn(
                      "text-xs",
                      getPlatformColor(selectedTranscript.platform),
                    )}
                  >
                    {selectedTranscript.platform.toUpperCase()}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedTranscript.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(
                      selectedTranscript.createdAt,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Participants</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTranscript.participants.map(
                      (participant, index) => (
                        <Badge key={index} variant="outline">
                          {participant}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Transcript</h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedTranscript.content}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => handleDownload(selectedTranscript, "txt")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download TXT
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(selectedTranscript, "srt")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download SRT
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(selectedTranscript, "json")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
