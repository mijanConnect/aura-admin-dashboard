'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { restoreAuth } from '@/store/slices/authSlice';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Try to restore auth from localStorage on mount
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      // In a real app, you would validate the token with the server
      // For demo, we'll restore a mock user
      const mockUser = {
        id: 1,
        email: 'admin@example.com',
        name: 'John Admin',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=50',
      };
      dispatch(restoreAuth({ user: mockUser, token }));
    }
  }, [dispatch, isAuthenticated, isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    if (!isAuthenticated && !localStorage.getItem('token')) {
      router.push('/login');
    }
  }, [isAuthenticated, router, isClient]);

  if (!isClient) return null;
  
  if (!isAuthenticated && !localStorage.getItem('token')) {
    return null;
  }

  return <>{children}</>;
}