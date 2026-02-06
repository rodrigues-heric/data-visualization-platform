import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings2 } from 'lucide-react';
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

export function Dashboard() {
  const [page, setPage] = useState(0);

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
    return <div className='p-10 text-center'>Carregando análise...</div>;

  return (
    <Card className='border-slate-200 shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between border-b bg-slate-50/50'>
        <div>
          <CardTitle className='text-lg font-semibold text-slate-800'>
            Análise Dinâmica de Consumo
          </CardTitle>
          <p className='text-xs text-slate-500'>
            Personalize as métricas de visualização
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' size='sm' className='ml-auto gap-2'>
              <Settings2 className='h-4 w-4' />
              Colunas
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='w-64 p-3'>
            <div className='space-y-3'>
              <h4 className='border-b pb-2 text-sm font-medium'>
                Configurar Colunas
              </h4>
              <div className='grid gap-2'>
                {(
                  Object.keys(AVAILABLE_COLUMNS) as ChicagoFacilityColumnKey[]
                ).map(key => (
                  <div key={key} className='flex items-center space-x-2'>
                    <Checkbox
                      id={key}
                      checked={visibleColumns.includes(key)}
                      onCheckedChange={() => toggleColumn(key)}
                    />
                    <label
                      htmlFor={key}
                      className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {AVAILABLE_COLUMNS[key]}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent className='p-0'>
        <Table>
          <TableHeader className='bg-slate-50'>
            <TableRow>
              {visibleColumns.map(col => (
                <TableHead key={col} className='font-bold text-slate-700'>
                  {AVAILABLE_COLUMNS[col]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {visibleColumns.map(col => (
                  <TableCell key={col} className='text-sm text-slate-600'>
                    {typeof item[col] === 'string' && !isNaN(Number(item[col]))
                      ? Number(item[col]).toLocaleString('pt-BR')
                      : item[col]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='flex items-center justify-between border-t bg-slate-50/30 px-4 py-4'>
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
              className='h-8 w-8 p-0'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setPage(p => p + 1)}
              disabled={isPlaceholderData || (data && data.length < PAGE_LIMIT)}
              className='h-8 w-8 p-0'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
