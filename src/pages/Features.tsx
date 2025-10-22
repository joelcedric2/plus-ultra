import { LandingHeader } from "@/components/landing/LandingHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Code, 
  Rocket, 
  Database, 
  Lock, 
  GitBranch,
  Palette,
  Brain,
  Workflow,
  Cloud,
  Users,
  MessageSquare,
  FileCode,
  CheckCircle2
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-10 h-10 text-accent" />,
      title: "AI-Powered Development",
      description: "Natural language prompts transform into fully functional applications. Just describe what you want, and watch PlusUltra build it.",
      details: [
        "Convert ideas to working code instantly",
        "Intelligent component generation",
        "Context-aware code suggestions",
        "Multi-step project planning"
      ]
    },
    {
      icon: <Shield className="w-10 h-10 text-accent" />,
      title: "Self-Healing Architecture",
      description: "AI continuously monitors, debugs, and fixes issues automatically. Your app stays running while PlusUltra handles the problems.",
      details: [
        "Automatic error detection",
        "Real-time bug fixes",
        "Performance optimization",
        "Security vulnerability patching"
      ]
    },
    {
      icon: <Zap className="w-10 h-10 text-accent" />,
      title: "Lightning Fast Deployment",
      description: "From concept to production in minutes. Build, test, and ship without the traditional development overhead.",
      details: [
        "One-click deployments",
        "Instant preview environments",
        "Zero-config hosting",
        "Global CDN distribution"
      ]
    },
    {
      icon: <Code className="w-10 h-10 text-accent" />,
      title: "Full Code Access",
      description: "Complete transparency and control. View, edit, and export your code anytime. No black boxes, no vendor lock-in.",
      details: [
        "Direct GitHub integration",
        "Export to any platform",
        "Full source code ownership",
        "Standard tech stack (React, TypeScript, Tailwind)"
      ]
    },
    {
      icon: <Palette className="w-10 h-10 text-accent" />,
      title: "Visual Editor",
      description: "Point-and-click interface for instant visual changes. Edit text, colors, and layouts without touching code.",
      details: [
        "Real-time visual editing",
        "Drag-and-drop components",
        "Instant style updates",
        "Responsive design tools"
      ]
    },
    {
      icon: <Database className="w-10 h-10 text-accent" />,
      title: "Built-in Backend",
      description: "Integrated database, authentication, and storage. Everything you need for full-stack apps, pre-configured and ready to use.",
      details: [
        "PostgreSQL database",
        "User authentication",
        "File storage",
        "Real-time subscriptions"
      ]
    },
    {
      icon: <GitBranch className="w-10 h-10 text-accent" />,
      title: "Version Control",
      description: "Time-travel through your project history. Revert to any previous state, compare changes, and experiment safely.",
      details: [
        "Automatic version snapshots",
        "One-click rollbacks",
        "Change comparison",
        "Branch-like experimentation"
      ]
    },
    {
      icon: <Users className="w-10 h-10 text-accent" />,
      title: "Real-time Collaboration",
      description: "Build together with your team. See live cursors, track changes, and collaborate seamlessly in real-time.",
      details: [
        "Live presence indicators",
        "Cursor tracking",
        "Role-based permissions",
        "Activity feeds"
      ]
    },
    {
      icon: <Workflow className="w-10 h-10 text-accent" />,
      title: "Edge Functions",
      description: "Serverless functions that scale automatically. Add backend logic, integrate APIs, and process data without managing servers.",
      details: [
        "Auto-scaling functions",
        "API integrations",
        "Scheduled jobs",
        "Webhook handlers"
      ]
    },
    {
      icon: <Lock className="w-10 h-10 text-accent" />,
      title: "Enterprise Security",
      description: "Bank-level security built-in. Encrypted data, secure authentication, and compliance-ready infrastructure.",
      details: [
        "End-to-end encryption",
        "SOC 2 compliant",
        "Role-based access control",
        "Automatic security updates"
      ]
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-accent" />,
      title: "AI Chat Assistant",
      description: "Conversational interface for building and debugging. Ask questions, request changes, and get instant help.",
      details: [
        "Natural language commands",
        "Context-aware responses",
        "Code explanations",
        "Debug assistance"
      ]
    },
    {
      icon: <FileCode className="w-10 h-10 text-accent" />,
      title: "Component Library",
      description: "Pre-built, customizable components. Beautiful UI elements ready to use and fully styled with your design system.",
      details: [
        "50+ UI components",
        "Shadcn/ui integration",
        "Custom variants",
        "Responsive by default"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 animate-fade-in">
            <Sparkles className="w-3 h-3 mr-1" />
            Complete Feature Set
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground animate-fade-in [animation-delay:100ms]">
            Everything You Need to Build <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">
              Amazing Apps
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
            From AI-powered development to enterprise security, PlusUltra provides all the tools you need in one powerful platform.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <Card 
                key={i} 
                className="glass-panel border-primary/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fade-in group"
                style={{animationDelay: `${i * 50}ms`}}
              >
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base pt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built on Modern Tech</h2>
            <p className="text-xl text-muted-foreground">Industry-standard tools and frameworks</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", desc: "UI Framework" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Vite", desc: "Build Tool" },
              { name: "Supabase", desc: "Backend" },
              { name: "Shadcn/ui", desc: "Components" },
              { name: "Tanstack Query", desc: "Data Fetching" },
              { name: "React Router", desc: "Routing" }
            ].map((tech, i) => (
              <Card 
                key={i} 
                className="glass-panel text-center hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${i * 100}ms`}}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                  <CardDescription>{tech.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel rounded-3xl p-12 animate-scale-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Experience It?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start building with all these features today, completely free
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-accent to-purple text-white border-0 text-lg px-8 py-6 hover:scale-110 hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300"
              asChild
            >
              <Link to="/workspace">
                <Rocket className="w-5 h-5 mr-2" />
                Start Building Now
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
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

export default Features;
