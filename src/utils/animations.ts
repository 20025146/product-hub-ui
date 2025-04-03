import { cn } from '@/lib/utils';

export type AnimationType =
  | 'fade-in'
  | 'fade-out'
  | 'slide-up'
  | 'slide-down'
  | 'scale-in'
  | 'float'
  | 'pulse-soft';

export type AnimationSpeed = 'fast' | 'normal' | 'slow';

export type AnimationDelay = 'none' | 'short' | 'medium' | 'long';

/**
 * Creates animation class names based on the provided parameters
 */
export const createAnimation = (
  type: AnimationType,
  speed: AnimationSpeed = 'normal',
  delay: AnimationDelay = 'none'
) => {
  const animationClass = `animate-${type}`;

  const durationMap: Record<AnimationSpeed, string> = {
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500',
  };

  const delayMap: Record<AnimationDelay, string> = {
    none: 'delay-0',
    short: 'delay-100',
    medium: 'delay-300',
    long: 'delay-500',
  };

  return cn(animationClass, durationMap[speed], delayMap[delay]);
};

/**
 * Applies staggered animations to an array of elements
 */
export const createStaggeredAnimation = (
  type: AnimationType,
  count: number,
  baseDelay: number = 50
) => {
  return Array.from({ length: count }).map((_, index) => ({
    animation: type,
    style: { animationDelay: `${baseDelay * index}ms` },
  }));
};
