import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/components/pages/home';
import { DashboardEnergy } from './components/pages/dashboardEnergy.component';
import { SettingsProvider } from './components/context/settingsContext';
import { DashboardSchool } from './components/pages/dashboardSchool.component';

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
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route index element={<Navigate to='/energy' replace />} />
              <Route path='energy' element={<DashboardEnergy />} />
              <Route path='school' element={<DashboardSchool />} />
            </Route>
            <Route
              path='*'
              element={
                <div className='p-20 text-center'>Página não encontrada.</div>
              }
            />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
