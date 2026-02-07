import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PAGE_LIMIT } from '@/constants/pagination';

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
  return (
    <div className='flex items-center justify-between border-t bg-slate-50/30 px-6 py-4'>
      <div className='text-sm text-slate-500'>
        Mostrando registros{' '}
        <span className='font-medium text-slate-700'>
          {PAGE_LIMIT * page + 1}
          {' - '}
          {PAGE_LIMIT * (page + 1)}
        </span>{' '}
      </div>

      <div className='flex items-center space-x-2'>
        <span className='mr-2 text-xs text-slate-500'>Página {page + 1}</span>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setPage(p => Math.max(p - 1, 0))}
          disabled={page === 0}
          className='h-8 w-8 p-0 hover:cursor-pointer'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setPage(p => p + 1)}
          disabled={isPlaceholderData || (data && data.length < PAGE_LIMIT)}
          className='h-8 w-8 p-0 hover:cursor-pointer'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
