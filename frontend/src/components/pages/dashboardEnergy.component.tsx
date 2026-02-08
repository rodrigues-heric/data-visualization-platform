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

  const { data, isLoading, isPlaceholderData } = useChicagoData(page);

  const toggleColumn = (column: ChicagoFacilityColumnKey) => {
    setVisibleColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center text-slate-400 dark:text-slate-500'>
        <div className='h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600 dark:border-slate-700 dark:border-t-slate-400' />
      </div>
    );
  }

  return (
    <>
      <FadeIn>
        <Card className='flex h-175 flex-col gap-0 overflow-hidden border-slate-200 bg-white p-0 shadow-sm dark:border-slate-800 dark:bg-slate-950'>
          <CardHeader className='m-0 flex shrink-0 flex-row items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/50'>
            <div>
              <CardTitle className='text-lg leading-none font-semibold text-slate-800 dark:text-slate-100'>
                {t.energyTable.title}
              </CardTitle>
              <p className='mt-1.5 text-xs text-slate-500 dark:text-slate-400'>
                {t.energyTable.subtitle}
              </p>
            </div>

            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => downloadCSV(data || [], visibleColumns, page)}
                className='gap-2 hover:cursor-pointer dark:border-slate-800 dark:hover:bg-slate-800'
              >
                <Download className='h-4 w-4' />
                {t.energyTable.export}
              </Button>

              <ConfigureColumns
                visibleColumns={visibleColumns}
                toggleColumn={toggleColumn}
              />
            </div>
          </CardHeader>

          <CardContent className='m-0 flex flex-1 flex-col overflow-hidden p-0 pt-0!'>
            <div className='flex-1 overflow-auto bg-white outline-none **:data-[slot=table-container]:overflow-visible dark:bg-slate-950'>
              <Table
                className='relative border-separate border-spacing-0'
                style={{ overflow: 'visible' }}
              >
                <TableHeader className='sticky top-0 z-20'>
                  <TableRow className='border-none hover:bg-transparent'>
                    {visibleColumns.map(col => (
                      <TableHead
                        key={col}
                        className='h-11 border-b border-slate-200 bg-slate-50 px-4 font-bold whitespace-nowrap text-slate-700 first:pl-6 last:pr-6 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
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
                          className='border-b border-slate-100 px-4 py-3 text-sm text-slate-600 first:pl-6 last:pr-6 dark:border-slate-800 dark:text-slate-400'
                        >
                          {typeof item[col] === 'string' &&
                          !isNaN(Number(item[col]))
                            ? Number(item[col]).toLocaleString('pt-BR')
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
