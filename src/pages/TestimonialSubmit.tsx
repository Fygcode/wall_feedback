
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Briefcase, Star } from "lucide-react";
// import VideoUploader from "@/components/VideoUploader";
// import { toast } from "sonner";
// import { supabase } from "@/supabaseClient";
// import { useAuth } from "@/context/authContext";
// import { useParams } from "react-router-dom";

// const { slug, code } = useParams(); // slug = "gng", code = "EzjEFWQCQN"


// // Mock company data - in a real app, this would come from an API/database
// const companyData = {
//   "digital-agency-xyz": {
//     name: "Digital Agency XYZ",
//     services: ["Web Design", "Digital Marketing", "Brand Strategy"],
//     logoColor: "bg-blue-500"
//   },
//   "startup-innovations": {
//     name: "StartUp Innovations",
//     services: ["App Development", "Product Strategy", "Funding Support"],
//     logoColor: "bg-green-500"
//   },
//   "growth-marketing": {
//     name: "Growth Marketing Agency",
//     services: ["SEO Optimization", "Content Marketing", "Paid Advertising"],
//     logoColor: "bg-purple-500"
//   },
//   "design-studio": {
//     name: "Design Studio",
//     services: ["UI/UX Design", "Brand Identity", "Illustration"],
//     logoColor: "bg-pink-500"
//   },
//   "tech-solutions": {
//     name: "Tech Solutions Ltd",
//     services: ["Software Development", "Cloud Services", "IT Consulting"],
//     logoColor: "bg-indigo-500"
//   }
// };

// const TestimonialSubmit = () => {
//   const { company, slug } = useParams();
//   const { user } = useAuth();
//   const [submitted, setSubmitted] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [companyData, setCompanyData] = useState<any>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     businessName: "",
//     website: "",
//     testimonial: "",
//     videoUrl: "",
//   });
//   const [requestId, setRequestId] = useState<string | null>(null);


// useEffect(() => {
//   const fetchRequestId = async () => {
//     const { data, error } = await supabase
//       .from("testimonial_requests")
//       .select("id")
//       .eq("code", code) // assuming "EzjEFWQCQN" is stored in the `code` column
//       .single();

//     if (error || !data) {
//       console.error("Error fetching request ID:", error?.message);
//       return;
//     }

//     setRequestId(data.id);
//   };

//   if (code) fetchRequestId();
// }, [code]);


//   useEffect(() => {
//     const fetchData = async () => {
//       if (!slug || !company) {
//         toast.error("Invalid URL");
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from("testimonial_requests")
//         .select("*")
//         .eq("slug", slug)
//         .maybeSingle();

//       if (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Failed to load request");
//         setLoading(false);
//         return;
//       }

//       if (!data) {
//         toast.error("Testimonial request not found");
//         setLoading(false);
//         return;
//       }

//       setCompanyData(data);
//       setLoading(false);
//     };

//     fetchData();
//   }, [slug, company]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!companyData) {
//     return <div className="text-red-500">Testimonial request not found.</div>;
//   }



