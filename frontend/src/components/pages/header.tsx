import { useState } from 'react';
import {
  Moon,
  Sun,
  Languages,
  Building2,
  Factory,
  School,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSettings } from '@/components/context/settingsContext';
import { Link, useLocation } from 'react-router-dom';
import { translations } from '@/locales/i18n';

export function Header() {
  const { theme, setTheme, lang, setLang } = useSettings();
  const location = useLocation();
  const t = translations[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: t.header.nav.energy, path: '/energy', icon: Factory },
    { label: t.header.nav.comparative, path: '/school', icon: School },
  ];

  return (
    <header className='fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
        {/* LADO ESQUERDO: Logo e Menu Mobile */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'>
              <Building2 className='h-5 w-5' />
            </div>
            <span className='text-lg font-bold text-slate-900 dark:text-slate-100'>
              Foo
              <span className='font-medium text-slate-500 dark:text-slate-400'>
                Bar
              </span>
            </span>
          </div>
        </div>

        {/* CENTRO: Navegação Desktop */}
        <nav className='hidden items-center gap-8 md:flex'>
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
                  className={`h-4 w-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}
                />
                {item.label}
                {isActive && (
                  <div className='absolute -bottom-5.5 h-0.5 w-full bg-blue-600 dark:bg-blue-400' />
                )}
              </Link>
            );
          })}
        </nav>

        {/* LADO DIREITO: Ações */}
        <div className='flex items-center gap-1 sm:gap-4'>
          {/* Idioma e Tema (Sempre Visíveis) */}
          <div className='flex items-center'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='h-9 w-9'>
                  <Languages className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={() => setLang('pt-BR')}
                  className={lang === 'pt-BR' ? 'font-bold' : ''}
                >
                  {t.header.languages.pt}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLang('en')}
                  className={lang === 'en' ? 'font-bold' : ''}
                >
                  {t.header.languages.en}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className='h-9 w-9'
            >
              {theme === 'light' ? (
                <Moon className='h-4 w-4' />
              ) : (
                <Sun className='h-4 w-4' />
              )}
            </Button>
          </div>

          <div className='mx-1 hidden h-6 w-px bg-slate-200 sm:block dark:bg-slate-800' />

          {/* Usuário Desktop */}
          <div className='hidden lg:block'>
            <p className='text-xs font-semibold text-slate-900 dark:text-slate-100'>
              {t.header.user.name}
            </p>
            <p className='text-[10px] text-slate-500 uppercase'>
              {t.header.user.role}
            </p>
          </div>

          {/* MENU MOBILE (Hambúrguer) */}
          <div className='md:hidden'>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='h-9 w-9'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-72 dark:border-slate-800 dark:bg-slate-950'
              >
                <SheetHeader className='text-left'>
                  <SheetTitle className='text-sm font-bold tracking-widest text-slate-500 uppercase'>
                    Navegação
                  </SheetTitle>
                </SheetHeader>
                <div className='mt-8 flex flex-col gap-4'>
                  {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
                        }`}
                      >
                        <Icon className='h-5 w-5' />
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className='mt-4 border-t border-slate-100 pt-4 dark:border-slate-800'>
                    <p className='px-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase'>
                      Sessão
                    </p>
                    <div className='mt-2 px-4'>
                      <p className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                        {t.header.user.name}
                      </p>
                      <p className='text-xs text-slate-500'>
                        {t.header.user.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
