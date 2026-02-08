import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PAGE_LIMIT } from '@/constants/pagination';
import { useSettings } from '../context/settingsContext';
import { translations } from '@/locales/i18n';

export function Footer({
  data,
  page,
  setPage,
  isPlaceholderData,
}: {
  data: any[] | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isPlaceholderData: boolean;
}) {
  const { lang } = useSettings();
  const t = translations[lang];

  return (
    <div className='flex items-center justify-between border-t bg-slate-50/30 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/50'>
      <div className='text-sm text-slate-500 dark:text-slate-400'>
        {t.energyTable.footer.showing + ' '}
        <span className='font-medium text-slate-700 dark:text-slate-200'>
          {PAGE_LIMIT * page + 1}
          {' - '}
          {PAGE_LIMIT * (page + 1)}
        </span>{' '}
      </div>

      <div className='flex items-center space-x-2'>
        <span className='mr-2 text-xs text-slate-500 dark:text-slate-500'>
          {t.energyTable.footer.page} {page + 1}
        </span>

        <Button
          variant='outline'
          size='sm'
          onClick={() => setPage(p => Math.max(p - 1, 0))}
          disabled={page === 0}
          className='h-8 w-8 p-0 hover:cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-800'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={() => setPage(p => p + 1)}
          disabled={isPlaceholderData || (data && data.length < PAGE_LIMIT)}
          className='h-8 w-8 p-0 hover:cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-800'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
