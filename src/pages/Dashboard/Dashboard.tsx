
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Star, ArrowRight, Copy, Check, Link as LinkIcon, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import TestimonialEmbed from "@/components/TestimonialEmbed";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/supabaseClient";

const rotatingQuotes = [
  "🚀 Turn Customer Praise into More Sales.",
  "⭐ Your Success Stories. Your Best Sales Tool.",
  "💬 Transform Happy Clients into New Customers.",
  "✅ Leverage Customer Trust to Boost Your Sales.",
  "🌟 Your Best Salespeople? Your Happy Customers.",
  "📈 Collect. Showcase. Sell More.",
  "🎥 Real Stories. Real Trust. Real Sales.",
  "🔥 Let Your Customers Sell for You.",
  "✨ Build Trust. Drive Sales. Instantly.",
  "🚀 Make Every Testimonial Your Secret Weapon."
];


const Dashboard = () => {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    company: "",
    content: "",
    rating: 5
  });
  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  // useEffect(() => {
  //   const fetchRequests = async () => {
  //     if (!authUser) {
  //       toast.error("You must be logged in to view requests.");
  //       setLoading(false); // Set loading false even if not logged in
  //       return;
  //     }

  //     try {
  //       const { data, error } = await supabase
  //         .from("testimonial_requests")
  //         .select("*")
  //         .eq("user_id", authUser.id)
  //         .order("created_at", { ascending: false });

  //       if (error) {
  //         console.error("Error fetching requests:", error);
  //         toast.error("Failed to load requests.");
  //       } else {
  //         setRequests(data || []);
  //       }
  //     } catch (error) {
  //       console.error("Error during request fetch:", error);
  //       toast.error("Unexpected error loading requests.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRequests();
  // }, [authUser]);

  // const generateLink = (companyName: string = "", slug: string = "") => {
  //   const companySlug = companyName.toLowerCase().replace(/\s+/g, '-');
  //   const baseUrl =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:8080"
  //       : "https://wallfeedback.com";
  //   return `${baseUrl}/submit/${companySlug}/${slug}`;
  // };

  useEffect(() => {
    const fetchRequests = async () => {
      if (!authUser) {
        toast.error("You must be logged in to view requests.");
        setLoading(false); // Set loading false even if not logged in
        return;
      }

      try {
        const { data, error } = await supabase
          .from("testimonial_requests")
          .select("*")
          .eq("user_id", authUser.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching requests:", error);
          toast.error("Failed to load requests.");
        } else {
          // Add 'link' to each request item:
          const requestsWithLinks = (data || []).map((request) => ({
            ...request,
            link: generateLink(request.company_name, request.slug),
          }));

          setRequests(requestsWithLinks);
        }
      } catch (error) {
        console.error("Error during request fetch:", error);
        toast.error("Unexpected error loading requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [authUser]);

  const generateLink = (companyName: string = "", slug: string = "") => {
    const companySlug = companyName.toLowerCase().replace(/\s+/g, "-");
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://wallfeedback.netlify.app"; // updated live URL
    return `${baseUrl}/submit/${companySlug}/${slug}`;
  };




  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingQuotes.length);
    }, 2000); // change every 2 second

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Total Testimonials", value: 2 },
    { label: "Pending Review", value: 1 },
    { label: "Approved", value: 1 },
    { label: "Requests Sent", value: 3 },
  ];

  // const [recentTestimonials, setRecentTestimonials] = useState([
  //   {
  //     id: 1,
  //     name: "Alex Turner",
  //     company: "Digital Agency XYZ",
  //     date: "May 2, 2025",
  //     content: "Working with you has been a game-changer for our business. The website redesign increased our conversion rate by 45%!",
  //     status: "approved",
  //     rating: 5,
  //   },
  //   {
  //     id: 2,
  //     name: "Jessica Martinez",
  //     company: "StartUp Innovations",
  //     date: "May 1, 2025",
  //     content: "The social media strategy you developed helped us reach new audiences we hadn't connected with before. Our engagement is up 60%.",
  //     status: "pending",
  //     rating: 5,
  //   },
  // ]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        // handle error
      } else {
        // map/format as needed
        setTestimonials(data);
      }
    };
    fetchTestimonials();
  }, []);

  const recentTestimonials = testimonials.slice(0, 2);

  const handleCopyLink = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(id);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  // const handleApprove = (id: number) => {
  //   setRecentTestimonials(recentTestimonials.map(testimonial =>
  //     testimonial.id === id ? { ...testimonial, status: "approved" } : testimonial
  //   ));
  //   toast.success("Testimonial approved successfully!");
  // };

  const handleApprove = async (id: number) => {
    // Update status in Supabase
    const { data, error } = await supabase
      .from("testimonials")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) {
      console.error("Failed to approve testimonial:", error.message);
      toast.error("Failed to approve testimonial");
    } else {
      // Update local state only if DB update succeeds
      setTestimonials(testimonials.map(testimonial =>
        testimonial.id === id ? { ...testimonial, status: "approved" } : testimonial
      ));
      toast.success("Testimonial approved successfully!");
    }
  };

  const handleReject = async (id: number) => {
    const { data, error } = await supabase
      .from("testimonials")
      .update({ status: "rejected" })
      .eq("id", id);

    console.log("Reject response data:", data);
    console.log("Reject response error:", error);

    if (error) {
      toast.error("Failed to reject testimonial: " + error.message);
    } else {
      setTestimonials(testimonials.map(testimonial =>
        testimonial.id === id ? { ...testimonial, status: "rejected" } : testimonial
      ));
      toast.success("Testimonial rejected");
    }
  };

  // const handleReject = (id: number) => {
  //   setRecentTestimonials(recentTestimonials.map(testimonial =>
  //     testimonial.id === id ? { ...testimonial, status: "rejected" } : testimonial
  //   ));
  //   toast.success("Testimonial rejected");
  // };

  const handleEditClick = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setEditForm({
      name: testimonial.name,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating
    });
    setIsEditDialogOpen(true);
  };

  // const handleEditSave = () => {
  //   if (editingTestimonial) {
  //     setRecentTestimonials(recentTestimonials.map(testimonial =>
  //       testimonial.id === editingTestimonial.id
  //         ? {
  //           ...testimonial,
  //           name: editForm.name,
  //           company: editForm.company,
  //           content: editForm.content,
  //           rating: editForm.rating
  //         }
  //         : testimonial
  //     ));
  //     setIsEditDialogOpen(false);
  //     toast.success("Testimonial updated successfully");
  //   }
  // };


  const handleEditSave = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map(testimonial =>
        testimonial.id === editingTestimonial.id
          ? {
            ...testimonial,
            name: editForm.name,
            company: editForm.company,
            content: editForm.content,
            rating: editForm.rating
          }
          : testimonial
      ));
      setIsEditDialogOpen(false);
      toast.success("Testimonial updated successfully");
    }
  };

  const handleEditCancel = () => {
    setIsEditDialogOpen(false);
    setEditingTestimonial(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === "rating" ? parseInt(value, 10) : value
    });
  };


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>

          <h1 className="text-2xl font-bold">Welcome, {authUser?.user_metadata?.full_name || "User"}</h1>
          <p className="text-gray-500">{authUser?.email}</p>

        </div>
        <Link to="/dashboard/new">
          <Button className="gradient-bg">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-xl card-shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Testimonial Wall</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
              Customize Wall
            </Button>
            <TestimonialEmbed companySlug="your-company" />
          </div>
        </div>

        <div className="space-y-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">{request.service_name} - {request.company_name}</p>
                <p className="text-sm text-gray-500 mt-1 truncate max-w-md">{request.link}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200"
                  onClick={() => handleCopyLink(request.id, request.link)}
                >
                  {copied === request.id ? (
                    <>
                      <Check size={14} className="mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                {/* <Link to={`/wall/${request.id}`}>
                  <Button variant="outline" size="icon" className="text-purple-600 border-purple-200">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </Link> */}
                <a href={`/wall/${request.id}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="text-purple-600 border-purple-200">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </a>


                <TestimonialEmbed companySlug={request.company_name.toLowerCase().replace(/\s+/g, '-')} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Testimonials</h2>
          <Link to="/dashboard/testimonials" className="text-sm text-purple-600 hover:text-purple-700 flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recentTestimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.company} • {testimonial.date}</CardDescription>
                  </div>
                  <div className="flex space-x-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{testimonial.content}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${testimonial.status === "approved"
                    ? "bg-green-50 text-green-700"
                    : testimonial.status === "rejected"
                      ? "bg-red-50 text-red-700"
                      : "bg-yellow-50 text-yellow-700"
                    }`}>
                    {testimonial.status === "approved" ? "Approved" :
                      testimonial.status === "rejected" ? "Rejected" : "Pending Review"}
                  </span>

                  <div className="flex space-x-2">
                    {testimonial.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-200 text-xs"
                          onClick={() => handleApprove(testimonial.id)}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 text-xs"
                          onClick={() => handleReject(testimonial.id)}
                        >
                          <XCircle size={14} className="mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-200 text-xs"
                      onClick={() => handleEditClick(testimonial)}
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>


      <blockquote
        className="
    mt-8 mb-8 p-6 italic text-lg font-bold text-gray-700 
    bg-purple-50 rounded-md max-w-3xl mx-auto text-center 
    relative border-2 border-l-purple-600
    outline outline-2 outline-gray-300 outline-offset-2
  "
        aria-live="polite"
      >
        “{rotatingQuotes[index]}”
      </blockquote>






      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Make changes to the testimonial information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <label className="text-sm font-medium col-span-1">
                Name
              </label>
              <input
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="col-span-3 border rounded p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <label className="text-sm font-medium col-span-1">
                Company
              </label>
              <input
                name="company"
                value={editForm.company}
                onChange={handleInputChange}
                className="col-span-3 border rounded p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <label className="text-sm font-medium col-span-1">
                Rating
              </label>
              <select
                name="rating"
                value={editForm.rating}
                onChange={handleInputChange}
                className="col-span-3 border rounded p-2"
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <label className="text-sm font-medium col-span-1">
                Content
              </label>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleInputChange}
                rows={4}
                className="col-span-3 border rounded p-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleEditCancel}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-purple-50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-purple-800">Upgrade to Collect More Testimonials</h2>
            <p className="text-sm text-purple-700">You've used 2 of 3 testimonials on your free plan.</p>
          </div>
          <Link to="/pricing">
            <Button className="gradient-bg">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
