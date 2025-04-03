import { cn } from '@/lib/utils';
import { LayoutGrid, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className='w-full border-t bg-card'>
      <div className='container px-4 mx-auto py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 font-semibold'>
              <LayoutGrid className='w-5 h-5' />
              <span className='text-lg'>Product Hub</span>
            </div>
            <p className='text-sm text-muted-foreground max-w-xs'>
              A beautifully designed CRUD application for managing products.
            </p>
          </div>

          <div className='flex gap-4'>
            <a
              href='#'
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-full',
                'bg-secondary text-secondary-foreground',
                'transition-all hover:bg-primary hover:text-primary-foreground'
              )}
              aria-label='GitHub'>
              <Github className='w-5 h-5' />
            </a>
            <a
              href='#'
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-full',
                'bg-secondary text-secondary-foreground',
                'transition-all hover:bg-primary hover:text-primary-foreground'
              )}
              aria-label='LinkedIn'>
              <Linkedin className='w-5 h-5' />
            </a>
            <a
              href='#'
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-full',
                'bg-secondary text-secondary-foreground',
                'transition-all hover:bg-primary hover:text-primary-foreground'
              )}
              aria-label='Twitter'>
              <Twitter className='w-5 h-5' />
            </a>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Product Hub. All rights reserved.
          </p>

          <div className='flex gap-6'>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
              Privacy
            </a>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
              Terms
            </a>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
