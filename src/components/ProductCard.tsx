import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product, mockCategories } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';
import { AnimatedCard } from './custom/AnimatedCard';

interface ProductCardProps {
  product: Product;
  index: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({
  product,
  index,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const { id, name, description, price, category, stock, image } = product;
  const categoryInfo = mockCategories[category];

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  const handleDelete = () => {
    onDelete(id);
    toast.success(`${name} has been deleted`);
  };

  return (
    <AnimatedCard
      animation='slide-up'
      delay={
        index < 5
          ? index === 0
            ? 'none'
            : index === 1
            ? 'short'
            : 'medium'
          : 'none'
      }
      className='flex flex-col h-full'>
      <div className='relative aspect-video w-full overflow-hidden rounded-md mb-4'>
        <img
          src={image}
          alt={name}
          className='object-cover w-full h-full transition-all duration-500 hover:scale-105'
          loading='lazy'
        />
        <Badge className={cn('absolute top-2 right-2', categoryInfo.color)}>
          {categoryInfo.label}
        </Badge>
      </div>

      <div className='flex-1 flex flex-col'>
        <div className='mb-2 flex justify-between items-start'>
          <h3 className='font-medium text-lg line-clamp-1'>{name}</h3>
          <span className='font-semibold text-primary'>{formattedPrice}</span>
        </div>

        <p className='text-sm text-muted-foreground line-clamp-2 mb-4'>
          {description}
        </p>

        <div className='mt-auto flex items-center justify-between'>
          <Badge variant={stock < 20 ? 'destructive' : 'outline'}>
            {stock < 20 ? 'Low Stock' : 'In Stock'}: {stock}
          </Badge>

          <div className='flex gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={() => onEdit(product)}>
              <Edit className='h-4 w-4' />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 text-destructive'>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete{' '}
                    <span className='font-medium'>{name}</span>. This action
                    cannot be undone.
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

            <Link to={`/products/${id}`}>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <ExternalLink className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}
