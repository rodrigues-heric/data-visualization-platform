import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings2, Download } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useChicagoData } from '@/hooks/useChicagoData.hook';
import {
  AVAILABLE_COLUMNS,
  type ChicagoFacilityColumnKey,
} from '@/interfaces/chicagoFacilityColumnsMap.type';
import { PAGE_LIMIT } from '@/constants/pagination';
import { Details } from './details.component';

export function Dashboard() {
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const [visibleColumns, setVisibleColumns] = useState<
    ChicagoFacilityColumnKey[]
  >(['community_area_name', 'building_type', 'total_population', 'total_kwh']);

  const { data, isLoading, isPlaceholderData } = useChicagoData(page);

  const toggleColumn = (column: ChicagoFacilityColumnKey) => {
    setVisibleColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  if (isLoading)
    return <div className='p-10 text-center'>Carregando dados...</div>;

  const downloadCSV = () => {
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
  };

  return (
    <>
      <Card className='flex h-175 flex-col gap-0 overflow-hidden border-slate-200 bg-white p-0 shadow-sm'>
        <CardHeader className='m-0 flex shrink-0 flex-row items-center justify-between border-b bg-slate-50/50 px-6 py-4'>
          <div>
            <CardTitle className='text-lg leading-none font-semibold text-slate-800'>
              Análise Dinâmica
            </CardTitle>
            <p className='mt-1.5 text-xs text-slate-500'>
              Dados de consumo de Chicago
            </p>
          </div>

          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={downloadCSV}
              className='gap-2 hover:cursor-pointer'
            >
              <Download className='h-4 w-4 hover:cursor-pointer' />
              Exportar
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='ml-auto gap-2 hover:cursor-pointer'
                >
                  <Settings2 className='h-4 w-4' />
                  Colunas
                </Button>
              </PopoverTrigger>
              <PopoverContent align='end' className='w-64 p-0'>
                <div className='border-b bg-slate-50/50 p-3'>
                  <h4 className='text-sm font-medium'>Configurar Colunas</h4>
                </div>
                <div className='max-h-80 overflow-y-auto p-3'>
                  <div className='grid gap-2'>
                    {(
                      Object.keys(
                        AVAILABLE_COLUMNS
                      ) as ChicagoFacilityColumnKey[]
                    ).map(key => (
                      <div key={key} className='flex items-center space-x-2'>
                        <Checkbox
                          id={key}
                          checked={visibleColumns.includes(key)}
                          onCheckedChange={() => toggleColumn(key)}
                        />
                        <label
                          htmlFor={key}
                          className='cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {AVAILABLE_COLUMNS[key]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent className='m-0 flex flex-1 flex-col overflow-hidden p-0 pt-0!'>
          <div className='flex-1 overflow-auto bg-white outline-none **:data-[slot=table-container]:overflow-visible'>
            <Table
              className='relative border-separate border-spacing-0'
              style={{ overflow: 'visible' }}
            >
              <TableHeader className='sticky top-0 z-20'>
                <TableRow className='border-none hover:bg-transparent'>
                  {visibleColumns.map(col => (
                    <TableHead
                      key={col}
                      className='h-11 border-b border-slate-200 bg-slate-50 px-4 font-bold whitespace-nowrap text-slate-700 first:pl-6 last:pr-6'
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
                    className='hover:cursor-pointer hover:bg-slate-50/50'
                    onClick={() => setSelectedRow(item)}
                  >
                    {visibleColumns.map(col => (
                      <TableCell
                        key={col}
                        className='border-b border-slate-100 px-4 py-3 text-sm text-slate-600 first:pl-6 last:pr-6'
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
          <div className='flex items-center justify-between border-t bg-slate-50/30 px-6 py-4'>
            <div className='text-sm text-slate-500'>
              Mostrando{' '}
              <span className='font-medium text-slate-700'>{data?.length}</span>{' '}
              registros
            </div>

            <div className='flex items-center space-x-2'>
              <span className='mr-2 text-xs text-slate-500'>
                Página {page + 1}
              </span>
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
                disabled={
                  isPlaceholderData || (data && data.length < PAGE_LIMIT)
                }
                className='h-8 w-8 p-0 hover:cursor-pointer'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Details
        data={selectedRow}
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
      />
    </>
  );
}
