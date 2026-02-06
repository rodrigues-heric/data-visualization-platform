import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './components/pages/dashboard.component';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-svh items-center justify-center px-12 py-12'>
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
