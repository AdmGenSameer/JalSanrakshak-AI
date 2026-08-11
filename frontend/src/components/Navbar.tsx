import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplets, Menu, X } from 'lucide-react';
import waterIcon from '@/assets/water-icon.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-background/80 backdrop-blur-md border border-border/50 shadow-soft rounded-full px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={waterIcon} 
              alt="JalSanrakshak AI" 
              className="h-7 w-7 transition-transform group-hover:scale-105" 
            />
            <span className="text-xl font-display font-medium text-foreground tracking-tight">
              JalSanrakshak <span className="font-serif italic font-light">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-sans text-sm"
            >
              Home
            </Link>
            <Link 
              to="/assessment" 
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-sans text-sm"
            >
              Assessment
            </Link>
            <Link 
              to="/about" 
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-sans text-sm"
            >
              About
            </Link>
            <Link to="/assessment">
            <Button size="sm" className="bg-primary hover:bg-primary-light text-primary-foreground transition-smooth rounded-full px-6 shadow-none">
              <Droplets className="w-3.5 h-3.5" />
              Start Assessment
            </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-card border border-border/50 rounded-2xl p-4 shadow-soft space-y-4 absolute top-full left-0 right-0 mx-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200 font-sans text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/assessment" 
              className="block px-4 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200 font-sans text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Assessment
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200 font-sans text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link to="/assessment" className="block w-full">
              <Button size="sm" className="w-full bg-primary hover:bg-primary-light text-primary-foreground transition-smooth rounded-full shadow-none">
                <Droplets className="w-3.5 h-3.5" />
                Start Assessment
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;