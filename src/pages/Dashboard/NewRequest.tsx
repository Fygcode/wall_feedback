
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { nanoid } from "nanoid";
import { useAuth } from "@/context/authContext";



const NewRequest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [slug, setSlug] = useState("");
  const [formData, setFormData] = useState({
    serviceName: "",
    companyName: "",
    message: "Hi! I'd love if you could share your experience working with me. It only takes a minute, and I'd really appreciate it!"
  });

  // const generateLink = () => {
  //   // In a real app, this would create a unique link with the company name as part of the URL
  //   const companySlug = formData.companyName.toLowerCase().replace(/\s+/g, '-');
  //   return `https://wallfeedback.com/submit/${companySlug}/123456`;
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (step === 1) {
  //     // Validate form
  //     if (!formData.serviceName || !formData.companyName) {
  //       toast.error("Please fill in all required fields");
  //       return;
  //     }
  //     setStep(2);
  //   }
  // };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateLink());
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  // =======================================


  const { user } = useAuth();

  // const generateLink = () => {
  //   const companySlug = formData.companyName.toLowerCase().replace(/\s+/g, "-");
  //   return `https://wallfeedback.com/submit/${companySlug}/${slug}`;
  // };
  

  const generateLink = () => {
    const companySlug = formData.companyName.toLowerCase().replace(/\s+/g, "-");
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080" // Change the port if your local setup is different
        : "https://wallfeedback.netlify.app";
    return `${baseUrl}/submit/${companySlug}/${slug}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.serviceName || !formData.companyName) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Generate unique slug
      const uniqueSlug = nanoid(10);
      setSlug(uniqueSlug);

      // Insert into Supabase testimonial_requests table
      const { data, error } = await supabase
        .from("testimonial_requests")
        .insert([
          {
            user_id: user?.id,
            service_name: formData.serviceName,
            company_name: formData.companyName,
            message: formData.message,
            slug: uniqueSlug,
          },
        ]);

      if (error) {
        console.error("Error inserting testimonial request:", error);
        toast.error("Failed to create request. Please try again.");
        return;
      }

      // Success: move to next step (show the link)
      setStep(2);
      toast.success("Request created successfully!");
    }
  };

  // ======================================
  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={handleGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Create Testimonial Request</h1>
        <p className="text-gray-500 mb-6">Create a shareable link to collect testimonials from your clients.</p>

        <Card>
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Enter information about the service or project you want testimonials for.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">


                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium">
                      Your Company Name *
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="serviceName" className="text-sm font-medium">
                      Service/Project Name *
                    </label>
                    <Input
                      id="serviceName"
                      name="serviceName"
                      value={formData.serviceName}
                      onChange={handleChange}
                      placeholder="Website Redesign, Marketing Campaign, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium flex justify-between">
                      <span>Personalized Message</span>
                      <span className="text-gray-500 text-xs">Optional</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full gradient-bg" type="submit">
                    Create Request
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Share With Your Client</CardTitle>
                  <CardDescription>
                    Your testimonial request has been created. Share this link with your clients.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                    <p className="text-sm font-medium text-purple-800 mb-2">
                      Project: {formData.serviceName}
                    </p>
                    <p className="text-sm text-purple-800 mb-4">
                      Company: {formData.companyName}
                    </p>
                    <p className="text-sm text-purple-800 mb-2">
                      Share this message with your client:
                    </p>
                    <p className="text-sm text-purple-800">
                      "{formData.message}"
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Shareable Link
                    </label>
                    <div className="flex">
                      <div className="bg-gray-50 border border-gray-200 rounded-l-md px-3 py-2 text-sm text-gray-500 flex-1 truncate">
                        {generateLink()}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-l-none border-l-0"
                        onClick={handleCopy}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>Share this link with your client via:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Email</li>
                      <li>WhatsApp</li>
                      <li>SMS</li>
                      <li>Social Media</li>
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full" variant="outline" onClick={() => navigate("/dashboard")}>
                    Return to Dashboard
                  </Button>
                  <Button className="w-full gradient-bg" onClick={() => navigate("/dashboard/new")}>
                    Create Another Request
                  </Button>
                </CardFooter>
              </>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewRequest;
