import {
  Moon,
  Sun,
  Languages,
  Building2,
  LayoutDashboard,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSettings } from '@/components/context/settingsContext';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { theme, setTheme, lang, setLang } = useSettings();
  const location = useLocation();

  const navItems = [
    { label: 'Energia Chicago', path: '/energy', icon: LayoutDashboard },
    { label: 'Análise Comparativa', path: '/foo', icon: BarChart3 },
  ];

  return (
    <header className='fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'>
            <Building2 className='h-5 w-5' />
          </div>
          <span className='text-lg font-bold text-slate-900 dark:text-slate-100'>
            Foo
            <span className='font-medium text-slate-500 dark:text-slate-400'>
              Bar
            </span>
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
                className={`relative flex items-center gap-2 text-sm font-medium transition-all hover:text-slate-900 dark:hover:text-slate-100 ${
                  isActive
                    ? 'text-slate-900 dark:text-slate-100'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
                {item.label}

                {isActive && (
                  <div className='absolute -bottom-5.5 h-0.5 w-full bg-blue-600 dark:bg-blue-400' />
                )}
              </Link>
            );
          })}
        </nav>

        <div className='flex items-center gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-9 w-9 hover:cursor-pointer'
              >
                <Languages className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => setLang('pt-BR')}
                className={
                  lang === 'pt-BR'
                    ? 'font-bold hover:cursor-pointer'
                    : 'hover:cursor-pointer'
                }
              >
                Português (BR)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLang('en')}
                className={lang === 'en' ? 'font-bold' : 'hover:cursor-pointer'}
              >
                English (US)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className='h-9 w-9 hover:cursor-pointer'
          >
            {theme === 'light' ? (
              <Moon className='h-4 w-4' />
            ) : (
              <Sun className='h-4 w-4' />
            )}
          </Button>

          <div className='mx-2 h-6 w-px bg-slate-200 dark:bg-slate-800' />

          <div className='hidden md:block'>
            <p className='text-xs font-semibold text-slate-900 dark:text-slate-100'>
              Usuário Administrador
            </p>
            <p className='text-[10px] text-slate-500 uppercase'>
              {lang === 'pt-BR' ? 'Analista Sênior' : 'Senior Analyst'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
