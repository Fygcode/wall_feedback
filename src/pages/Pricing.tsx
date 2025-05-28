
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  const plans = [
    {
      name: "Starter",
      description: "For hobbies 🎪",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      period: "/month",
      monthlyBilledText: "(Forever free)",
      yearlyBilledText: "(Forever free)",
      yearlyTotal: "$0",
      headerText: "Free forever, features include:",
      features: [
        "1 space",
        "2 video testimonials in total",
        "10 text testimonials in total",
        "Unlimited X, LinkedIn posts importing",
        "Public Testimonial page",
        "Wall of Love widget with our logo"
      ],
      buttonText: "Get started",
      buttonVariant: "outline" as const,
      buttonColor: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
      highlight: false
    },
    {
      name: "Starter Plus",
      description: "For small teams 🏠",
      monthlyPrice: "$21",
      yearlyPrice: "$17",
      period: "/month",
      monthlyBilledText: "(Billed monthly)",
      yearlyBilledText: "($204 billed annually)",
      yearlyTotal: "$204",
      headerText: "Everything in Starter, and:",
      features: [
        "Unlimited text testimonials",
        "2 video testimonials in total",
        "10+ other social media and review sites importing",
        "AI case study generator",
        "Page localization",
        "Remove our branding from all widgets",
        "Custom domain (SSL)"
      ],
      buttonText: "👉 Start a free trial",
      buttonVariant: "outline" as const,
      buttonColor: "bg-white text-black border-gray-200 hover:bg-gray-50",
      highlight: false
    },
    {
      name: "Premium",
      description: "For growing businesses 📈",
      monthlyPrice: "$34",
      yearlyPrice: "$29",
      period: "/month/space",
      monthlyBilledText: "(Billed monthly)",
      yearlyBilledText: "($348 billed annually)",
      yearlyTotal: "$348",
      headerText: "Everything in Starter Plus, and:",
      features: [
        "Unlimited testimonials",
        "500 automated monthly invitations via T.E.A.",
        "3 minutes video time limit",
        "Custom cards on Wall of Love",
        "eGift cards integration",
        "Portfolio page",
        "RESTful API & Webhook",
        "Zapier and Make integrations",
        "2 account-level staff seats"
      ],
      buttonText: "👉 Start a free trial",
      buttonVariant: "default" as const,
      buttonColor: "bg-purple-600 text-white hover:bg-purple-700",
      highlight: true
    },
    {
      name: "Ultimate",
      description: "For large businesses 📌",
      monthlyPrice: "$50",
      yearlyPrice: "$42",
      period: "/month/space",
      monthlyBilledText: "(Billed monthly)",
      yearlyBilledText: "($504 billed annually)",
      yearlyTotal: "$504",
      headerText: "Everything in Premium, and:",
      features: [
        "Unlimited testimonials",
        "1,000 automated monthly invitations via T.E.A.",
        "5 minutes video time limit",
        "Video metric insights",
        "Sentiment analysis",
        "Star rating snippet in Google search",
        "HubSpot, Slack integrations",
        "3 space-level seats for each space",
        "5 account-level staff seats",
        "Onboarding assistance",
        "Pro video editing service ($500 value)"
      ],
      buttonText: "👉 Start a free trial",
      buttonVariant: "outline" as const,
      buttonColor: "bg-white text-black border-gray-200 hover:bg-gray-50",
      highlight: false
    }
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto py-16 px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The simplest way to get more sales<br className="mb-6"/>for your business
            {/* The easiest way to drive more sales<br />for your business */}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Start with 10 text testimonials and 2 video testimonials on us, then upgrade to our paid plan only if you're happy.
          </p>
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium">
            7 days free trial, cancel anytime!
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`text-sm ${billingCycle === "monthly" ? "font-medium" : ""}`}>
            Billed Monthly
          </span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={toggleBillingCycle}
          />
          <span className={`text-sm ${billingCycle === "yearly" ? "font-medium" : ""}`}>
            Billed Yearly
          </span>
          {billingCycle === "yearly" && (
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
              2 months off 🎁
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-lg border ${
                plan.highlight 
                  ? "border-purple-400 shadow-lg shadow-purple-100" 
                  : "border-gray-200"
              } p-6`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-600 ml-1 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-500 text-xs">
                  {billingCycle === "monthly" ? plan.monthlyBilledText : plan.yearlyBilledText}
                </p>
                {billingCycle === "yearly" && plan.yearlyTotal !== "$0" && (
                  <p className="text-gray-500 text-xs mt-1">
                    Total: <span className="font-medium">{plan.yearlyTotal}</span> per year
                  </p>
                )}
              </div>
              <div className="mb-8">
                <p className="font-medium text-sm text-purple-700 mb-4 border-b border-gray-100 pb-2">{plan.headerText}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex text-sm">
                      <Check className="text-green-500 mr-2 h-5 w-5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.name === "Ultimate" && (
                  <p className="text-xs text-purple-600 hover:text-purple-700 mt-2 cursor-pointer">Need more quota?</p>
                )}
              </div>
              <Link to="/auth">
                <Button 
                  variant={plan.buttonVariant} 
                  className={`w-full ${plan.buttonColor}`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
