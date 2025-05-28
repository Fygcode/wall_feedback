import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Download, DollarSign, Shield } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  company: z.string().min(1, {
    message: "Company name is required.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Settings = () => {
  // Mock user data (would typically come from auth context)
  const [user, setUser] = useState({
    name: "Jane Smith",
    email: "jane@example.com",
    company: "Acme Inc.",
    plan: "Free"
  });

  // Profile form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      company: user.company,
    },
  });

  const onSubmitProfile = (data: ProfileFormValues) => {
    console.log(data);
    setUser({
      ...user,
      name: data.name,
      email: data.email,
      company: data.company,
    });
    toast.success("Profile updated successfully");
  };

  // Mock billing history data
  const billingHistory = [
    {
      id: "INV-001",
      date: "2025-05-01",
      amount: 19,
      description: "Premium Plan - Monthly",
      status: "Paid",
      invoiceUrl: "#",
    },
    {
      id: "INV-002",
      date: "2025-04-01",
      amount: 19,
      description: "Premium Plan - Monthly",
      status: "Paid",
      invoiceUrl: "#",
    },
    {
      id: "INV-003",
      date: "2025-03-01",
      amount: 19,
      description: "Premium Plan - Monthly",
      status: "Paid",
      invoiceUrl: "#",
    },
    {
      id: "INV-004",
      date: "2025-02-01",
      amount: 19,
      description: "Premium Plan - Monthly",
      status: "Failed",
      invoiceUrl: "#",
    },
  ];

  // Plans and features
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals and small businesses just getting started.",
      isCurrent: user.plan === "Free",
      features: [
        "3 testimonials",
        "Basic customization",
        "Standard wall design",
      ],
    },
    {
      name: "Premium",
      price: "$19",
      description: "For growing businesses collecting more testimonials.",
      isCurrent: user.plan === "Premium",
      features: [
        "Unlimited testimonials",
        "Advanced customization",
        "Custom wall design",
        "Custom branding",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For large organizations with multiple brands.",
      isCurrent: user.plan === "Enterprise",
      features: [
        "Everything in Premium",
        "Multiple testimonial walls",
        "Multiple team members",
        "API access",
        "Dedicated support",
        "Single sign-on (SSO)",
      ],
    },
  ];

  // Function to handle invoice download
  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real app, this would trigger a download from your backend or directly from Stripe
    toast.success(`Downloading invoice ${invoiceId}`);
  };

  // Function to upgrade plan
  const handleUpgradePlan = (planName: string) => {
    if (user.plan === planName) {
      toast("You're already on this plan");
      return;
    }
    
    // This would typically call a payment API
    setUser({
      ...user,
      plan: planName,
    });
    
    toast.success(`Successfully upgraded to ${planName} plan`);
  };

  // Function to cancel subscription
  const handleCancelSubscription = () => {
    // This would typically call an API to cancel the subscription
    setUser({
      ...user,
      plan: "Free",
    });
    
    toast.success("Subscription cancelled successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your account and subscription</p>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Company name" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="gradient-bg">
                    Update Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You're currently on the {user.plan} plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-100 p-3">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{user.plan} Plan</h3>
                    <p className="text-sm text-gray-500">
                      {user.plan === "Free" ? "3 testimonials limit" : 
                       user.plan === "Premium" ? "Unlimited testimonials" :
                       "Enterprise features"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                {user.plan !== "Free" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-red-500 border-red-200">
                        Cancel Subscription
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel your subscription? You'll lose access to premium features and your account will be downgraded to the Free plan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, keep subscription</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleCancelSubscription} 
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Yes, cancel subscription
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                
                <p className="text-sm text-gray-500">
                  {user.plan !== "Free" ? "Next billing cycle on June 1, 2025" : "Upgrade to unlock premium features"}
                </p>
              </CardFooter>
            </Card>
            
            <h2 className="text-xl font-semibold pt-4">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative ${plan.isCurrent ? "border-purple-500 ring-2 ring-purple-200" : ""}`}
                >
                  {plan.isCurrent && (
                    <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                      Current Plan
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-lg font-bold">{plan.price}</span> / month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.isCurrent ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : "gradient-bg"}`}
                      onClick={() => handleUpgradePlan(plan.name)}
                      disabled={plan.isCurrent}
                    >
                      {plan.isCurrent ? "Current Plan" : `Upgrade to ${plan.name}`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <Shield className="h-4 w-4" />
              <p>All payments are securely processed by Stripe</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="billing-history">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past transactions and download invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {billingHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>${item.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === "Paid" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDownloadInvoice(item.id)}
                          >
                            <span className="sr-only">Download invoice</span>
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <DollarSign className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No billing history</h3>
                  <p className="text-gray-500">You haven't made any payments yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
