export type ProductCategory =
  | 'electronics'
  | 'clothing'
  | 'home'
  | 'books'
  | 'beauty';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const mockCategories: Record<
  ProductCategory,
  { label: string; color: string }
> = {
  electronics: {
    label: 'Electronics',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  },
  clothing: {
    label: 'Clothing',
    color:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  },
  home: {
    label: 'Home & Living',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  },
  books: {
    label: 'Books',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  },
  beauty: {
    label: 'Beauty',
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  },
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Noise-Cancelling Headphones',
    description:
      'High-quality wireless headphones with active noise cancellation for an immersive audio experience.',
    price: 299.99,
    category: 'electronics',
    stock: 25,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 0, 15).toISOString(),
    updatedAt: new Date(2023, 2, 10).toISOString(),
  },
  {
    id: '2',
    name: 'Slim Fit Cotton T-Shirt',
    description:
      'Comfortable and stylish everyday t-shirt made from 100% organic cotton.',
    price: 29.99,
    category: 'clothing',
    stock: 100,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 1, 20).toISOString(),
    updatedAt: new Date(2023, 1, 20).toISOString(),
  },
  {
    id: '3',
    name: 'Minimalist Desk Lamp',
    description:
      'Elegant desk lamp with adjustable brightness and color temperature.',
    price: 49.99,
    category: 'home',
    stock: 30,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 2, 5).toISOString(),
    updatedAt: new Date(2023, 3, 2).toISOString(),
  },
  {
    id: '4',
    name: 'Modern Philosophy Collection',
    description:
      'A curated collection of essential modern philosophy texts from the 20th century.',
    price: 89.99,
    category: 'books',
    stock: 15,
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 3, 10).toISOString(),
    updatedAt: new Date(2023, 3, 10).toISOString(),
  },
  {
    id: '5',
    name: 'Organic Face Serum',
    description:
      'Revitalizing face serum made with natural ingredients for a healthy, glowing complexion.',
    price: 59.99,
    category: 'beauty',
    stock: 40,
    image:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 4, 15).toISOString(),
    updatedAt: new Date(2023, 5, 1).toISOString(),
  },
  {
    id: '6',
    name: 'Ultra-Thin Tablet',
    description:
      'Powerful tablet with a stunning display and all-day battery life.',
    price: 449.99,
    category: 'electronics',
    stock: 20,
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 5, 20).toISOString(),
    updatedAt: new Date(2023, 5, 20).toISOString(),
  },
  {
    id: '7',
    name: 'Wool Blend Cardigan',
    description:
      'Cozy and versatile cardigan perfect for layering in any season.',
    price: 79.99,
    category: 'clothing',
    stock: 35,
    image:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 6, 5).toISOString(),
    updatedAt: new Date(2023, 6, 5).toISOString(),
  },
  {
    id: '8',
    name: 'Handcrafted Ceramic Vase',
    description:
      'Unique, artisanal vase perfect for displaying fresh or dried flowers.',
    price: 39.99,
    category: 'home',
    stock: 25,
    image:
      'https://images.unsplash.com/photo-1612196808214-b40b3db821ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: new Date(2023, 7, 10).toISOString(),
    updatedAt: new Date(2023, 7, 15).toISOString(),
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return mockProducts.filter((product) => product.category === category);
};

export const getDashboardStats = () => ({
  totalProducts: mockProducts.length,
  totalCategories: Object.keys(mockCategories).length,
  lowStock: mockProducts.filter((p) => p.stock < 20).length,
  totalValue: mockProducts.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  ),
});
