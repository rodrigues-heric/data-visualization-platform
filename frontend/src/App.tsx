import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './components/pages/dashboard.component';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-svh w-full flex-col items-center justify-center'>
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
