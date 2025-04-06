import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AnimatedCard } from '@/components/custom/AnimatedCard';
import { PageTransition } from '@/components/custom/PageTransition';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const success = await login(values.email, values.password);

      if (success) {
        toast.success('Successfully signed in!');
        navigate('/');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during sign in');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className='min-h-screen flex items-center justify-center p-4'>
        <AnimatedCard animation='fade-in' className='w-full max-w-md'>
          <div className='text-center mb-6'>
            <h1 className='text-2xl font-bold'>Welcome back</h1>
            <p className='text-muted-foreground mt-2'>
              Sign in to your account to continue
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                        <Input
                          placeholder='Enter your email'
                          className='pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <LockKeyhole className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your password'
                          className='pl-10'
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute right-0 top-0 h-full px-3'
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-muted-foreground' />
                          ) : (
                            <Eye className='h-4 w-4 text-muted-foreground' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>

          <div className='mt-6 text-center text-sm'>
            <p className='text-muted-foreground'>
              Don't have an account?{' '}
              <Link
                to='/register'
                className='text-primary font-medium hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </AnimatedCard>
      </div>
    </PageTransition>
  );
};

export default SignIn;
