import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  AnimationDelay,
  AnimationSpeed,
  AnimationType,
  createAnimation,
} from '@/utils/animations';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  speed?: AnimationSpeed;
  delay?: AnimationDelay;
  hover?: boolean;
  glass?: boolean;
}

export function AnimatedCard({
  children,
  className,
  animation = 'fade-in',
  speed = 'normal',
  delay = 'none',
  hover = true,
  glass = false,
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm p-6',
        hover && 'card-hover',
        glass && 'glass glass-hover',
        createAnimation(animation, speed, delay),
        className
      )}>
      {children}
    </div>
  );
}
