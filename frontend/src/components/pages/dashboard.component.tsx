import { useState } from 'react';
import { useChicagoData } from '@/hooks/useChicagoData.hook';
import { PAGE_LIMIT } from '@/constants/pagination';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export function Dashboard() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, isPlaceholderData } = useChicagoData(page);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center space-y-4 p-12'>
        <Loader2 className='h-8 w-8 animate-spin text-slate-500' />
        <p className='font-medium text-slate-500'>Carregando dados...</p>
      </div>
    );
  }

  if (isError)
    return (
      <div className='text-destructive p-8'>
        Erro ao carregar dados. Tente novamente
      </div>
    );

  return (
    <Card className='border-slate-200 shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b bg-slate-50/50'>
        <div>
          <CardTitle className='text-xl font-semibold text-slate-800'>
            Relatório de Consumo Energético
          </CardTitle>
          <p className='text-sm text-slate-500'>
            Análise urbana por setor e demografia
          </p>
        </div>

        {isLoading && (
          <Loader2 className='h-4 w-4 animate-spin text-slate-400' />
        )}
      </CardHeader>

      <CardContent className='p-0'>
        <div className='relative'>
          {isPlaceholderData && (
            <div className='absolute inset-0 z-10 bg-white/50 transition-opacity' />
          )}

          <Table>
            <TableHeader className='bg-slate-50'>
              <TableRow>
                <TableHead className='font-bold text-slate-700'>
                  Comunidade
                </TableHead>
                <TableHead className='font-bold text-slate-700'>
                  Tipo de Prédio
                </TableHead>
                <TableHead className='text-right font-bold text-slate-700'>
                  População
                </TableHead>
                <TableHead className='text-right font-bold text-slate-700'>
                  Consumo (kWh)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item, index) => {
                return (
                  <TableRow key={index} className='hover:bg-slate-50/80'>
                    <TableCell className='font-medium text-slate-900'>
                      {item.community_area_name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='secondary'
                        className='text-[10px] font-normal tracking-wider uppercase'
                      >
                        {item.building_type}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right font-mono text-xs text-slate-600'>
                      {item.total_population}
                    </TableCell>
                    <TableCell className='text-right font-mono text-xs text-slate-700'>
                      {item.total_kwh}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

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