//   // Format company slug and find company data
//   const companySlug = company ? company.toLowerCase().replace(/\s+/g, '-') : "";
//   const currentCompany = companyData[companySlug as keyof typeof companyData] || {
//     name: company || "Our Company",
//     services: ["Our Services"],
//     logoColor: "bg-purple-500"
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleVideoUploaded = (videoUrl: string) => {
//     setFormData(prev => ({ ...prev, videoUrl }));
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!user) {
//     console.error("User not logged in");
//     return;
//   }

//   try {
//     const { id: userId } = user;

//     // You’ll need to pass or retrieve `requestId` from props, route, or context


//     const { data, error } = await supabase.from("testimonials").insert([
//       {
//         request_id: requestId,
//         user_id: userId,
//         name: formData.name,
//         company: formData.businessName || null,
//         position: null, // Optional: Add a position field in formData if needed
//         content: formData.testimonial,
//         rating: rating,
//         business_website: formData.website || null,
//         social_link: formData.website || null, // You can separate these if needed
//         status: "pending", // Default status
//       },
//     ]);

//     if (error) {
//       console.error("Error saving testimonial:", error.message);
//       // Optionally show an error message to the user
//     } else {
//       console.log("Testimonial submitted:", data);
//       setSubmitted(true);
//     }
//   } catch (err) {
//     console.error("Unexpected error:", err);
//   }
// };



//   const handleRatingClick = (value: number) => {
//     setRating(value);
//   };

//   const handleRatingHover = (value: number) => {
//     setHoveredRating(value);
//   };

//   const handleRatingLeave = () => {
//     setHoveredRating(0);
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="text-green-600"
//               >
//                 <path d="M20 6L9 17l-5-5" />
//               </svg>
//             </div>
//             <CardTitle className="text-2xl">Thank You!</CardTitle>
//             <CardDescription className="text-gray-500 mt-2">
//               Your testimonial has been submitted successfully.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="text-center">
//             <p className="text-gray-600">
//               We appreciate you taking the time to share your feedback. Your testimonial will be reviewed shortly.
//             </p>
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <Link to="/">
//               <Button variant="link" className="text-purple-600 hover:underline">
//                 Back to WallFeedback
//               </Button>
//             </Link>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* Hero Section */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <div className={`w-16 h-16 rounded-lg ${currentCompany.logoColor} flex items-center justify-center flex-shrink-0`}>
//               <Briefcase className="text-white" size={32} />
//             </div>
//             <div className="flex-grow text-center md:text-left">
//               <h1 className="text-3xl font-bold mb-2">{currentCompany.name}</h1>
//               <p className="text-gray-600">
//                 Specializing in: {currentCompany.services.join(", ")}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-lg mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-6">
//             <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
//               <span className="text-white font-bold">W</span>
//             </div>
//             <span className="font-poppins font-semibold text-xl text-gray-800">WallFeedback</span>
//           </div>

//           <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
//           <p className="text-gray-600">
//             {currentCompany.name} would love to hear about your experience!
//           </p>
//         </div>

//         <Card>
//           <form onSubmit={handleSubmit}>
//             <CardHeader>
//               <CardTitle>Your Testimonial</CardTitle>
//               <CardDescription>
//                 Please share your honest feedback. It only takes a minute!
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <label htmlFor="name" className="text-sm font-medium">
//                   Your Name *
//                 </label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Smith"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-sm font-medium">
//                   Your Email *
//                 </label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="john@example.com"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="businessName" className="text-sm font-medium flex justify-between">
//                   <span>Business/Company Name</span>
//                   <span className="text-gray-500 text-xs">Optional</span>
//                 </label>
//                 <Input
//                   id="businessName"
//                   name="businessName"
//                   value={formData.businessName}
//                   onChange={handleChange}
//                   placeholder="Your Company Inc."
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="website" className="text-sm font-medium flex justify-between">
//                   <span>Website or Social Media URL</span>
//                   <span className="text-gray-500 text-xs">Optional</span>
//                 </label>
//                 <Input
//                   id="website"
//                   name="website"
//                   value={formData.website}
//                   onChange={handleChange}
//                   placeholder="https://yourwebsite.com"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Your Rating *
//                 </label>
//                 <div
//                   className="flex space-x-1"
//                   onMouseLeave={handleRatingLeave}
//                 >
//                   {[1, 2, 3, 4, 5].map((value) => (
//                     <button
//                       key={value}
//                       type="button"
//                       onClick={() => handleRatingClick(value)}
//                       onMouseEnter={() => handleRatingHover(value)}
//                       className="focus:outline-none"
//                     >
//                       <Star
//                         className="w-6 h-6"
//                         fill={(hoveredRating || rating) >= value ? "#F59E0B" : "none"}
//                         color={(hoveredRating || rating) >= value ? "#F59E0B" : "#D1D5DB"}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="testimonial" className="text-sm font-medium">
//                   Your Testimonial *
//                 </label>
//                 <Textarea
//                   id="testimonial"
//                   name="testimonial"
//                   value={formData.testimonial}
//                   onChange={handleChange}
//                   placeholder="Share your experience working with us..."
//                   rows={5}
//                   maxLength={200}
//                   required
//                 />
//                 <div className="text-xs text-right text-gray-500">
//                   {formData.testimonial.length}/200 characters
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium flex justify-between">
//                   <span>Video Testimonial</span>
//                   <span className="text-gray-500 text-xs">Optional • Max 5 minutes</span>
//                 </label>
//                 <VideoUploader onVideoUploaded={handleVideoUploaded} />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full gradient-bg" type="submit">
//                 Submit Testimonial
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>

//         <p className="text-center text-xs text-gray-500 mt-6">
//           Powered by <Link to="/" className="text-purple-600 hover:underline">WallFeedback</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TestimonialSubmit;



import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Star } from "lucide-react";
import VideoUploader from "@/components/VideoUploader";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/context/authContext";

