import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  Upload,
  Search,
  Download,
  FileText,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* User Section */}
      <section id="use-cases" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Who Can Benefit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perfect for professionals who need to extract and manage
              transcripts from video conferences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Business Professionals",
                description:
                  "Extract meeting notes, action items, and key decisions from client calls and team meetings",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Content Creators",
                description:
                  "Convert webinars, interviews, and recorded sessions into searchable text content",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Legal & Compliance",
                description:
                  "Maintain accurate records of depositions, hearings, and compliance meetings",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Researchers & Academics",
                description:
                  "Transcribe interviews, focus groups, and academic presentations for analysis",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "HR & Training Teams",
                description:
                  "Document training sessions, onboarding calls, and performance reviews",
              },
              {
                icon: <ArrowUpRight className="w-6 h-6" />,
                title: "Sales Teams",
                description:
                  "Review client calls, extract objections, and improve sales processes",
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to make transcript extraction and
              management effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload className="w-6 h-6" />,
                title: "Bulk Upload Support",
                description:
                  "Upload multiple files at once with drag & drop functionality for efficient batch processing",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Multi-Platform Support",
                description:
                  "Extract transcripts from Zoom, Microsoft Teams, and Google Meet recordings",
              },
              {
                icon: <Search className="w-6 h-6" />,
                title: "Advanced Search",
                description:
                  "Search across all transcripts with keyword highlighting and context preview",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Multiple Export Formats",
                description:
                  "Download transcripts as TXT, SRT subtitle files, or structured JSON data",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure Processing",
                description:
                  "Your data is processed securely with user authentication and private storage",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Progress Tracking",
                description:
                  "Real-time progress indicators show the status of your transcript extraction",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Extract transcripts from your video conference recordings in just
              a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Upload className="w-6 h-6" />,
                title: "Upload Recordings",
                description:
                  "Drag & drop your video files from Zoom, Teams, or Meet",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Extract Transcripts",
                description:
                  "Automated processing with platform-specific extraction",
              },
              {
                icon: <Search className="w-6 h-6" />,
                title: "Search & Manage",
                description:
                  "Find specific content across all your transcripts",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Export Formats",
                description: "Download as TXT, SRT, or JSON files",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Platforms</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Extract transcripts from all major video conferencing platforms
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">Zoom</div>
              <div className="text-blue-100">Meeting Recordings</div>
            </div>
            <div className="bg-white/10 rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">Teams</div>
              <div className="text-blue-100">Microsoft Teams</div>
            </div>
            <div className="bg-white/10 rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">Meet</div>
              <div className="text-blue-100">Google Meet</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our transcript extraction
              service
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What video file formats are supported?",
                answer:
                  "We support MP4, MOV, AVI video files and M4A, MP3 audio files up to 2GB in size from Zoom, Microsoft Teams, and Google Meet recordings.",
              },
              {
                question: "How accurate are the extracted transcripts?",
                answer:
                  "Our platform uses advanced speech recognition technology optimized for video conference audio. Accuracy depends on audio quality, but typically ranges from 85-95% for clear recordings.",
              },
              {
                question: "Can I edit transcripts after extraction?",
                answer:
                  "Yes, you can view and edit transcripts directly in the platform before downloading them in your preferred format.",
              },
              {
                question: "What export formats are available?",
                answer:
                  "You can download transcripts as plain text (TXT), subtitle files (SRT), or structured data (JSON) for integration with other tools.",
              },
              {
                question: "How long does transcript extraction take?",
                answer:
                  "Processing time varies based on file size and length. Typically, a 1-hour recording takes 5-10 minutes to process. You'll see real-time progress updates.",
              },
              {
                question: "Is my data secure and private?",
                answer:
                  "Yes, all uploads are encrypted and processed securely. Your transcripts are private to your account and can be deleted at any time.",
              },
              {
                question: "Can I process multiple files at once?",
                answer:
                  "Absolutely! Our bulk upload feature allows you to process multiple recordings simultaneously with batch processing capabilities.",
              },
              {
                question: "Do you support speaker identification?",
                answer:
                  "Yes, our system can identify different speakers in the recording and label them in the transcript output.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Extracting Transcripts Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your video conference recordings and get searchable
            transcripts in minutes.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try It Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
