import { useState } from 'react';
import { Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useChicagoData } from '@/hooks/useChicagoData.hook';
import {
  AVAILABLE_COLUMNS,
  type ChicagoFacilityColumnKey,
} from '@/interfaces/chicagoFacilityColumnsMap.type';
import { DetailsEnergy } from './detailsEnergy.component';
import { Footer } from '../dashboard/footer.component';
import { ConfigureColumns } from '../dashboard/configureColumns.component';
import { FadeIn } from '../layout/fadeIn';
import { useSettings } from '../context/settingsContext';
import { translations } from '@/locales/i18n';

export function DashboardEnergy() {
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const { lang } = useSettings();
  const t = translations[lang];

  const [visibleColumns, setVisibleColumns] = useState<
    ChicagoFacilityColumnKey[]
  >(['community_area_name', 'building_type', 'total_population', 'total_kwh']);

  const { data, isLoading, isPlaceholderData } = useChicagoData(
    'facilities',
    page
  );

  const toggleColumn = (column: ChicagoFacilityColumnKey) => {
    setVisibleColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600' />
      </div>
    );
  }

  return (
    <>
      <FadeIn>
        <Card className='flex flex-col gap-0 overflow-hidden border-slate-200 bg-white p-0 shadow-sm lg:h-175 dark:border-slate-800 dark:bg-slate-950'>
          <CardHeader className='m-0 flex shrink-0 flex-col gap-4 border-b border-slate-200 bg-slate-50/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800 dark:bg-slate-900/50'>
            <div>
              <CardTitle className='text-base leading-none font-semibold text-slate-800 sm:text-lg dark:text-slate-100'>
                {t.energyTable.title}
              </CardTitle>
              <p className='mt-1.5 text-[10px] text-slate-500 sm:text-xs dark:text-slate-400'>
                {t.energyTable.subtitle}
              </p>
            </div>

            <div className='flex w-full gap-2 sm:w-auto'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => downloadCSV(data || [], visibleColumns, page)}
                className='flex-1 gap-2 hover:cursor-pointer sm:flex-none dark:border-slate-800 dark:hover:bg-slate-800'
              >
                <Download className='h-4 w-4' />
                <span className='hidden sm:inline'>{t.energyTable.export}</span>
                <span className='sm:hidden'>Exportar</span>
              </Button>

              <div className='flex-1 sm:flex-none'>
                <ConfigureColumns
                  visibleColumns={visibleColumns}
                  toggleColumn={toggleColumn}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className='m-0 flex flex-1 flex-col overflow-hidden p-0'>
            <div className='flex-1 overflow-x-auto overflow-y-auto bg-white dark:bg-slate-950'>
              <Table className='relative min-w-150 border-separate border-spacing-0 lg:min-w-full'>
                <TableHeader className='sticky top-0 z-20'>
                  <TableRow className='border-none hover:bg-transparent'>
                    {visibleColumns.map(col => (
                      <TableHead
                        key={col}
                        className='h-11 border-b border-slate-200 bg-slate-50 px-4 text-[11px] font-bold whitespace-nowrap text-slate-700 first:pl-4 last:pr-4 sm:px-6 sm:text-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                      >
                        {AVAILABLE_COLUMNS[col]}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((item, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className='hover:cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/50'
                      onClick={() => setSelectedRow(item)}
                    >
                      {visibleColumns.map(col => (
                        <TableCell
                          key={col}
                          className='border-b border-slate-100 px-4 py-3 text-xs text-slate-600 first:pl-4 last:pr-4 sm:px-6 sm:text-sm dark:border-slate-800 dark:text-slate-400'
                        >
                          {typeof item[col] === 'string' &&
                          !isNaN(Number(item[col]))
                            ? Number(item[col]).toLocaleString(
                                lang === 'pt-BR' ? 'pt-BR' : 'en-US'
                              )
                            : item[col]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Footer
              data={data}
              page={page}
              setPage={setPage}
              isPlaceholderData={isPlaceholderData}
            />
          </CardContent>
        </Card>
      </FadeIn>

      <DetailsEnergy
        data={selectedRow}
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
      />
    </>
  );
}

function downloadCSV(
  data: any[],
  visibleColumns: ChicagoFacilityColumnKey[],
  page: number
) {
  if (!data) return;

  const header = visibleColumns.map(col => AVAILABLE_COLUMNS[col]).join(',');

  const rows = data.map(item =>
    visibleColumns.map(col => `"${item[col] || ''}"`).join(',')
  );

  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `chicago-energy-page-${page + 1}.csv`);
  link.click();
}
