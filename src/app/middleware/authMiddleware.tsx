import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = (): boolean => {
  const router = useRouter();
  const isAuthenticated = typeof window !== 'undefined' && Boolean(localStorage.getItem('authToken'));

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useAuth;