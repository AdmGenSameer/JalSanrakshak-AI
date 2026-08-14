import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Droplets, 
  Zap, 
  Leaf, 
  Calculator, 
  TrendingUp, 
  Shield,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  X,
  Send,
  Volume2,
  VolumeX
} from 'lucide-react';
import heroImage from '@/assets/hero-water.jpg';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Home = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! 🌧 I'm your Jal Rakshak AI assistant. I can help you understand rainwater harvesting, calculate your water savings potential, and guide you through the assessment process. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if TTS is supported
  const isTtsSupported = () => {
    return 'speechSynthesis' in window;
  };

  // Speak text using TTS
  const speakText = (text: string) => {
    if (!ttsEnabled || !isTtsSupported()) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Select a voice (prefer female voices for better clarity)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || voice.name.includes('Google UK English Female')
    ) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Stop TTS
  const stopTts = () => {
    if (isTtsSupported()) {
      window.speechSynthesis.cancel();
    }
  };

  // Toggle TTS
  const toggleTts = () => {
    if (ttsEnabled) {
      stopTts();
    }
    setTtsEnabled(!ttsEnabled);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage.trim());
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      // Speak the AI response if TTS is enabled
      if (ttsEnabled) {
        speakText(aiResponse);
      }
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to Jal Rakshak! I'm here to help you with all things rainwater harvesting. Would you like to learn about water savings, start an assessment, or explore system options?";
    }
    
    if (lowerMessage.includes('assessment') || lowerMessage.includes('calculate') || lowerMessage.includes('form')) {
      return "The free assessment takes about 5 minutes and will calculate your exact water harvesting potential! You'll need your roof area, location, and basic household info. Ready to start saving water and money?";
    }
    
    if (lowerMessage.includes('benefit') || lowerMessage.includes('save') || lowerMessage.includes('advantage')) {
      return "Rainwater harvesting benefits include: 40-50% reduction in water bills, reliable water during shortages, reduced groundwater stress, better garden health, and environmental conservation. An average home can save 15,000+ liters annually!";
    }
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('expensive')) {
      return "System costs range from ₹30,000 to ₹80,000 based on roof size and tank capacity. Most systems pay for themselves in 3-5 years through water bill savings. Government subsidies may also be available in your area!";
    }
    
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('get started')) {
      return "Great! Click 'Start Free Assessment' on the homepage. You'll answer questions about your property, and our AI will analyze your rainwater potential. You'll get a detailed report with recommendations!";
    }
    
    if (lowerMessage.includes('system') || lowerMessage.includes('install') || lowerMessage.includes('setup')) {
      return "Basic systems include: catchment area (your roof), pipes to channel water, filters to clean it, storage tanks, and distribution. I can help design the perfect system for your home's needs!";
    }
    
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('clean')) {
      return "Maintenance is simple: clean gutters quarterly, check filters monthly, inspect tanks annually. Proper maintenance ensures clean water and optimal system performance for years!";
    }
    
    if (lowerMessage.includes('water quality') || lowerMessage.includes('drink') || lowerMessage.includes('safe')) {
      return "Rainwater is excellent for gardening, cleaning, and flushing. For drinking, it needs proper filtration. I can recommend UV filters or RO systems to make it potable and safe!";
    }
    
    if (lowerMessage.includes('government') || lowerMessage.includes('subsidy') || lowerMessage.includes('scheme')) {
      return "Many Indian states offer 30-50% subsidies! Check with your local municipal corporation. I can help you find available schemes in your area once you provide your location.";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm always here to help with your water conservation journey. Every drop saved makes a difference! 💧 Feel free to ask anything else!";
    }

    if (lowerMessage.includes('roof') || lowerMessage.includes('area') || lowerMessage.includes('measure')) {
      return "For roof measurement: Use Google Earth's ruler tool or simply estimate based on your house size. An average Indian home has 80-150 sqm roof area. Don't worry about perfect measurements - we can help you estimate!";
    }

    return "I'd love to help you with rainwater harvesting! Could you tell me more about what you'd like to know? I can assist with system design, cost estimates, water savings calculations, or guide you through the assessment process.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Smart Calculations",
      description: "AI-powered assessment of your rainwater harvesting potential based on local conditions."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Predictive Analytics", 
      description: "Machine learning predictions for water savings and system efficiency."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Comprehensive Reports",
      description: "Detailed analysis with cost-benefit projections and installation guidance."
    }
  ];

  const benefits = [
    "Calculate annual harvestable water potential",
    "Get customized system recommendations",
    "Analyze cost-benefit with payback period",
    "Understand local soil and groundwater conditions",
    "Generate detailed PDF reports",
    "Access Google Earth integration for measurements"
  ];

  const stats = [
    { value: "40%", label: "Water Bills Reduction" },
    { value: "15L", label: "Average Daily Savings" },
    { value: "₹50K", label: "Typical System Cost" },
    { value: "5 Years", label: "Average Payback" }
  ];

  return (
    <div className="min-h-screen bg-background texture-noise">
      {/* Chatbot FAB */}
      {!chatbotOpen && (
        <button
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-soft flex items-center justify-center cursor-pointer z-50 hover:scale-105 transition-smooth"
          onClick={() => setChatbotOpen(true)}
          title="Chat with Jal Rakshak AI"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chatbot Modal */}
      {chatbotOpen && (
        <div className="fixed bottom-24 right-6 w-[400px] h-[550px] bg-card rounded-xl shadow-soft z-50 flex flex-col border border-border overflow-hidden fade-in">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-5 flex justify-between items-center">
            <div>
              <h3 className="font-display font-medium text-lg tracking-tight">Jal Rakshak AI</h3>
              <p className="text-primary-foreground/80 text-sm font-sans">Smart Assessment Assistant</p>
            </div>
            <div className="flex items-center gap-2">
              {/* TTS Toggle Button */}
              {isTtsSupported() && (
                <button
                  onClick={toggleTts}
                  className={`p-2 rounded-full transition-colors ${
                    ttsEnabled 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={ttsEnabled ? "Disable Text-to-Speech" : "Enable Text-to-Speech"}
                >
                  {ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
              )}
              <button
                onClick={() => {
                  stopTts();
                  setChatbotOpen(false);
                }}
                className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-background/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-card text-card-foreground border border-border shadow-sm rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm font-sans leading-relaxed">{message.content}</p>
                  <p className={`text-[10px] mt-2 font-medium uppercase tracking-wider ${message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border shadow-sm rounded-2xl rounded-bl-sm px-5 py-4">
                  <div className="flex space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about rainwater harvesting..."
                className="flex-1 bg-input/50 focus-visible:ring-1 focus-visible:ring-primary border-none shadow-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-primary hover:bg-primary-light text-primary-foreground shadow-none"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                Powered by Advanced AI
              </p>
              {isTtsSupported() && (
                <p className="text-xs text-gray-500">
                  TTS: {ttsEnabled ? 'ON' : 'OFF'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main site content */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden fade-in">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-display font-light leading-[1.1] tracking-tight text-foreground">
                  Smart <span className="font-serif italic text-primary">Rainwater</span>
                  <br />Harvesting with AI.
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground font-sans font-light leading-relaxed max-w-2xl">
                  Discover your water conservation potential with our AI-powered assessment tool. 
                  Get personalized recommendations and technical specifications.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/assessment">
                  <Button size="xl" className="group bg-primary text-primary-foreground rounded-full px-8 hover:bg-primary-light transition-smooth text-base">
                    <Droplets className="h-5 w-5 mr-2" />
                    Start Free Assessment
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl" className="rounded-full px-8 text-base border-border hover:bg-secondary/50 transition-smooth">
                  <Zap className="h-5 w-5 mr-2" />
                  See Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-1">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Interactive Splash Screen */}
              <div className="relative w-full">
                <SplashScreen 
                  autoPlay={true}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-light tracking-tight">
              Powered by <span className="font-serif italic text-primary">Advanced AI</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Our intelligent system analyzes multiple data sources to provide accurate, 
              personalized rainwater harvesting recommendations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-border/40 shadow-sm hover:shadow-soft transition-smooth group">
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-display font-medium">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <CardDescription className="text-center text-base font-light leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-display font-light tracking-tight">
                What You'll <span className="font-serif italic text-primary">Discover</span>
              </h2>
              <p className="text-xl font-light text-muted-foreground leading-relaxed">
                Get comprehensive insights about your rainwater harvesting potential 
                with our detailed assessment and recommendations.
              </p>
              
              <div className="space-y-5 pt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-smooth">
                      <CheckCircle className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-lg font-light text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Link to="/assessment">
                  <Button size="xl" className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 transition-smooth">
                    Get Started Now
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <Card className="glass-card border-0 shadow-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>CO₂ Reduction</span>
                    <span className="font-semibold text-primary">2.5 tons/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water Saved</span>
                    <span className="font-semibold text-primary">15,000L/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Energy Savings</span>
                    <span className="font-semibold text-primary">₹8,000/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Groundwater Recharge</span>
                    <span className="font-semibold text-primary">High Impact</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center space-y-10 max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-display font-light tracking-tight">
              Ready to <span className="font-serif italic">Save Water</span>?
            </h2>
            <p className="text-xl lg:text-2xl font-light text-primary-foreground/80 leading-relaxed">
              Start your personalized rainwater harvesting assessment today. 
              It takes just 5 minutes to get comprehensive recommendations.
            </p>
            <div className="pt-4">
              <Link to="/assessment">
                <Button size="xl" className="group bg-background text-foreground hover:bg-secondary rounded-full px-10 py-6 text-lg transition-smooth">
                  <Droplets className="h-5 w-5 mr-3" />
                  Start Your Assessment
                  <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;