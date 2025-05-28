
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import TestimonialVideo from '@/components/TestimonialVideo';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  content: string;
  rating: number;
  date: string;
  videoUrl?: string;
  previewImageUrl?: string;
}

const EmbedWall = () => {
  const { company } = useParams();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Alex Turner",
      company: "Digital Agency XYZ",
      content: "Working with you has been a game-changer for our business. The website redesign increased our conversion rate by 45%!",
      rating: 5,
      date: "May 2, 2025"
    },
    {
      id: 2,
      name: "Jessica Martinez",
      company: "StartUp Innovations",
      content: "The social media strategy you developed helped us reach new audiences we hadn't connected with before. Our engagement is up 60%.",
      rating: 5,
      date: "May 1, 2025",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      previewImageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Michael Johnson",
      company: "Johnson Retail",
      content: "Your e-commerce solutions transformed our online store experience. Sales have increased by 30% in just the first month.",
      rating: 4,
      date: "April 28, 2025",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      previewImageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"
    }
  ]);
  
  // In a real app, fetch testimonials based on the company slug
  useEffect(() => {
    // This would be an API call in a production app
    console.log(`Fetching testimonials for company: ${company}`);
    
    // For demo purposes, we're using the mock data above
  }, [company]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-center font-poppins font-bold text-2xl text-gray-800">
            Trusted by our clients
          </h2>
          <div className="w-24 h-1 mx-auto mt-2 trust-gradient rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200">
              <CardContent className="p-6">
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
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8 text-xs text-gray-500">
          Powered by <span className="font-semibold text-purple-700">WallFeedback</span>
        </div>
      </div>
    </div>
  );
};

export default EmbedWall;
