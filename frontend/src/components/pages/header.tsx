import { LayoutDashboard, BarChart3, Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  const navItems = [
    { label: 'Energia Chicago', path: '/energy', icon: LayoutDashboard },
    { label: 'Análise Comparativa', path: '/foo', icon: BarChart3 },
  ];

  return (
    <header className='fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white'>
            <Building2 className='h-5 w-5' />
          </div>
          <span className='text-lg font-bold tracking-tight text-slate-900'>
            Foo<span className='font-medium text-slate-500'>Bar</span>
          </span>
        </div>

        <nav className='flex items-center gap-8'>
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-slate-900 ${
                  isActive ? 'text-slate-900' : 'text-slate-500'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? 'text-blue-600' : ''}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className='hidden items-center gap-4 border-l pl-8 md:flex'>
          <div className='text-right'>
            <p className='text-xs font-semibold text-slate-900'>
              Usuário Administrador
            </p>
            <p className='text-[10px] tracking-tighter text-slate-500 uppercase'>
              Analista Sênior
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
