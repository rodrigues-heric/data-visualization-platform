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
import { useSettings } from '../context/settingsContext';
import { translations } from '@/locales/i18n';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';

interface FacilityDetailsProps {
  data: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailsEnergy({ data, isOpen, onClose }: FacilityDetailsProps) {
  if (!data) return null;

  const { lang } = useSettings();
  const t = translations[lang];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side='right'
        className='flex h-full w-full flex-col overflow-y-auto p-0 sm:max-w-xl dark:border-slate-800 dark:bg-slate-950'
      >
        <div className='flex flex-col p-6'>
          <SheetHeader className='pb-0 text-left'>
            <div className='flex items-center justify-between'>
              <SheetTitle className='text-xl font-bold text-slate-800 dark:text-slate-100'>
                {data.community_area_name}
              </SheetTitle>
            </div>
            <SheetDescription className='mt-2 dark:text-slate-400'>
              {t.energyDetails.description}
            </SheetDescription>
          </SheetHeader>

          <div className='mt-8 space-y-8'>
            <SectionStructure data={data} />
            <Separator className='dark:bg-slate-800' />
            <SectionEnergyConsumption data={data} />
            <Separator className='dark:bg-slate-800' />
            <SectionAllData data={data} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SectionStructure({ data }: { data: any }) {
  const { lang } = useSettings();
  const t = translations[lang];

  return (
    <section className='mb-2 px-4'>
      <h4 className='mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
        {t.energyDetails.building.title}
      </h4>
      <div className='grid grid-cols-2 gap-4'>
        <DetailItem
          label={t.energyDetails.building.type}
          value={data.building_type}
        />
        <DetailItem
          label={t.energyDetails.building.subtype}
          value={data.building_subtype}
        />
        <DetailItem
          label={t.energyDetails.building.averageAge}
          value={`${data.average_building_age} ${t.energyDetails.building.years}`}
        />
        <DetailItem
          label={t.energyDetails.building.totalUnits}
          value={data.total_units}
        />
      </div>
    </section>
  );
}

function SectionEnergyConsumption({ data }: { data: any }) {
  const { lang } = useSettings();
  const t = translations[lang];

  return (
    <section className='mb-2 px-4'>
      <h4 className='mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
        {t.energyDetails.energy.title}
      </h4>
      <div className='grid grid-cols-2 gap-4'>
        <DetailItem
          label={t.energyDetails.energy.consumption.total}
          value={data.total_kwh}
          highlight
        />
        <DetailItem
          label={t.energyDetails.energy.consumption.population}
          value={data.total_population}
        />
        <DetailItem
          label={t.energyDetails.energy.consumption.january}
          value={`${data.kwh_january_2010} kWh`}
        />
        <DetailItem
          label={t.energyDetails.energy.consumption.december}
          value={`${data.kwh_december_2010} kWh`}
        />
      </div>
    </section>
  );
}

function SectionAllData({ data }: { data: any }) {
  const { lang } = useSettings();
  const t = translations[lang];

  return (
    <section className='mb-4 px-4'>
      <h4 className='mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
        {t.energyDetails.allData}
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
