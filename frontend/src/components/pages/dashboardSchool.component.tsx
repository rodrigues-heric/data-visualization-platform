import { useState } from 'react';
import { ChevronLeft, ChevronRight, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useChicagoData } from '@/hooks/useChicagoData.hook';
import { FadeIn } from '../layout/fadeIn';
import { PAGE_LIMIT } from '@/constants/pagination';
import { useSettings } from '@/components/context/settingsContext';
import { translations } from '@/locales/i18n';

export function DashboardSchool() {
  const [page, setPage] = useState(0);
  const { lang } = useSettings();
  const t = translations[lang];

  const { data, isLoading, isPlaceholderData } = useChicagoData(
    'schools',
    page
  );

  const startRange = page * PAGE_LIMIT + 1;
  const endRange = startRange + (data?.length || 0) - 1;

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-400' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between border-b border-slate-200 pb-6 dark:border-slate-800'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
            {t.schoolView.title}
          </h2>
          <p className='text-sm text-slate-500 dark:text-slate-200'>
            {t.schoolView.showing}{' '}
            <span className='font-bold text-slate-700 dark:text-slate-200'>
              {startRange}-{endRange}
            </span>
          </p>
        </div>

        <div className='flex items-center gap-3'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className='hover:cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900'
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            {t.schoolView.previous}
          </Button>
          <div className='flex h-9 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-medium hover:cursor-default dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100'>
            {page + 1}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage(p => p + 1)}
            disabled={isPlaceholderData || (data && data.length < PAGE_LIMIT)}
            className='hover:cursor-pointer dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900'
          >
            {t.schoolView.next}
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>

      <FadeIn className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data?.map(school => (
          <Card
            key={school.school_id}
            className='group transition-all hover:cursor-pointer hover:border-blue-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-400/30'
          >
            <CardHeader className='p-5 pb-3'>
              <div className='flex items-start justify-between gap-4'>
                <CardTitle className='line-clamp-2 text-sm leading-tight font-bold text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400'>
                  {school.short_name}
                </CardTitle>
                <School className='h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-400' />
              </div>
              <p className='line-clamp-1 text-[11px] tracking-tighter text-slate-500 uppercase dark:text-slate-500'>
                {school.address}
              </p>
            </CardHeader>

            <CardContent className='grid grid-cols-3 gap-2 p-5 pt-0'>
              <div className='flex flex-col gap-1 border-r border-slate-100 pr-2 dark:border-slate-800'>
                <span className='text-[10px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500'>
                  {t.schoolView.level}
                </span>
                <span className='text-xs font-medium text-slate-700 dark:text-slate-300'>
                  {school.primary_category}
                </span>
              </div>

              <div className='flex flex-col gap-1 border-r border-slate-100 px-2 dark:border-slate-800'>
                <span className='text-[10px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500'>
                  {t.schoolView.rating}
                </span>
                <span className={'text-xs font-bold'}>
                  {school.culture_climate_rating || 'N/A'}
                </span>
              </div>

              <div className='flex flex-col gap-1 pl-2'>
                <span className='text-[10px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500'>
                  {t.schoolView.attendance}
                </span>
                <span className='text-xs font-bold text-blue-600 dark:text-blue-400'>
                  {school.student_attendance_avg_pct}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </FadeIn>
    </div>
  );
}
