import { LandingHeader } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      tokens: "100 tokens/month",
      sessions: "~20 sessions/month for small apps",
      features: [
        "1 project, 1 user (no collaboration)",
        "Web/native apps",
        "Basic app store/Google Play publishing readiness",
        "BYO Supabase (Auth, DB, Functions)",
        "5GB storage",
        "Public apps only",
        "No TCI",
        "Docs/community support"
      ],
      cta: "Get Started",
      ctaVariant: "outline" as const,
      popular: false
    },
    {
      name: "Starter",
      price: "$25",
      period: "/month",
      annualPrice: "$20/month billed annually",
      tokens: "250 tokens",
      sessions: "~100 builds/edits/month",
      features: [
        "4 projects",
        "1 user + 2 collaborators (3 total/project)",
        "Web/native apps",
        "Basic app store/Google Play publishing",
        "BYO Supabase",
        "25GB storage",
        "Custom domains",
        "Basic integrations",
        "No TCI",
        "Email support (3-day SLA)"
      ],
      cta: "Start Free Trial",
      ctaVariant: "default" as const,
      popular: true,
      targetUsers: "Solo builders/freelancers"
    },
    {
      name: "Pro",
      price: "$200",
      period: "/month",
      annualPrice: "$160/month billed annually",
      tokens: "500 tokens/month",
      sessions: "~200+ sessions/month",
      features: [
        "10 projects",
        "1 user + 4 collaborators (5 total/project)",
        "Web/native apps",
        "Full app store/Google Play publishing",
        "BYO Supabase",
        "100GB storage",
        "Full TCI (temporal graphs, replays, predictions)",
        "Advanced integrations (EAS/TestFlight, compliance audits)",
        "Priority support (2-day SLA)",
        "Custom branding",
        "Analytics"
      ],
      cta: "Start Pro Trial",
      ctaVariant: "default" as const,
      popular: false,
      targetUsers: "Power devs/small teams"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      tokens: "Unlimited tokens (fair use)",
      sessions: "TCI included",
      features: [
        "Unlimited projects/collaborators",
        "Dedicated instances (K8s)",
        "Custom integrations/on-prem",
        "RBAC/SSO",
        "TCI with full governance (audit logs, SOC2/GDPR/SOX)",
        "Dedicated support (1-day SLA)",
        "99.9% SLA uptime",
        "Web/native apps",
        "Full app store/Google Play publishing",
        "BYO Supabase"
      ],
      cta: "Contact Sales",
      ctaVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple, Transparent Pricing
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Choose the plan that fits your needs
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From solo builders to enterprise teams, we have a plan for everyone
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`glass-panel relative flex flex-col h-full ${
                  tier.popular ? 'border-2 border-accent shadow-lg scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-white">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  {tier.annualPrice && (
                    <p className="text-sm text-muted-foreground mt-2">{tier.annualPrice}</p>
                  )}
                  <div className="mt-4 space-y-1">
                    <p className="text-sm font-semibold text-accent">{tier.tokens}</p>
                    <p className="text-xs text-muted-foreground">{tier.sessions}</p>
                  </div>
                  {tier.targetUsers && (
                    <p className="text-xs text-muted-foreground italic mt-2">{tier.targetUsers}</p>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={tier.ctaVariant}
                    className={`w-full ${
                      tier.ctaVariant === 'default' 
                        ? 'bg-gradient-to-r from-accent to-purple text-white border-0' 
                        : ''
                    }`}
                    asChild
                  >
                    <Link to="/workspace">{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg">What are PlusUltra Tokens?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  PlusUltra Tokens are usage credits that power your app building sessions, edits, and TCI features. 
                  Each build or edit consumes tokens based on complexity.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg">What is TCI?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Temporal Causality Intelligence (TCI) provides advanced debugging with temporal graphs, replays, 
                  and predictions. Available in Pro and Enterprise tiers for time-saving bug resolution.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any differences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel rounded-3xl p-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start building?</h2>
          <p className="text-xl text-muted-foreground mb-8">Choose your plan and ship your app today</p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-accent to-purple text-white border-0 text-lg px-8 py-6 hover:opacity-90"
            asChild
          >
            <Link to="/workspace">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 PlusUltra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
