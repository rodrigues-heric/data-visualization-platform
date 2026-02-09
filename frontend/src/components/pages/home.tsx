import { Header } from '@/components/pages/header';
import { Footer } from './footer';
import { Outlet } from 'react-router-dom';

export function Home() {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50/50'>
      <Header />

      <main className='mb-0 flex-1 pt-16 sm:mb-12 sm:px-12 sm:pt-24'>
        <div className='mx-auto max-w-7xl'>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
