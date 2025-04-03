import envConfig from '@/config/envConfig';
import { TIME_IN_MILLISECONDS } from '@/constants/options';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: envConfig.API_URL,
  timeout: TIME_IN_MILLISECONDS['10_SECOND'], // Timeout for requests (5 seconds)
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Token Retrieval Helper
const getToken = async (): Promise<string | null> => {
  try {
    return await '';
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
};

// Generic Axios Call
export const apiRequest = async <T>(
  endpoint: string,
  method: AxiosRequestConfig['method'],
  data?: T,
  requiresAuth: boolean = true
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      data: data,
    };

    // Include Authorization header if required
    if (requiresAuth) {
      const token = await getToken();
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        throw new Error('Authentication token missing');
      }
    }

    // Make the request
    const response = await apiClient(config);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Unknown error occurred';
    throw new Error(errorMessage);
  }
};
