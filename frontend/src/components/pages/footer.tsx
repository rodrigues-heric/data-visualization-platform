export function Footer() {
  return (
    <footer className='shrink-0 border-t border-slate-200 bg-white py-6 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-[10px] font-medium tracking-widest text-slate-400 uppercase sm:flex-row sm:px-12 sm:text-[11px] dark:text-slate-500'>
        <p className='text-center sm:text-left'>
          © 2026 FooBar Analytics Group
        </p>

        <div className='flex items-center gap-3 sm:gap-4'>
          <p className='cursor-default transition-colors hover:text-slate-600 dark:hover:text-slate-300'>
            Chicago City Data API
          </p>

          <span
            className='text-slate-200 dark:text-slate-800'
            aria-hidden='true'
          >
            |
          </span>

          <p className='rounded bg-slate-50 px-1.5 py-0.5 font-mono text-[9px] text-slate-500 sm:text-[10px] dark:bg-slate-900 dark:text-slate-400'>
            vX.Y.Z
          </p>
        </div>
      </div>
    </footer>
  );
}
