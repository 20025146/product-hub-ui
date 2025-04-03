import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  mockProducts,
  Product,
  ProductCategory,
  mockCategories,
} from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Search, Filter, X } from 'lucide-react';
import { PageTransition } from '@/components/custom/PageTransition';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/layouts/Footer';
import { ProductForm } from '@/components/form/ProductForm';
import { Header } from '@/components/layouts/Header';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>(
    'all'
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined
  );

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Form handlers
  const handleOpenCreate = () => {
    setCurrentProduct(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (currentProduct) {
      // Edit existing product
      const updatedProducts = products.map((p) =>
        p.id === currentProduct.id
          ? {
              ...p,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : p
      );
      setProducts(updatedProducts);
    } else {
      // Create new product
      const newProduct = {
        id: (products.length + 1).toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts([newProduct, ...products]);
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
  };

  return (
    <PageTransition>
      <div className='min-h-screen flex flex-col'>
        <Header />

        <main className='flex-1 pt-24 pb-16'>
          <section className='container px-4 mx-auto'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
              <div>
                <h1 className='text-3xl font-bold'>Products</h1>
                <p className='text-muted-foreground mt-1'>
                  Manage your product catalog.
                </p>
              </div>

              <Button onClick={handleOpenCreate} className='gap-2'>
                <PlusCircle className='h-4 w-4' />
                Add Product
              </Button>
            </div>

            {/* Filters */}
            <div className='flex flex-col md:flex-row gap-4 mb-8'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-9'
                />
              </div>

              <div className='flex gap-4'>
                <div className='w-[180px]'>
                  <Select
                    value={categoryFilter}
                    onValueChange={(value) =>
                      setCategoryFilter(value as ProductCategory | 'all')
                    }>
                    <SelectTrigger>
                      <div className='flex items-center gap-2'>
                        <Filter className='h-4 w-4 text-muted-foreground' />
                        <SelectValue placeholder='Category' />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Categories</SelectItem>
                      {Object.entries(mockCategories).map(
                        ([value, { label }]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {(searchQuery || categoryFilter !== 'all') && (
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={clearFilters}
                    className='h-10 w-10'>
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
            </div>

            {/* Active filters */}
            {(searchQuery || categoryFilter !== 'all') && (
              <div className='flex flex-wrap gap-2 mb-6'>
                {searchQuery && (
                  <Badge
                    variant='secondary'
                    className='gap-1 text-xs px-2 py-1'>
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className='ml-1 hover:text-foreground'>
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                )}

                {categoryFilter !== 'all' && (
                  <Badge
                    variant='secondary'
                    className='gap-1 text-xs px-2 py-1'>
                    Category:{' '}
                    {mockCategories[categoryFilter as ProductCategory].label}
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className='ml-1 hover:text-foreground'>
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='rounded-full bg-muted p-4 mb-4'>
                  <Search className='h-8 w-8 text-muted-foreground' />
                </div>
                <h3 className='text-lg font-medium'>No products found</h3>
                <p className='text-muted-foreground text-center max-w-md mt-2'>
                  {searchQuery || categoryFilter !== 'all'
                    ? "Try adjusting your search or filter criteria to find what you're looking for."
                    : 'Start by adding your first product to the catalog.'}
                </p>
                {searchQuery || categoryFilter !== 'all' ? (
                  <Button
                    variant='outline'
                    onClick={clearFilters}
                    className='mt-4'>
                    Clear Filters
                  </Button>
                ) : (
                  <Button onClick={handleOpenCreate} className='mt-4 gap-2'>
                    <PlusCircle className='h-4 w-4' />
                    Add Product
                  </Button>
                )}
              </div>
            )}
          </section>
        </main>

        <Footer />

        {/* Product Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className='sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>
                {currentProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
              <DialogDescription>
                {currentProduct
                  ? 'Update the details of your product below.'
                  : 'Fill in the details to add a new product to your catalog.'}
              </DialogDescription>
            </DialogHeader>

            <ProductForm
              product={currentProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Products;
