import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, LayoutGrid, Package, Home, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { AuthNav } from './AuthNav';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/products', label: 'Products', icon: Package },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}>
      <div className='container px-4 mx-auto flex items-center justify-between'>
        <NavLink
          to='/'
          className='flex items-center gap-2 font-semibold text-xl'>
          <LayoutGrid className='w-5 h-5' />
          <span className='transition-all duration-300'>Product Hub</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 text-sm font-medium transition-all',
                  'hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )
              }>
              <item.icon className='w-4 h-4' />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className='flex items-center gap-4'>
          {/* Authentication Navigation */}
          <AuthNav />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className='md:hidden'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full'
                aria-label='Menu'>
                <Menu className='w-5 h-5' />
              </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col gap-8 pt-12 w-[240px]'>
              <NavLink
                to='/'
                className='flex items-center gap-2 font-semibold text-xl'>
                <LayoutGrid className='w-5 h-5' />
                <span>Product Hub</span>
              </NavLink>

              <nav className='flex flex-col gap-2'>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-2 py-2 rounded-md transition-all',
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )
                    }>
                    <item.icon className='w-5 h-5' />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
