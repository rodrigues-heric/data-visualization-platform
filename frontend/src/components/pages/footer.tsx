export function Footer() {
  return (
    <footer className='shrink-0 border-t bg-white py-6'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-12 text-[11px] font-medium tracking-widest text-slate-400 uppercase'>
        <p>© 2026 FooBar Analytics Group</p>
        <div className='flex gap-4'>
          <p>Chicago City Data API</p>
          <span className='text-slate-200'>|</span>
          <p>vX.Y.Z</p>
        </div>
      </div>
    </footer>
  );
}
