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
import { Star, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

interface Testimonial {
  id: number;
  name: string;
  company: string;
  date: string;
  content: string;
  status: "approved" | "rejected" | "pending";
  rating: number;
  service: string;
}

const Testimonials = () => {

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);


  // State for edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    company: "",
    content: "",
    service: "",
    rating: 5
  });

  useEffect(() => {
    console.log("useEffect triggered: fetching testimonials"); // ✅

    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        const now = new Date().toLocaleString();

        if (error) {
          console.error("Error fetching testimonials:", error.message);
          toast.error("Failed to load testimonials");
          return;
        }

        console.log("Raw Supabase data:", data);

        const formatted = data.map((item) => ({
          id: item.id,
          name: item.name,
          company: item.company || "N/A",
          date: new Date(item.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          content: item.content,
          status: item.status || "pending",
          rating: item.rating || 0,
          service: item.service || "N/A",
        }));

        console.log(`[${now}] Formatted testimonials:`, formatted);
        setTestimonials(formatted);
      } catch (e) {
        console.error("Unexpected error in fetchTestimonials:", e);
      }
    };

    fetchTestimonials();
  }, []);



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

  const handleDelete = async (id: number) => {
    const { data, error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    console.log("Delete response data:", data);
    console.log("Delete response error:", error);

    if (error) {
      toast.error("Failed to delete testimonial: " + error.message);
    } else {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      toast.success("Testimonial deleted successfully");
    }
  };


  const handleEditClick = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setEditForm({
      name: testimonial.name,
      company: testimonial.company,
      content: testimonial.content,
      service: testimonial.service,
      rating: testimonial.rating
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map(testimonial =>
        testimonial.id === editingTestimonial.id
          ? {
            ...testimonial,
            name: editForm.name,
            company: editForm.company,
            content: editForm.content,
            service: editForm.service,
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Testimonials</h1>
          <p className="text-gray-500">Manage your client testimonials</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Testimonial Management</CardTitle>
          <CardDescription>You have {testimonials.length} testimonials total</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </TableCell>
                  <TableCell>{testimonial.service}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${testimonial.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : testimonial.status === "rejected"
                        ? "bg-red-50 text-red-700"
                        : "bg-yellow-50 text-yellow-700"
                      }`}>
                      {testimonial.status === "approved" ? "Approved" :
                        testimonial.status === "rejected" ? "Rejected" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>{testimonial.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {/* Show approve button for pending or rejected testimonials */}
                      {(testimonial.status === "pending" || testimonial.status === "rejected") && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-green-600"
                          onClick={() => handleApprove(testimonial.id)}
                        >
                          <CheckCircle size={16} />
                        </Button>
                      )}

                      {/* Show reject button for pending or approved testimonials */}
                      {(testimonial.status === "pending" || testimonial.status === "approved") && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleReject(testimonial.id)}
                        >
                          <XCircle size={16} />
                        </Button>
                      )}

                      {/* Edit button for all testimonials */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditClick(testimonial)}
                      >
                        <Edit size={16} />
                      </Button>

                      {/* Delete button with confirmation for all testimonials */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this testimonial from {testimonial.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(testimonial.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                Service
              </label>
              <input
                name="service"
                value={editForm.service}
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Configure how your testimonials appear on your wall</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-sm">Display Order</label>
              <select className="w-full p-2 border rounded">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating First</option>
                <option value="random">Random Order</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-medium text-sm">Testimonial Style</label>
              <select className="w-full p-2 border rounded">
                <option value="cards">Cards</option>
                <option value="list">List View</option>
                <option value="grid">Grid Layout</option>
                <option value="carousel">Carousel</option>
              </select>
            </div>
          </div>
          <Button className="mt-4 gradient-bg">Save Display Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testimonials;
