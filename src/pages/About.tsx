
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-bold text-4xl md:text-5xl mb-6 text-gray-900">About WallFeedback</h1>
            <p className="text-lg text-gray-600 mb-8">
              Building trust through authentic testimonials
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              WallFeedback was founded in 2024 by a team of digital marketing professionals who recognized a critical gap in how businesses collect and showcase client testimonials. After years of watching businesses struggle with outdated and inefficient testimonial collection methods, we decided to create a solution.
            </p>
            <p className="text-gray-600 mb-6">
              Our founders, having worked with hundreds of service businesses, understood that authentic social proof is one of the most powerful tools for building trust and winning new clients. However, the process of gathering testimonials was often cumbersome, leading to missed opportunities and underutilized customer success stories.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At WallFeedback, our mission is to help businesses build trust with potential clients by making it effortless to collect and showcase authentic testimonials. We believe that every business deserves a simple, elegant way to highlight their success stories.
            </p>
            <p className="text-gray-600 mb-6">
              We're committed to creating tools that are not just powerful, but also intuitive and accessible to businesses of all sizes. By streamlining the testimonial collection process, we help more businesses leverage the power of social proof in their marketing efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Values</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 border border-gray-100 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  We believe real testimonials from real clients are the foundation of trust. Our platform is designed to showcase authentic voices.
                </p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Simplicity</h3>
                <p className="text-gray-600">
                  Great tools should be easy to use. We focus on creating intuitive experiences that save time and reduce friction.
                </p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Empowerment</h3>
                <p className="text-gray-600">
                  We empower businesses to take control of their online reputation through better testimonial management.
                </p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve our platform based on user feedback and emerging best practices in digital marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to showcase your client success stories?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using WallFeedback to build trust and win more clients.
          </p>
          <Link to="/signup">
            <Button size="lg" className="gradient-bg">
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
