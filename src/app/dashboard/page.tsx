import DashboardNavbar from "@/components/dashboard-navbar";
import TranscriptUploader from "@/components/transcript-uploader";
import TranscriptList from "@/components/transcript-list";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Transcript Dashboard
            </h1>
            <p className="text-gray-600">
              Upload video conference recordings and extract transcripts from
              Zoom, Teams, and Google Meet.
            </p>
          </header>

          {/* Upload Section */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Upload Recordings</h2>
            <TranscriptUploader />
          </section>

          {/* Transcripts List Section */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Transcripts</h2>
            <TranscriptList />
          </section>
        </div>
      </main>
    </div>
  );
}
