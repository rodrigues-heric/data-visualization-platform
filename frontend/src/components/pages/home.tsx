import { Header } from '@/components/pages/header';
import { Footer } from './footer';
import { Outlet } from 'react-router-dom';

export function Home() {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50/50'>
      <Header />

      <main className='flex-1 px-12 pt-24 pb-12'>
        <div className='mx-auto max-w-7xl'>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
