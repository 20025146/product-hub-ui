import { cn } from '@/lib/utils';
import { LayoutGrid, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className='w-full border-t bg-card'>
      <div className='container px-4 mx-auto py-8'>
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
