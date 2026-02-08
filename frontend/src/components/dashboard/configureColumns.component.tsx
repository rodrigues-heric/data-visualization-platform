import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AVAILABLE_COLUMNS,
  type ChicagoFacilityColumnKey,
} from '@/interfaces/chicagoFacilityColumnsMap.type';

export function ConfigureColumns({
  visibleColumns,
  toggleColumn,
}: {
  visibleColumns: ChicagoFacilityColumnKey[];
  toggleColumn: (col: ChicagoFacilityColumnKey) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto gap-2 hover:cursor-pointer dark:border-slate-800 dark:text-slate-300'
        >
          <Settings2 className='h-4 w-4' />
          Colunas
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align='end'
        className='w-64 p-0 dark:border-slate-800 dark:bg-slate-900'
      >
        <div className='border-b bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/50'>
          <h4 className='text-sm font-medium text-slate-800 dark:text-slate-100'>
            Configurar Colunas
          </h4>
        </div>

        <div className='max-h-80 overflow-y-auto p-3'>
          <div className='grid gap-2'>
            {(Object.keys(AVAILABLE_COLUMNS) as ChicagoFacilityColumnKey[]).map(
              key => (
                <div
                  key={key}
                  className='flex items-center space-x-2 rounded-sm p-1 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50'
                >
                  <Checkbox
                    id={key}
                    checked={visibleColumns.includes(key)}
                    onCheckedChange={() => toggleColumn(key)}
                    className='dark:border-slate-700 dark:data-[state=checked]:bg-blue-600'
                  />
                  <label
                    htmlFor={key}
                    className='flex-1 cursor-pointer text-sm leading-none text-slate-600 transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  >
                    {AVAILABLE_COLUMNS[key]}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
