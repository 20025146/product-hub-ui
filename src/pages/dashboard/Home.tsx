import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import {
  ShoppingBag,
  ChevronRight,
  ChevronUp,
  PackageOpen,
  Layers,
  AlertCircle,
  DollarSign,
} from 'lucide-react';
import {
  getDashboardStats,
  mockCategories,
  mockProducts,
} from '@/utils/mockData';
import { Footer } from '@/components/layouts/Footer';
import { Header } from '@/components/layouts/Header';
import { PageTransition } from '@/components/custom/PageTransition';
import { AnimatedCard } from '@/components/custom/AnimatedCard';

const Home = () => {
  const recentProducts = mockProducts.slice(0, 3);

  return (
    <PageTransition>
      <div className='min-h-screen flex flex-col'>
        <Header />

        <main className='flex-1 pt-24 pb-16'>
          <section className='container px-4 mx-auto'>
            <div className='mb-10'>
              <span className='text-sm font-medium text-primary'>
                Dashboard
              </span>
              <h1 className='text-3xl md:text-4xl font-bold mt-2'>
                Product Overview
              </h1>
              <p className='text-muted-foreground mt-2 max-w-2xl'>
                Manage your product inventory, track stock levels, and analyze
                your product performance.
              </p>
            </div>

            {/* Recent Products */}
            <div className='mb-8'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold'>Recent Products</h2>
                <Link to='/products'>
                  <Button variant='ghost' className='group'>
                    View all
                    <ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                  </Button>
                </Link>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {recentProducts.map((product, index) => {
                  const categoryInfo = mockCategories[product.category];

                  return (
                    <AnimatedCard
                      key={product.id}
                      animation='fade-in'
                      delay={
                        index === 0 ? 'none' : index === 1 ? 'short' : 'medium'
                      }
                      className='flex flex-col h-full'>
                      <div className='aspect-video w-full mb-4 overflow-hidden rounded-md'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-full h-full object-cover transition-all duration-500 hover:scale-105'
                        />
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${categoryInfo.color}`}>
                        {categoryInfo.label}
                      </span>
                      <h3 className='text-lg font-medium mt-2 line-clamp-1'>
                        {product.name}
                      </h3>
                      <p className='text-sm text-muted-foreground mt-1 mb-4 line-clamp-2'>
                        {product.description}
                      </p>
                      <div className='mt-auto flex justify-between items-center pt-4 border-t'>
                        <span className='font-semibold'>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(product.price)}
                        </span>
                        <Link to={`/products/${product.id}`}>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='p-0 h-8 px-2'>
                            Details <ChevronRight className='ml-1 h-4 w-4' />
                          </Button>
                        </Link>
                      </div>
                    </AnimatedCard>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <AnimatedCard
              animation='scale-in'
              className='bg-primary/5 border-primary/20 mt-12'>
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                <div>
                  <h3 className='text-xl font-semibold'>
                    Ready to manage your products?
                  </h3>
                  <p className='text-muted-foreground mt-2'>
                    Go to the products page to add, edit, or remove items from
                    your inventory.
                  </p>
                </div>
                <Link to='/products'>
                  <Button className='gap-2'>
                    <ShoppingBag className='h-4 w-4' />
                    Manage Products
                  </Button>
                </Link>
              </div>
            </AnimatedCard>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Home;
