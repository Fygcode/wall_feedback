import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Check, Building, Users, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Index = () => {
  // State to track billing cycle
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Sample testimonials for the landing page
  const featuredTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "CreativeDesigns Co.",
      website: "creativedesignsco.com",
      content: "WallFeedback has completely transformed how we collect testimonials. Our conversion rate increased by 35% after adding the testimonial wall to our website. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "TechSolutions Inc.",
      website: "techsolutions.io",
      content: "The simplicity of collecting testimonials with WallFeedback is unmatched. Our clients love the easy process, and we love showcasing their feedback.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Sharma",
      company: "Growth Marketing Agency",
      website: "growthmarketingpro.com",
      content: "As a marketing agency, we need social proof for ourselves and our clients. WallFeedback makes this process seamless and professional.",
      rating: 5,
    },
  ];

  // Sample pricing data with monthly and yearly options
  const pricingPlans = [
    {
      name: "Starter",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      yearlyTotal: "$0",
      period: "/month",
      description: "Perfect for individuals just getting started",
      features: [
        "Up to 10 testimonials", 
        "Basic testimonial wall",
        "Public testimonial page"
      ],
      cta: "Start for Free",
      popular: false,
    },
    {
      name: "Pro",
      monthlyPrice: "$21",
      yearlyPrice: "$17",
      yearlyTotal: "$204",
      period: "/month",
      description: "For growing businesses needing more features",
      features: [
        "Unlimited testimonials", 
        "Custom branding",
        "Website embedding",
        "Moderation controls",
        "Analytics dashboard"
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: "$49",
      yearlyPrice: "$41",
      yearlyTotal: "$492",
      period: "/month",
      description: "For large teams with advanced needs",
      features: [
        "Everything in Pro", 
        "Priority support",
        "API access",
        "Team collaboration",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      popular: false,
    }
  ];
  
  // Stats for trust-building section
  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "500,000+", label: "Testimonials Collected" },
    { value: "35%", label: "Avg. Conversion Increase" },
    { value: "98%", label: "Customer Satisfaction" }
  ];
  
  // Trusted companies logos
  const trustedCompanies = [
    "Adobe", "Microsoft", "Google", "Stripe", "Shopify", "Atlassian"
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="heading-gradient">Collect Testimonials</span><br />
                With Just One Click
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Send a single link, collect beautiful testimonials, and showcase them on your website to win more clients.
              </p>
              <div className="flex flex-col sm:flex-row justify-start gap-4">
                <Link to="/signup">
                  <Button className="w-full sm:w-auto text-lg gradient-bg px-8 py-6">
                    Get Started - It's Free
                  </Button>
                </Link>
                <Link to="/testimonials">
                  <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-purple-200 text-purple-700">
                    See Examples
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Testimonial Wall Example" 
                className="rounded-xl shadow-2xl border border-purple-100 transform rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section with Icons/Graphics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl card-shadow text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                alt="Create request" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-purple-100"
              />
              <h3 className="text-xl font-semibold mb-2">Create Request</h3>
              <p className="text-gray-600 relative z-10">Create a testimonial request and get a unique link to share with your clients.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl card-shadow text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Client submits" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-purple-100"
              />
              <h3 className="text-xl font-semibold mb-2">Client Submits</h3>
              <p className="text-gray-600 relative z-10">Your client shares their experience through a simple form that takes less than a minute.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl card-shadow text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Showcase testimonials" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-purple-100"
              />
              <h3 className="text-xl font-semibold mb-2">Showcase</h3>
              <p className="text-gray-600 relative z-10">Review, approve, and showcase testimonials on your custom wall or embed them on your site.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Testimonials with Background Image */}
      <section className="py-16 relative">
        <div className="absolute inset-0 opacity-5 z-0">
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Freelancers & Agencies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card group hover:shadow-xl transition-shadow duration-300">
                <div className="star-rating mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                <div className="mt-auto">
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Building Section with Image - NEW */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Trusted by Businesses Worldwide</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg card-shadow">
                    <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              {/* Company logos */}
              <div className="mb-8">
                <p className="text-gray-500 mb-4">TRUSTED BY INDUSTRY LEADERS</p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {trustedCompanies.map((company, index) => (
                    <div key={index} className="flex items-center bg-white px-3 py-2 rounded-md shadow">
                      <Building className="mr-2 text-purple-400" />
                      <span className="font-semibold text-gray-600">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                alt="Business analytics" 
                className="rounded-xl shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Additional trust elements */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <div className="bg-green-50 p-3 rounded-full">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-1">Enterprise-Grade Security</h3>
                  <p className="text-gray-600">Your data is protected with bank-level security and compliance measures.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section with Image - NEW */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 mb-8">
                Start with our free plan and upgrade as your business grows. No hidden fees, cancel anytime.
              </p>
              
              {/* Billing toggle */}
              <div className="mb-8">
                <Tabs 
                  defaultValue="monthly" 
                  className="inline-flex bg-gray-100 p-1 rounded-full"
                  onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
                >
                  <TabsList className="bg-transparent">
                    <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 rounded-full">
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger value="yearly" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 rounded-full">
                      Yearly <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Save 20%</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Link to="/pricing" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
                View all pricing details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Pricing visualization" 
                className="rounded-xl shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${plan.popular ? 'border-purple-400 shadow-lg' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 -translate-y-1">
                      POPULAR
                    </div>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl font-bold">
                      {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {billingCycle === "yearly" && plan.yearlyTotal !== "$0" && (
                    <p className="text-gray-500 text-xs mb-3">
                      Total: <span className="font-medium">{plan.yearlyTotal}</span> per year
                    </p>
                  )}
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/pricing">
                    <Button 
                      className={`w-full ${plan.popular ? 'gradient-bg' : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section with Dashboard Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Features You'll Love</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to collect, manage, and showcase your client testimonials in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl card-shadow">
                <h3 className="text-xl font-semibold mb-3">One-Click Collection</h3>
                <p className="text-gray-600">Share a single link with clients to collect testimonials effortlessly.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl card-shadow">
                <h3 className="text-xl font-semibold mb-3">Beautiful Testimonial Wall</h3>
                <p className="text-gray-600">Showcase testimonials in an attractive, customizable layout.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl card-shadow">
                <h3 className="text-xl font-semibold mb-3">Website Embedding</h3>
                <p className="text-gray-600">Easily embed testimonials on your website with our simple code snippet.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl card-shadow">
                <h3 className="text-xl font-semibold mb-3">Moderation Controls</h3>
                <p className="text-gray-600">Review and approve testimonials before they go live on your wall.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" 
                alt="Dashboard Preview" 
                className="rounded-xl shadow-2xl border border-purple-100 transform rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with Background Image */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Trust & Win More Clients?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join freelancers and agencies who use WallFeedback to collect and showcase client testimonials.
            </p>
            <Link to="/signup">
              <Button className="text-lg gradient-bg px-8 py-6">
                Get Started For Free
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500">No credit card required. Free plan includes 3 testimonials.</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