// const companyMockData = {
//   "digital-agency-xyz": {
//     name: "Digital Agency XYZ",
//     services: ["Web Design", "Digital Marketing", "Brand Strategy"],
//     logoColor: "bg-blue-500"
//   },
//   "startup-innovations": {
//     name: "StartUp Innovations",
//     services: ["App Development", "Product Strategy", "Funding Support"],
//     logoColor: "bg-green-500"
//   },
//   "growth-marketing": {
//     name: "Growth Marketing Agency",
//     services: ["SEO Optimization", "Content Marketing", "Paid Advertising"],
//     logoColor: "bg-purple-500"
//   },
//   "design-studio": {
//     name: "Design Studio",
//     services: ["UI/UX Design", "Brand Identity", "Illustration"],
//     logoColor: "bg-pink-500"
//   },
//   "tech-solutions": {
//     name: "Tech Solutions Ltd",
//     services: ["Software Development", "Cloud Services", "IT Consulting"],
//     logoColor: "bg-indigo-500"
//   }
// };

const TestimonialSubmit = () => {
  const { slug } = useParams();
  const { user } = useAuth();

  const [companyData, setCompanyData] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState<any>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    website: "",
    testimonial: "",
    videoUrl: "",
  });

  console.log("slug from URL:", slug);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        toast.error("Invalid URL");
        setLoading(false);
        return;
      }

      console.log("Fetching testimonial_request with slug:", slug);

      const { data, error } = await supabase
        .from("testimonial_requests")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      console.log("Supabase fetch result:", { data, error });

      if (error || !data) {
        toast.error("Testimonial request not found");
        setLoading(false);
        return;
      }

      setCompanyData(data);
      setRequestId(data.id);
      setLoading(false);
    };

    fetchData();
  }, [slug]);



  if (loading) return <div>Loading...</div>;
  if (!companyData) return <div className="text-red-500">Testimonial request not found.</div>;

  // const companySlug = slug?.toLowerCase().replace(/\s+/g, "-") || "";
  // const currentCompany = companyMockData[companySlug as keyof typeof companyMockData] || {
  //   name: slug || "Our Company",
  //   services: ["Our Services"],
  //   logoColor: "bg-purple-500"
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoUploaded = (videoUrl: string) => {
    setFormData(prev => ({ ...prev, videoUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a testimonial.");
      return;
    }

    try {
      const { id: userId } = user;

      const testimonialData = {
        request_id: requestId,
        name: formData.name,
        company: formData.businessName || null,
        position: null,
        content: formData.testimonial,
        rating,
        business_website: formData.website || null,
        social_link: formData.website || null,
        video_url: formData.videoUrl || null,
        status: "pending",
      };

      // ✅ Log all data
      console.log("Submitting testimonial data:", testimonialData);

      const { error } = await supabase.from("testimonials").insert([testimonialData]);

      if (error) {
        console.error("Error saving testimonial:", error.message);
        toast.error("Failed to submit testimonial.");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong.");
    }
  };


  const handleRatingClick = (value: number) => setRating(value);
  const handleRatingHover = (value: number) => setHoveredRating(value);
  const handleRatingLeave = () => setHoveredRating(0);

  const logoColor = companyData?.logoColor || "bg-purple-500"; // default fallback color

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Your testimonial has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              We appreciate you taking the time to share your feedback. Your testimonial will be reviewed shortly.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/">
              <Button variant="link" className="text-purple-600 hover:underline">
                Back to WallFeedback
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      {/* <div className="bg-yellow-200 shadow-sm border-b min-h-[300px]">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`w-16 h-16 rounded-lg ${logoColor} flex items-center justify-center flex-shrink-0`}>
              <Briefcase className="text-white" size={32} />
            </div>
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center">
              <img src="/GNG LOGO.png" alt="Logo" className="w-full h-full object-contain" />
            </div>

            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {companyData?.company_name}
              </h1>
              <p className="text-gray-600">
                {companyData?.service_name}
              </p>
            </div>

          </div>
        </div>
      </div> */}

      <div className="bg-yellow-200 shadow-sm border-b min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center">
            <img src="/GNG LOGO.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {companyData?.company_name}
            </h1>
            <p className="text-gray-600">
              {companyData?.service_name}
            </p>
          </div>
        </div>
      </div>




      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          {/* <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="font-poppins font-semibold text-xl text-gray-800">WallFeedback</span>
          </div> */}

          <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
          <p className="text-gray-600">
            {companyData?.company_name || "Our Company"} would love to hear about your experience!
          </p>

        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Your Testimonial</CardTitle>
              <CardDescription>
                Please share your honest feedback. It only takes a minute!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="businessName" className="text-sm font-medium flex justify-between">
                  <span>Business/Company Name</span>
                  <span className="text-gray-500 text-xs">Optional</span>
                </label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your Company Inc."
                />
              </div>

              {/* <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium flex justify-between">
                  <span>Website or Social Media URL</span>
                  <span className="text-gray-500 text-xs">Optional</span>
                </label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
              </div> */}

              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium flex justify-between">
                  <span>Website or Social Media URL</span>
                  <span className="text-gray-500 text-xs">Optional</span>
                </label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Note:</strong> Get visitors and leads by displaying your link on our testimonial wall — featured in my Instagram bio.
                </p>



              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Your Rating *
                </label>
                <div
                  className="flex space-x-1"
                  onMouseLeave={handleRatingLeave}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRatingClick(value)}
                      onMouseEnter={() => handleRatingHover(value)}
                      className="focus:outline-none"
                    >
                      <Star
                        className="w-6 h-6"
                        fill={(hoveredRating || rating) >= value ? "#F59E0B" : "none"}
                        color={(hoveredRating || rating) >= value ? "#F59E0B" : "#D1D5DB"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="testimonial" className="text-sm font-medium">
                  Your Testimonial *
                </label>
                <Textarea
                  id="testimonial"
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleChange}
                  placeholder="Share your experience working with us..."
                  rows={5}
                  maxLength={200}
                  required
                />
                <div className="text-xs text-right text-gray-500">
                  {formData.testimonial.length}/200 characters
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex justify-between">
                  <span>Video Testimonial</span>
                  <span className="text-gray-500 text-xs">Optional • Max 5 minutes</span>
                </label>
                <VideoUploader onVideoUploaded={handleVideoUploaded} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gradient-bg" type="submit">
                Submit Testimonial
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          Powered by <Link to="/" className="text-purple-600 hover:underline">WallFeedback</Link>
        </p>
      </div>
    </div>
  );
};

export default TestimonialSubmit;

