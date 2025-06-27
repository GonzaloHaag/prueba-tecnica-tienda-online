import { useContext } from "react";
import { AuthContext } from '@/lib/auth-context';

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
      throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return context;
  };
  export const useIsAdmin = () => {
    const { user } = useAuth();
    return user?.role === 'admin';
  };
  
  export const useIsAuthenticated = () => {
    const { isAuthenticated, isLoading } = useAuth();
    return { isAuthenticated, isLoading };
  };
  