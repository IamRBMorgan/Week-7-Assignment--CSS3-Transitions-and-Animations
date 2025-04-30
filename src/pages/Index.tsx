
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, ArrowRight, Moon, Sun, Palette, Settings, Volume2 } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import AnimatedShapes from '@/components/AnimatedShapes';
import AnimatedCard from '@/components/AnimatedCard';
import ThemeToggle from '@/components/ThemeToggle';
import PreferencePanel from '@/components/PreferencePanel';
import { useToast } from '@/components/ui/toast';

const Index = () => {
  const [particleSettings, setParticleSettings] = useState({
    show: true,
    count: 50,
    color: 'rgba(99, 102, 241, 0.2)'
  });
  
  const { toast } = useToast();
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Animated button handler
  const handleAnimatedButtonClick = () => {
    const button = document.getElementById('animated-button');
    if (button) {
      button.classList.add('animate-pulse-slow');
      setTimeout(() => {
        button.classList.remove('animate-pulse-slow');
        toast({
          title: "Animation triggered!",
          description: "You've activated a JavaScript-controlled animation.",
        });
      }, 1000);
    }
  };
  
  // Get and set visitor count from localStorage
  const [visitCount, setVisitCount] = useState(0);
  useEffect(() => {
    const count = parseInt(localStorage.getItem('visit-count') || '0');
    setVisitCount(count + 1);
    localStorage.setItem('visit-count', (count + 1).toString());
    
    // Load preferences and apply to particle settings
    const savedPreferences = localStorage.getItem('user-preferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setParticleSettings({
        show: prefs.showParticles,
        count: prefs.particleDensity,
        color: prefs.particleColor
      });
    }
    
    // Listen for preference changes
    const handlePreferenceChange = (e: Event) => {
      const prefs = (e as CustomEvent).detail;
      setParticleSettings({
        show: prefs.showParticles,
        count: prefs.particleDensity,
        color: prefs.particleColor
      });
    };
    
    window.addEventListener('preferencesChanged', handlePreferenceChange as EventListener);
    
    return () => {
      window.removeEventListener('preferencesChanged', handlePreferenceChange as EventListener);
    };
  }, []);
  
  // Easter egg animation on heading click
  const handleHeadingClick = () => {
    if (headingRef.current) {
      headingRef.current.classList.add('animate-float');
      setTimeout(() => {
        if (headingRef.current) headingRef.current.classList.remove('animate-float');
        toast({
          title: "You found an easter egg!",
          description: "Click elements to discover more animations.",
        });
      }, 6000);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      {particleSettings.show && (
        <ParticleBackground 
          count={particleSettings.count} 
          color={particleSettings.color} 
        />
      )}
      <AnimatedShapes />
      
      <header className="relative z-10 container mx-auto py-6 flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>Animation Studio</span>
        </h3>
        <ThemeToggle />
      </header>
      
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-4 inline-block animate-fade-in">
            <Card className="inline-block px-4 py-2 bg-primary text-primary-foreground">
              <p className="text-sm font-medium">
                Visit #{visitCount} • Your preferences are automatically saved
              </p>
            </Card>
          </div>
          
          <h1 
            ref={headingRef}
            onClick={handleHeadingClick}
            className="text-4xl md:text-6xl font-bold mb-6 cursor-pointer transition-all duration-300"
          >
            Interactive Animations
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
            Experience the power of CSS animations combined with JavaScript interactivity. 
            Your preferences are stored in localStorage for a personalized experience.
          </p>
          
          <Button 
            id="animated-button"
            size="lg" 
            onClick={handleAnimatedButtonClick}
            className="group text-lg font-medium"
          >
            Trigger Animation
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 staggered-animation">
          <AnimatedCard
            title="Theme Preferences"
            description="Your theme choice is saved between sessions using localStorage"
            icon={<Moon className="h-8 w-8" />}
          />
          <AnimatedCard
            title="CSS Animations"
            description="Smooth transitions and animations powered by CSS"
            icon={<Palette className="h-8 w-8" />}
          />
          <AnimatedCard
            title="Custom Settings"
            description="Adjust animation speed and particle effects"
            icon={<Settings className="h-8 w-8" />}
          />
          <AnimatedCard
            title="Interactive Elements"
            description="JavaScript triggered animations for dynamic effects"
            icon={<Volume2 className="h-8 w-8" />}
          />
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">How it works</h2>
            <ul className="space-y-3 list-disc pl-6">
              <li>CSS animations provide smooth transitions and effects</li>
              <li>JavaScript triggers animations based on user interactions</li>
              <li>LocalStorage remembers your preferences between visits</li>
              <li>Theme settings persist across page refreshes</li>
            </ul>
          </Card>
        </div>
      </main>
      
      <PreferencePanel />
      
      <footer className="relative z-10 container mx-auto py-8 px-4 mt-12">
        <div className="border-t pt-8 text-center text-muted-foreground">
          <p>Made with CSS Transitions, Animations, and JavaScript Functions</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
