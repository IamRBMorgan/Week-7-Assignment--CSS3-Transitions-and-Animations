
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, description, icon, className }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20",
        isAnimating ? "animate-pulse-slow" : "", 
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="text-primary text-3xl mb-2">
            {icon}
          </div>
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedCard;
