import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  AVAILABLE_COLUMNS,
  type ChicagoFacilityColumnKey,
} from '@/interfaces/chicagoFacilityColumnsMap.type';
import { Separator } from '@/components/ui/separator';

interface FacilityDetailsProps {
  data: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailsEnergy({ data, isOpen, onClose }: FacilityDetailsProps) {
  if (!data) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-100 overflow-y-auto sm:w-135 sm:max-w-2xl dark:border-slate-800 dark:bg-slate-950'>
        <SheetHeader className='pb-0'>
          <SheetTitle className='text-xl font-bold text-slate-800 dark:text-slate-100'>
            {data.community_area_name}
          </SheetTitle>
          <SheetDescription className='dark:text-slate-400'>
            Detalhamento completo dos indicadores energéticos e estruturais.
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6'>
          <SectionStructure data={data} />
          <Separator className='my-4 dark:bg-slate-800' />
          <SectionEnergyConsumption data={data} />
          <Separator className='my-4 dark:bg-slate-800' />
          <SectionAllData data={data} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SectionStructure({ data }: { data: any }) {
  return (
    <section className='mb-2 px-4'>
      <h4 className='mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
        Estrutura do Imóvel
      </h4>
      <div className='grid grid-cols-2 gap-4'>
        <DetailItem label='Tipo de Edificação' value={data.building_type} />
        <DetailItem label='Subtipo' value={data.building_subtype} />
        <DetailItem
          label='Idade Média'
          value={`${data.average_building_age} anos`}
        />
        <DetailItem label='Total de Unidades' value={data.total_units} />
      </div>
    </section>
  );
}

function SectionEnergyConsumption({ data }: { data: any }) {
  return (
    <section className='mb-2 px-4'>
      <h4 className='mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
        Consumo de Energia (2010)
      </h4>
      <div className='grid grid-cols-2 gap-4'>
        <DetailItem label='Total kWh' value={data.total_kwh} highlight />
        <DetailItem label='População' value={data.total_population} />
        <DetailItem label='Janeiro' value={`${data.kwh_january_2010} kWh`} />
        <DetailItem label='Dezembro' value={`${data.kwh_december_2010} kWh`} />
      </div>
    </section>
  );
}

function SectionAllData({ data }: { data: any }) {
  return (
    <section className='mb-4 px-4'>
      <h4 className='mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
        Todos os Indicadores
      </h4>
      <div className='space-y-2 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50'>
        {(Object.keys(AVAILABLE_COLUMNS) as ChicagoFacilityColumnKey[]).map(
          key => (
            <div
              key={key}
              className='flex justify-between border-b border-slate-200 pb-1 text-xs dark:border-slate-800'
            >
              <span className='text-slate-500 dark:text-slate-400'>
                {AVAILABLE_COLUMNS[key]}:
              </span>
              <span className='font-mono text-slate-700 dark:text-slate-300'>
                {data[key] || 'N/A'}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function DetailItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className='flex flex-col'>
      <span className='text-[10px] font-medium tracking-tight text-slate-500 uppercase dark:text-slate-500'>
        {label}
      </span>
      <span
        className={`text-sm font-medium ${
          highlight
            ? 'font-bold text-blue-600 dark:text-blue-400'
            : 'text-slate-800 dark:text-slate-200'
        }`}
      >
        {value || '---'}
      </span>
    </div>
  );
}
