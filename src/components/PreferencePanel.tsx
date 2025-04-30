
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreferencesState {
  animationSpeed: number;
  showParticles: boolean;
  particleDensity: number;
  particleColor: string;
}

const PreferencePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<PreferencesState>(() => {
    const savedPreferences = localStorage.getItem('user-preferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      animationSpeed: 1,
      showParticles: true,
      particleDensity: 50,
      particleColor: 'rgba(99, 102, 241, 0.2)'
    };
  });

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('user-preferences', JSON.stringify(preferences));
    
    // Update CSS variables for animation speed
    document.documentElement.style.setProperty('--animation-speed-factor', preferences.animationSpeed.toString());
    
    // Dispatch custom event to notify components about preference changes
    const event = new CustomEvent('preferencesChanged', { detail: preferences });
    window.dispatchEvent(event);
  }, [preferences]);

  const colorOptions = [
    { label: 'Blue', value: 'rgba(99, 102, 241, 0.2)' },
    { label: 'Purple', value: 'rgba(139, 92, 246, 0.2)' },
    { label: 'Pink', value: 'rgba(236, 72, 153, 0.2)' },
    { label: 'Orange', value: 'rgba(249, 115, 22, 0.2)' },
    { label: 'Green', value: 'rgba(16, 185, 129, 0.2)' }
  ];

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Settings className="h-5 w-5" />
      </Button>

      <div className={cn(
        "fixed inset-0 z-50 bg-black/50 flex justify-end transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <Card className={cn(
          "w-80 h-full rounded-none transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Animation Speed</h3>
              <Slider
                value={[preferences.animationSpeed]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(values) => {
                  setPreferences({ ...preferences, animationSpeed: values[0] });
                }}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Show Particles</h3>
                <Switch
                  checked={preferences.showParticles}
                  onCheckedChange={(checked) => {
                    setPreferences({ ...preferences, showParticles: checked });
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Particle Density</h3>
              <Slider
                value={[preferences.particleDensity]}
                min={10}
                max={100}
                step={5}
                disabled={!preferences.showParticles}
                onValueChange={(values) => {
                  setPreferences({ ...preferences, particleDensity: values[0] });
                }}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Particle Color</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {colorOptions.map((color) => (
                  <Button
                    key={color.value}
                    variant={preferences.particleColor === color.value ? "default" : "outline"}
                    className="flex-1 min-w-0"
                    disabled={!preferences.showParticles}
                    onClick={() => setPreferences({ ...preferences, particleColor: color.value })}
                  >
                    {color.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PreferencePanel;
