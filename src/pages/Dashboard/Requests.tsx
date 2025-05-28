
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Link, Trash2 } from "lucide-react";
import { toast } from "sonner";
import TestimonialEmbed from "@/components/TestimonialEmbed";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { supabase } from "@/supabaseClient";
import { useAuth } from "@/context/authContext";

const Requests = () => {

  const [copied, setCopied] = useState<string | null>(null);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {

      console.log("User ID:", user.id);
      console.log("User Name:", user.user_metadata?.full_name || user.email || "No name available");

      if (!user) {
        toast.error("You must be logged in to view requests.");
        return;
      }

      const { data, error } = await supabase
        .from("testimonial_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load requests.");
        return;
      }

      setRequests(data || []);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCopyLink = (id: string, link: string) => {

    console.log("Request ID:", id);
    console.log("Copied Link:", link);
    navigator.clipboard.writeText(link);
    setCopied(id);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("testimonial_requests")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete request.");
      return;
    }

    setRequests(requests.filter((request) => request.id !== id));
    toast.success("Request deleted successfully");
  };

  const generateLink = (companyName: string, slug: string) => {
    const companySlug = companyName.toLowerCase().replace(/\s+/g, '-');
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://wallfeedback.com";
    return `${baseUrl}/submit/${companySlug}/${slug}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Testimonial Requests</h1>
          <p className="text-gray-500">Manage your testimonial collection requests</p>
        </div>

        <Button className="gradient-bg" onClick={() => window.location.href = '/dashboard/new'}>
          Create New Request
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Requests</CardTitle>
          <CardDescription>You have {requests.length} active requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>

                <TableHead>Company</TableHead>
                <TableHead>Service/Project</TableHead>
                <TableHead>Created</TableHead>
                {/* <TableHead>Responses</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <TableRow key={request.id}>

                    <TableCell>{request.company_name}</TableCell>
                    <TableCell>{request.service_name}</TableCell>
                    <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                    {/* <TableCell>{request.responses}</TableCell> */}
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-purple-600 border-purple-200 flex items-center gap-1"
                          onClick={() => handleCopyLink(request.id, generateLink(request.company_name, request.slug))}
                        >
                          {copied === request.id ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Link</>}
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => window.open(generateLink(request.company_name, request.slug), '_blank')}
                        >
                          <Link size={16} />
                        </Button>

                        <TestimonialEmbed companySlug={request.company_name.toLowerCase().replace(/\s+/g, '-')} />
                        {/* <TestimonialEmbed companySlug={generateLink(request.company_name, request.slug)} /> */}


                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-red-600"><Trash2 size={16} /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Request</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this testimonial request? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(request.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">No testimonial requests found.</TableCell>
                </TableRow>
              )}
            </TableBody>





          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Requests;
