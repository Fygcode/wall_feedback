
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Star } from "lucide-react";
import TestimonialVideo from "@/components/TestimonialVideo";
import { supabase } from "@/supabaseClient";

// Mock company data - in a real app, this would come from an API/database
const companyData = {
  "digital-agency-xyz": {
    name: "Digital Agency XYZ",
    services: ["Web Design", "Digital Marketing", "Brand Strategy"],
    logoColor: "bg-blue-500",
    description: "Award-winning digital agency helping businesses transform their online presence since 2015."
  },
  "startup-innovations": {
    name: "StartUp Innovations",
    services: ["App Development", "Product Strategy", "Funding Support"],
    logoColor: "bg-green-500",
    description: "We help startups build innovative products and secure funding for sustainable growth."
  },
  "growth-marketing": {
    name: "Growth Marketing Agency",
    services: ["SEO Optimization", "Content Marketing", "Paid Advertising"],
    logoColor: "bg-purple-500",
    description: "Data-driven marketing agency specializing in growth strategies that deliver measurable results."
  },
  "design-studio": {
    name: "Design Studio",
    services: ["UI/UX Design", "Brand Identity", "Illustration"],
    logoColor: "bg-pink-500",
    description: "Creative design studio crafting beautiful and functional experiences for brands worldwide."
  },
  "tech-solutions": {
    name: "Tech Solutions Ltd",
    services: ["Software Development", "Cloud Services", "IT Consulting"],
    logoColor: "bg-indigo-500",
    description: "Enterprise technology solutions provider with over 10 years of experience across industries."
  }
};

interface Testimonial {
  id: number;
  name: string;
  company: string;
  business_website: string;
  content: string;
  rating: number;
  date: string;
  videoUrl?: string;
  previewImageUrl?: string;
}

const TestimonialWall = () => {
  const { requestId } = useParams();
  const [sortBy, setSortBy] = useState("newest");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<{
    name: string;
    services: string[];
    logoColor: string;
    description: string;
  } | null>(null);


  useEffect(() => {
    if (!requestId) return;

    const fetchData = async () => {
      setLoading(true);

      // 1. Fetch approved testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .eq("request_id", requestId)
        .order("created_at", { ascending: false });

      if (testimonialsError) {
        console.error("Error fetching testimonials:", testimonialsError.message);
        setTestimonials([]);
      } else {
        setTestimonials(testimonialsData);
      }

      // 2. Fetch testimonial request (i.e., company details)
      const { data: requestData, error: requestError } = await supabase
        .from("testimonial_requests")
        .select("*")
        .eq("id", requestId)
        .single();

      if (requestError) {
        console.error("Error fetching company info:", requestError.message);
        setCompanyInfo(null);
      } else {
        setCompanyInfo({
          name: requestData.company_name || "Your Company",
          services: requestData.service_name?.split(",") || ["Professional Services"],
          logoColor: requestData.logo_color || "bg-purple-500",
          description: requestData.description || "Hear directly from our clients — their feedback speaks louder than we can."

        });
      }

      setLoading(false);
    };

    fetchData();
  }, [requestId]);



  useEffect(() => {
    // Sort testimonials
    const sortedTestimonials = [...testimonials].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "highest") {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

    setTestimonials(sortedTestimonials);
  }, [sortBy]);

  if (!companyInfo) {
    return <div className="p-12 text-center text-gray-500">Loading testimonial wall...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <div className="bg-white pb- border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className={`w-20 h-20 rounded-lg ${companyInfo.logoColor} flex items-center justify-center flex-shrink-0`}>
                <Briefcase className="text-white" size={36} />
              </div>

              <div className={`w-20 h-20 rounded-lg ${companyInfo?.logoColor || 'bg-purple-500'} flex items-center justify-center`}>
                <Briefcase className="text-white" size={36} />
              </div>



              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{companyInfo?.name || "Your Company"}</h1>

                <p className="text-lg text-gray-600 mb-3">
                  {companyInfo.services.join(" • ")}
                </p>
                <p className="text-gray-600 max-w-2xl">
                  {companyInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-yellow-200 border-b min-h-[35vh] flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              {/* <div className={`w-20 h-20 rounded-lg ${companyInfo?.logoColor || 'bg-purple-500'} flex items-center justify-center`}>
                <Briefcase className="text-white" size={36} />
              </div> */}

              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <img src="/GNG LOGO.png" alt="Logo" className="w-full h-full object-contain" />
              </div>


              <div className="flex-grow text-center md:text-left">
                <h1 className="text-4xl md:text-4xl font-bold mb-2 text-bl">{companyInfo?.name || "Your Company"}</h1>
                <p className="text-2xl text-black font-semibold mb-3">
                  {companyInfo.services.join(" • ")}
                </p>
                <p className="text-black font-semibold max-w-2xl">
                  {companyInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-gray-500">
              {testimonials.length} testimonials
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="highest">Highest Rating</SelectItem>
                  <SelectItem value="lowest">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-200 flex flex-col">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" fill="#F59E0B" color="#F59E0B" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" fill="none" color="#D1D5DB" />
                  ))}
                </div>

                {testimonial.videoUrl && (
                  <div className="mb-4">
                    <TestimonialVideo
                      videoUrl={testimonial.videoUrl}
                      previewImageUrl={testimonial.previewImageUrl}
                    />
                  </div>
                )}

                <p className="text-gray-700 mb-4">{testimonial.content}</p>

                <div className="mt-auto">
                  {/* <h3 className="font-medium text-gray-900">{testimonial.name}</h3> */}

                  <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                    {/* Avatar */}
                    <span className="w-8 h-8 mr-2 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                      {testimonial.name?.charAt(0).toUpperCase()}
                    </span>

                    {/* Name */}
                    {testimonial.name}
                  </h3>

                  {/* Company name */}
                  <p className="text-sm text-gray-500 ml-10">
                    {testimonial.company} <span>•</span>
                  </p>

                  {/* Website link on next line */}
                  {testimonial.business_website && (
                    <p className="text-sm text-purple-600 hover:underline ml-10 max-w-xs truncate" title={testimonial.business_website}>
                      <a
                        href={testimonial.business_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {testimonial.business_website}
                      </a>
                    </p>
                  )}



                </div>
              </div>
            ))}

          </div>

          {/* <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Want to showcase testimonials like these on your website?</p>
            <Link to="/">
              <Button variant="default" className="gradient-bg">
                Try WallFeedback for Free
              </Button>
            </Link>
          </div> */}
        </div>
      </div>

      {/* New Embed Section */}
      {/* <div className="bg-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Website Embedding</h2>
            <p className="text-lg text-purple-700 mb-8">
              Easily embed testimonials on your website with our simple code snippet.
              Showcase your client feedback anywhere on your site.
            </p>
            <div className="flex justify-center">
              <Link to="/signup">
                <Button variant="default" className="gradient-bg">
                  Get Embed Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}


      <footer className="border-t border-gray-200 py-4 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">W</span>
              </div>
              <span className="text-xs text-gray-500">
                Powered by <Link to="/" className="text-purple-600 hover:underline">WallFeedback</Link>
              </span>
            </div>
          </div>
        </div>
      </footer>



    </div>
  );
};

export default TestimonialWall;
