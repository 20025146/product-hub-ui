const API_URL = 'http://localhost:4000/api';

export const productsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },

  create: async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  },

  update: async (id: string, productData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return response.json();
  },
};
