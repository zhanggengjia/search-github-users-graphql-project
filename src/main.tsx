import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from '@/components/ui/sonner';
import { ApolloProvider } from '@apollo/client/react';
import client from './apolloClient.ts';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <Toaster />
    <App />
  </ApolloProvider>
);
