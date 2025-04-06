import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Edit, Trash2, Clock, Package, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { productsAPI } from '@/lib/productApi';
import { mockCategories, Product } from '@/utils/mockData';
import { PageTransition } from '@/components/custom/PageTransition';
import { Header } from '@/components/layouts/Header';
import { AnimatedCard } from '@/components/custom/AnimatedCard';
import { Footer } from '@/components/layouts/Footer';
import { ProductForm } from '@/components/form/ProductForm';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setIsLoading(true);
          console.log(id);
          const data = await productsAPI.getById(id);
          console.log(data);
          setProduct(data.data);
        } catch (error) {
          console.error('Error fetching product:', error);
          toast.error('Failed to load product details');
          setProduct(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleEdit = () => {
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!product) return;

    try {
      await productsAPI.delete(product._id);
      toast.success(`${product.name} has been deleted`);
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    toast.error('Failed to delete product');
    }
  };

  const handleFormSubmit = async (
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!product || !id) return;

    try {
      const updatedProduct = await productsAPI.update(id, data);
      setProduct(updatedProduct.data);
      setIsFormOpen(false);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-pulse-soft'>Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold mb-4'>Product Not Found</h2>
        <p className='text-muted-foreground mb-6'>
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to='/products'>
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const categoryInfo = mockCategories[product.category];

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const formattedDate = new Date(product.updatedAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <PageTransition>
      <div className='min-h-screen flex flex-col'>
        <Header />

        <main className='flex-1 pt-24 pb-16'>
          <div className='container px-4 mx-auto'>
            {/* Back Button & Actions */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
              <Button
                variant='ghost'
                className='gap-2'
                onClick={() => navigate('/products')}>
                <ArrowLeft className='h-4 w-4' />
                Back to Products
              </Button>

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  className='gap-1'
                  onClick={handleEdit}>
                  <Edit className='h-4 w-4' />
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='destructive' className='gap-1'>
                      <Trash2 className='h-4 w-4' />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete{' '}
                        <span className='font-medium'>{product.name}</span>.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Product Details */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10'>
              {/* Product Image */}
              <div className='lg:col-span-2'>
                <AnimatedCard
                  animation='slide-up'
                  className='p-0 overflow-hidden'>
                  <div className='relative aspect-square w-full'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='object-cover w-full h-full'
                    />
                    <Badge
                      className={`absolute top-4 right-4 ${categoryInfo.color}`}>
                      {categoryInfo.label}
                    </Badge>
                  </div>
                </AnimatedCard>
              </div>

              {/* Product Info */}
              <div className='lg:col-span-3'>
                <AnimatedCard animation='slide-up' delay='short'>
                  <div className='flex justify-between items-start mb-4'>
                    <h1 className='text-2xl md:text-3xl font-bold'>
                      {product.name}
                    </h1>
                    <span className='text-xl md:text-2xl font-semibold text-primary'>
                      {formattedPrice}
                    </span>
                  </div>

                  <div className='flex items-center gap-2 mb-4 text-sm text-muted-foreground'>
                    <Clock className='h-4 w-4' />
                    <span>Last updated on {formattedDate}</span>
                  </div>

                  <Separator className='my-4' />

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <div className='flex flex-col'>
                      <span className='text-sm text-muted-foreground'>
                        Category
                      </span>
                      <Badge className={`mt-1 w-fit ${categoryInfo.color}`}>
                        {categoryInfo.label}
                      </Badge>
                    </div>

                    <div className='flex flex-col'>
                      <span className='text-sm text-muted-foreground'>
                        Inventory Status
                      </span>
                      <Badge
                        variant={product.stock < 20 ? 'destructive' : 'outline'}
                        className='mt-1 w-fit'>
                        {product.stock < 20 ? 'Low Stock' : 'In Stock'}:{' '}
                        {product.stock}
                      </Badge>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-lg font-medium mb-2'>Description</h3>
                    <p className='text-muted-foreground'>
                      {product.description}
                    </p>
                  </div>

                  <Tabs defaultValue='details'>
                    <TabsList className='w-full'>
                      <TabsTrigger value='details' className='flex-1'>
                        Details
                      </TabsTrigger>
                      <TabsTrigger value='shipping' className='flex-1'>
                        Shipping
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value='details' className='pt-4'>
                      <div className='flex items-center gap-4 p-4 bg-muted/50 rounded-md'>
                        <Package className='h-8 w-8 text-muted-foreground' />
                        <div>
                          <h4 className='font-medium'>Product Details</h4>
                          <p className='text-sm text-muted-foreground'>
                            This product is currently in stock and ready to
                            ship.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value='shipping' className='pt-4'>
                      <div className='flex items-center gap-4 p-4 bg-muted/50 rounded-md'>
                        <Truck className='h-8 w-8 text-muted-foreground' />
                        <div>
                          <h4 className='font-medium'>Shipping Information</h4>
                          <p className='text-sm text-muted-foreground'>
                            Standard shipping takes 3-5 business days.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {/* Edit Product Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className='sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update the details of {product.name}.
              </DialogDescription>
            </DialogHeader>

            <ProductForm
              product={product}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
