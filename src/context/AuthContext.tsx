import { authAPI } from '@/lib/authApi';
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Call the API to authenticate
      const response = await authAPI.login(email, password);

      // Store the auth token in localStorage
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove the auth token
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
