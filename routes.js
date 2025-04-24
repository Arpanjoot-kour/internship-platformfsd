import { Navigate } from 'react-router-dom';

// Public routes that don't require authentication
export const publicRoutes = [
  {
    path: '/login',
    element: 'Login',
  },
  {
    path: '/register',
    element: 'Register',
  },
];

// Protected routes that require authentication
export const protectedRoutes = [
  {
    path: '/dashboard',
    element: 'Dashboard',
    roles: ['user', 'admin'],
  },
  {
    path: '/admin',
    element: 'AdminPanel',
    roles: ['admin'],
  },
  {
    path: '/profile',
    element: 'Profile',
    roles: ['user', 'admin'],
  },
];

// Default redirect for authenticated users
export const defaultAuthenticatedRoute = '/dashboard';

// Default redirect for unauthenticated users
export const defaultUnauthenticatedRoute = '/login'; 