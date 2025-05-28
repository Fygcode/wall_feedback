import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/supabaseClient";
import { Loader2 } from "lucide-react";

// Define schemas for form validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // ✅ Sign Up with Supabase
  const onSignUp = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: "YourUsername", // Saved in user_metadata
          },
        },
      });

      if (error) {
        toast.error(`Error creating account: ${error.message}`);
        return;
      }

      const userId = signUpData?.user?.id;
      if (!userId) {
        toast.error("Unexpected error. Please try again.");
        return;
      }

      // ✅ Create user profile in 'profiles' table
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          email: email,
          full_name: "Anonymous",
          company_name: "Editor",
          company_logo: null,
          company_description: "",
          stripe_customer_id: null,
          created_at: new Date(),
          updated_at: new Date(),  // Timestamp for when the record is updated
        });

      if (profileError) {
        toast.error(`Error creating profile: ${profileError.message}`);
        return;
      }

      // ✅ Create user subscription (Free Plan) in 'user_subscription_plan' table
      const { error: subscriptionError } = await supabase
        .from("user_subscriptions")
        .insert({
          user_id: userId,
          plan_id: "b093be97-4c42-4314-b20e-f5d93b6c5c84", // Replace with actual Free Plan ID
          stripe_customer_id: null,
          stripe_subscription_id: null,
          status: "active",
          testimonial_limit: 3,
          request_limit: 2,
          created_at: new Date(),
          updated_at: new Date(),
        });

      if (subscriptionError) {
        toast.error(`Error creating subscription: ${subscriptionError.message}`);
        return;
      }

      toast.success("Account created successfully! Please log in.");
      setAuthMode("signin");
    }
    catch (error) {
      console.error("Unexpected sign-up error:", error);
      toast.error("Unexpected error during sign-up. Please try again.");
    } finally {
      setIsLoading(false); // Ensure the spinner is hidden in any case
    }
  };

  const onSignIn = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(`Sign-in failed: ${error.message}`);
        return; // Exit early if there's an error
      }

      toast.success("Sign-in successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Unexpected sign-in error:", error);
      toast.error("Unexpected error during sign-in. Please try again.");
    } finally {
      setIsLoading(false); // Ensure the spinner is hidden in any case
    }
  };


  const onForgotPassword = async (data: ForgotPasswordFormValues) => {
    const { email } = data;
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      toast.error(`Failed to send reset link: ${error.message}`);
    } else {
      toast.success("Password reset link sent to your email!");
      setAuthMode("signin");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to WallFeedback</h2>
            <p className="mt-2 text-sm text-gray-600">
              {authMode === "signin" ? "Sign in to your account" :
                authMode === "signup" ? "Create a new account" :
                  "Reset your password"}
            </p>
          </div>

          {authMode === "forgot" ? (
            <Card>
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Enter your email to receive a password reset link</CardDescription>
              </CardHeader>
              <Form {...forgotForm}>
                <form onSubmit={forgotForm.handleSubmit(onForgotPassword)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={forgotForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full gradient-bg">
                      Send Reset Link
                    </Button>
                    <Button
                      variant="link"
                      className="w-full"
                      onClick={() => setAuthMode("signin")}
                      type="button"
                    >
                      Back to Sign In
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <Tabs defaultValue={authMode} onValueChange={(v) => setAuthMode(v as "signin" | "signup")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="signin">
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </TabsContent>
                  <TabsContent value="signup">
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create an account to get started</CardDescription>
                  </TabsContent>
                </Tabs>
              </CardHeader>
              {authMode === "signin" ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onSignIn)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      {/* <Button type="submit" className="w-full gradient-bg">
                        Sign In
                      </Button> */}

                      <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                      <Button
                        variant="link"
                        className="w-full"
                        onClick={() => setAuthMode("forgot")}
                        type="button"
                      >
                        Forgot your password?
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              ) : (
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignUp)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              {/* <Input placeholder="you@example.com" {...field} /> */}
                              <Input
                                {...signupForm.register("email", { required: "Email is required" })}
                                placeholder="you@example.com"
                              />
                            </FormControl>
                            <FormMessage>{signupForm.formState.errors.email?.message}</FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...signupForm.register("password", { required: "Password is required" })}
                                placeholder="••••••••"
                              />
                            </FormControl>
                            <FormMessage>{signupForm.formState.errors.password?.message}</FormMessage>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      {/* <Button type="submit" className="w-full gradient-bg">
                        Create Account
                      </Button> */}

                      <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        ) : (
                          "Create Account"
                        )}
                      </Button>

                    </CardFooter>
                  </form>
                </Form>
              )}
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
