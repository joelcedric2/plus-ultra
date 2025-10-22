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
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 animate-fade-in">
            <Sparkles className="w-3 h-3 mr-1" />
            Self-debugging App Studio
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground animate-fade-in [animation-delay:100ms]">
            Build and ship apps now <br className="hidden md:block" />with PlusUltra
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
            Web and mobile, designed, debugged, and shipped by AI
          </p>

          {/* Build Prompt Input */}
          <div className="max-w-3xl mx-auto mb-8 animate-scale-in [animation-delay:300ms]">
            <div className="relative bg-secondary/50 border border-border/50 rounded-2xl focus-within:border-primary/50 transition-colors">
              <Textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  // Auto-resize
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                placeholder="build and ship your app now"
                className="w-full resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl py-2 px-4 pr-20 placeholder:text-muted-foreground/50 max-h-[200px] overflow-y-auto leading-tight min-h-[56px] text-base"
                rows={1}
                style={{ height: 'auto' }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleBuildApp();
                  }
                }}
              />
              
              {/* Bottom Row: Tools and Send Button */}
              <div className="flex items-center justify-between px-2 pb-1.5">
                <div className="flex items-center gap-1">
                  {/* Attach Button */}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                    </svg>
                  </Button>

                  {/* Voice Button */}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" x2="12" y1="19" y2="22"/>
                    </svg>
                  </Button>

                  {/* Edit Button */}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                    </svg>
                  </Button>

                  {/* Plus Button */}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <path d="M5 12h14"/>
                      <path d="M12 5v14"/>
                    </svg>
                  </Button>
                </div>

                {/* Send Button */}
                <Button 
                  onClick={handleBuildApp}
                  disabled={!prompt.trim()}
                  size="sm"
                  className="h-8 w-8 p-0 bg-gradient-to-r from-accent to-purple hover:opacity-90 disabled:opacity-50 text-accent-foreground shadow-lg shadow-accent/20 rounded-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 7-7 7 7"/>
                    <path d="M12 19V5"/>
                  </svg>
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
                <Card key={i} className="glass-panel hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why PlusUltra?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to build and ship apps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-panel border-primary/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in [animation-delay:100ms] group">
              <CardHeader>
                <Zap className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Build and deploy apps in minutes, not months. AI handles the complexity.</p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-primary/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in [animation-delay:200ms] group">
              <CardHeader>
                <Shield className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle>Self-Healing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">AI automatically debugs and fixes issues, ensuring your app stays running.</p>
              </CardContent>
            </Card>

            <Card className="glass-panel border-primary/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in [animation-delay:300ms] group">
              <CardHeader>
                <Code className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
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
          <div className="text-center mb-16 animate-fade-in">
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
              <Card key={i} className="glass-panel hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer group animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-accent/30 group-hover:to-purple/30 transition-all duration-300">
                    <Users className="w-12 h-12 text-primary/40 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">by {template.author}</span>
                    <Button size="sm" variant="ghost" className="group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                      Clone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">See PlusUltra in Action</h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in [animation-delay:100ms]">Watch how easy it is to build and deploy apps</p>
          
          <div className="glass-panel rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center animate-scale-in [animation-delay:200ms] hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-125 transition-all duration-300 animate-pulse">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
              <p className="text-muted-foreground">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel rounded-3xl p-12 animate-scale-in hover:shadow-2xl transition-all duration-500">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">Ready to build something amazing?</h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in [animation-delay:100ms]">Join thousands of developers shipping apps faster</p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-accent to-purple text-white border-0 text-lg px-8 py-6 hover:scale-110 hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 animate-fade-in [animation-delay:200ms]"
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