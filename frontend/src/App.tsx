import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/components/pages/home';
import { DashboardEnergy } from './components/pages/dashboardEnergy.component';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Navigate to='/energy' replace />} />
            <Route path='energy' element={<DashboardEnergy />} />
          </Route>
          <Route
            path='*'
            element={
              <div className='p-20 text-center'>Página não encontrada.</div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
