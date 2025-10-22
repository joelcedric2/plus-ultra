import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Shield, Code, Rocket, Users } from "lucide-react";

const Landing = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = false; // TODO: Replace with actual auth state

  const handleBuildApp = () => {
    if (prompt.trim()) {
      navigate("/workspace");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
            <Sparkles className="w-3 h-3 mr-1" />
            The Self-Healing App Studio
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Build and ship apps now with PlusUltra
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Web and mobile, designed, debugged, and shipped by AI
          </p>

          {/* Build Prompt Input */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative glass-panel rounded-2xl p-2">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="build and ship your app now"
                className="min-h-[120px] resize-none border-0 bg-transparent focus-visible:ring-0 text-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleBuildApp();
                  }
                }}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleBuildApp}
                  className="bg-gradient-to-r from-accent to-purple text-white border-0 hover:opacity-90"
                  disabled={!prompt.trim()}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Building
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Projects Section - Only shown when authenticated */}
      {isAuthenticated && (
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Your Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TODO: Replace with actual user projects */}
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-panel hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Project {i}</CardTitle>
                    <CardDescription>Last edited 2 days ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-4" />
                    <Button variant="outline" className="w-full">Open Project</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why PlusUltra?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to build and ship apps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-panel border-primary/20">
              <CardHeader>
                <Zap className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Build and deploy apps in minutes, not months. AI handles the complexity.</p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-primary/20">
              <CardHeader>
                <Shield className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Self-Healing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">AI automatically debugs and fixes issues, ensuring your app stays running.</p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-primary/20">
              <CardHeader>
                <Code className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Full Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Export to GitHub anytime. Own your code, no vendor lock-in.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Templates Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Templates</h2>
            <p className="text-xl text-muted-foreground">Clone and customize projects from the community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "SaaS Starter", description: "Full-stack SaaS template with auth & payments", author: "PlusUltra" },
              { title: "E-commerce Store", description: "Complete online store with cart and checkout", author: "Community" },
              { title: "Dashboard Pro", description: "Analytics dashboard with charts and data viz", author: "Community" },
              { title: "Landing Page Kit", description: "Beautiful landing pages for any product", author: "PlusUltra" },
              { title: "Blog Platform", description: "Modern blog with CMS and markdown support", author: "Community" },
              { title: "AI Chatbot", description: "Conversational AI interface with memory", author: "PlusUltra" },
            ].map((template, i) => (
              <Card key={i} className="glass-panel hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary/40 group-hover:text-accent transition-colors" />
                  </div>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">by {template.author}</span>
                    <Button size="sm" variant="ghost" className="group-hover:bg-accent/10 group-hover:text-accent">
                      Clone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground mt-2">
                  $0<span className="text-base font-normal text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {["3 projects", "Community support", "Basic templates", "GitHub export"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <Card className="glass-panel border-2 border-accent relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground mt-2">
                  $29<span className="text-base font-normal text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {["Unlimited projects", "Priority support", "Advanced AI features", "Custom domains", "Team collaboration"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-accent to-purple text-white border-0">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Tier */}
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground mt-2">
                  Custom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom integrations", "On-premise option"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See PlusUltra in Action</h2>
          <p className="text-xl text-muted-foreground mb-12">Watch how easy it is to build and deploy apps</p>
          
          <div className="glass-panel rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
              <p className="text-muted-foreground">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel rounded-3xl p-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to build something amazing?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of developers shipping apps faster</p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-accent to-purple text-white border-0 text-lg px-8 py-6 hover:opacity-90"
            onClick={() => navigate("/workspace")}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Building for Free
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

export default Landing;