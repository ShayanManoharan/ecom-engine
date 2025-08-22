const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: { email: string; password: string }) {
    return this.request<{ id: string; email: string; role: string; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ id: string; email: string; role: string; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser() {
    return this.request<{ id: string; email: string; role: string; createdAt: string }>('/auth/me');
  }

  // Product endpoints
  async getProducts(params?: { search?: string; category?: string; page?: number; size?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.size) searchParams.append('size', params.size.toString());

    const query = searchParams.toString();
    return this.request<{
      content: any[];
      totalElements: number;
      totalPages: number;
      size: number;
      number: number;
    }>(`/products${query ? `?${query}` : ''}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async getProductVariants(productId: string) {
    return this.request<any[]>(`/products/${productId}/variants`);
  }

  // Cart endpoints
  async createCart() {
    return this.request<any>('/carts', {
      method: 'POST',
    });
  }

  async getCart(cartId: string) {
    return this.request<any>(`/carts/${cartId}`);
  }

  async addCartItem(cartId: string, data: { variantId: string; qty: number }) {
    return this.request<void>(`/carts/${cartId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCartItem(cartId: string, variantId: string, qty: number) {
    return this.request<void>(`/carts/${cartId}/items/${variantId}?qty=${qty}`, {
      method: 'PATCH',
    });
  }

  async removeCartItem(cartId: string, variantId: string) {
    return this.request<void>(`/carts/${cartId}/items/${variantId}`, {
      method: 'DELETE',
    });
  }

  // Checkout endpoints
  async createCheckoutSession(data: {
    cartId: string;
    currency: string;
    shippingAddress: Record<string, string>;
  }) {
    return this.request<{
      cartId: string;
      paymentIntentId: string;
      clientSecret: string;
      amount: number;
      currency: string;
    }>('/checkout/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Order endpoints
  async getOrders() {
    return this.request<any[]>('/me/orders');
  }

  async getOrder(orderId: string) {
    return this.request<any>(`/orders/${orderId}`);
  }
}

export const apiService = new ApiService();
