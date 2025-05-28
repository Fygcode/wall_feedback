
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
  website: string;
  content: string;
  rating: number;
  date: string;
  videoUrl?: string;
  previewImageUrl?: string;
}

const TestimonialWall = () => {
  const { company } = useParams();
  const [sortBy, setSortBy] = useState("newest");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Alex Turner",
      company: "Digital Agency XYZ",
      website: "digitalxyz.com",
      content: "Working with you has been a game-changer for our business. The website redesign increased our conversion rate by 45%!",
      rating: 5,
      date: "May 2, 2025"
    },
    {
      id: 2,
      name: "Jessica Martinez",
      company: "StartUp Innovations",
      website: "startupinnovations.co",
      content: "The social media strategy you developed helped us reach new audiences we hadn't connected with before. Our engagement is up 60%.",
      rating: 5,
      date: "May 1, 2025",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      previewImageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "Growth Marketing Agency",
      website: "growthmarketing.io",
      content: "As a marketing agency, we need social proof for ourselves and our clients. This service makes this process seamless and professional.",
      rating: 4,
      date: "April 28, 2025"
    },
    {
      id: 4,
      name: "Priya Sharma",
      company: "Design Studio",
      website: "priyaDesigns.com",
      content: "The branding package exceeded my expectations. My clients love the new logo and brand identity!",
      rating: 5,
      date: "April 25, 2025",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      previewImageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "David Wilson",
      company: "Tech Solutions Ltd",
      website: "techsolutions.co",
      content: "Great communication throughout the project. Delivered on time and on budget. Will definitely work with you again.",
      rating: 4,
      date: "April 20, 2025"
    },
  ]);
  
  // Format company slug and find company data
  const companySlug = company ? company.toLowerCase().replace(/\s+/g, '-') : "";
  const currentCompany = companyData[companySlug as keyof typeof companyData] || {
    name: "Your Company",
    services: ["Professional Services"],
    logoColor: "bg-purple-500",
    description: "Don't just take our word for it. See what our clients have to say about working with us."
  };
  
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white pb-8 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className={`w-20 h-20 rounded-lg ${currentCompany.logoColor} flex items-center justify-center flex-shrink-0`}>
                <Briefcase className="text-white" size={36} />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentCompany.name}</h1>
                <p className="text-lg text-gray-600 mb-3">
                  Specializing in: {currentCompany.services.join(" • ")}
                </p>
                <p className="text-gray-600 max-w-2xl">
                  {currentCompany.description}
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
                  <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.company} 
                    {testimonial.website && (
                      <> • <a href={`https://${testimonial.website}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">{testimonial.website}</a></>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Want to showcase testimonials like these on your website?</p>
            <Link to="/">
              <Button variant="default" className="gradient-bg">
                Try WallFeedback for Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* New Embed Section */}
      <div className="bg-purple-50 py-12">
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
      </div>
      
      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xs">W</span>
              </div>
              <span className="text-xs text-gray-500">
                Powered by <Link to="/" className="text-purple-600 hover:underline">WallFeedback</Link>
              </span>
            </div>
            <Link to="/signup" className="text-xs text-purple-600 hover:underline">
              Create your own testimonial wall
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialWall;
