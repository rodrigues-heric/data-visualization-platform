export function Footer() {
  return (
    <footer className='shrink-0 border-t border-slate-200 bg-white py-6 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-12 text-[11px] font-medium tracking-widest text-slate-400 uppercase dark:text-slate-500'>
        <p>© 2026 FooBar Analytics Group</p>

        <div className='flex items-center gap-4'>
          <p className='cursor-default transition-colors hover:text-slate-600 dark:hover:text-slate-300'>
            Chicago City Data API
          </p>
          <span
            className='text-slate-200 dark:text-slate-800'
            aria-hidden='true'
          >
            |
          </span>
          <p className='rounded bg-slate-50 px-1.5 py-0.5 font-mono text-slate-500 dark:bg-slate-900 dark:text-slate-400'>
            vX.Y.Z
          </p>
        </div>
      </div>
    </footer>
  );
}
