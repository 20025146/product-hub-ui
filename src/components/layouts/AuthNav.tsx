import { NavLink } from 'react-router-dom';
import { LogOut, UserCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export function AuthNav() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out');
  };

  if (isAuthenticated) {
    return (
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleLogout}
          className='gap-1.5'>
          <LogOut className='w-4 h-4' />
          <span className='hidden sm:inline'>Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <NavLink to='/sign-in'>
        <Button variant='ghost' size='sm' className='gap-1.5'>
          <LogIn className='w-4 h-4' />
          <span className='hidden sm:inline'>Sign In</span>
        </Button>
      </NavLink>
      <NavLink to='/sign-up'>
        <Button size='sm'>Sign Up</Button>
      </NavLink>
    </div>
  );
}
