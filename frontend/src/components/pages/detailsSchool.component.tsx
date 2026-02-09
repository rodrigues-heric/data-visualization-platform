import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ChicagoSchool } from '@/interfaces/chicagoSchool.interface';
import { GraduationCap, MapPin, BarChart3, Globe } from 'lucide-react';

interface DetailsSchoolProps {
  data: ChicagoSchool | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailsSchool({ data, isOpen, onClose }: DetailsSchoolProps) {
  if (!data) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-full p-0 sm:max-w-3xl dark:border-slate-800 dark:bg-slate-950'>
        <ScrollArea className='h-full'>
          <div className='p-6'>
            <SheetHeader className='mb-6'>
              <div className='mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400'>
                <GraduationCap className='h-5 w-5' />
                <span className='text-xs font-bold tracking-widest uppercase'>
                  School Profile
                </span>
              </div>
              <SheetTitle className='text-2xl font-bold dark:text-slate-100'>
                {data.long_name}
              </SheetTitle>
              <SheetDescription className='flex items-center gap-2 dark:text-slate-400'>
                <MapPin className='h-3 w-3' />
                {data.address}, {data.city}, {data.state} {data.zip}
              </SheetDescription>
            </SheetHeader>

            <Tabs defaultValue='overview' className='w-full'>
              <TabsList className='grid w-full grid-cols-3 border dark:border-slate-800 dark:bg-slate-900'>
                <TabsTrigger value='overview'>Geral</TabsTrigger>
                <TabsTrigger value='academic'>Acadêmico</TabsTrigger>
                <TabsTrigger value='climate'>Clima & Cultura</TabsTrigger>
              </TabsList>

              <TabsContent value='overview' className='mt-6 space-y-6'>
                <section>
                  <h4 className='mb-4 text-xs font-bold tracking-wider text-slate-500 uppercase'>
                    Informações Institucionais
                  </h4>
                  <div className='grid grid-cols-2 gap-y-4'>
                    <InfoField label='ID da Escola' value={data.school_id} />
                    <InfoField label='Tipo' value={data.school_type} />
                    <InfoField
                      label='Categoria'
                      value={data.primary_category}
                    />
                    <InfoField label='Website' value={data.website} isLink />
                  </div>
                </section>
                <Separator className='dark:bg-slate-800' />
                <section>
                  <h4 className='mb-4 text-xs font-bold tracking-wider text-slate-500 uppercase'>
                    Estrutura e Contato
                  </h4>
                  <div className='grid grid-cols-2 gap-y-4'>
                    <InfoField label='Telefone' value={data.phone} />
                    <InfoField label='Fax' value={data.fax} />
                  </div>
                </section>
              </TabsContent>

              <TabsContent value='academic' className='mt-6 space-y-6'>
                <div className='rounded-lg border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10'>
                  <h4 className='mb-3 flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-300'>
                    <BarChart3 className='h-4 w-4' /> Performance de Graduação
                  </h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <InfoField
                      label='Graduação (4 anos)'
                      value={`${data.graduation_4_year_school}%`}
                      highlight
                    />
                    <InfoField
                      label='Graduação (5 anos)'
                      value={`${data.graduation_5_year_school}%`}
                      highlight
                    />
                  </div>
                </div>

                <section>
                  <h4 className='mb-4 text-xs font-bold tracking-wider text-slate-500 uppercase'>
                    Resultados NWEA (Attainment)
                  </h4>
                  <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                    <InfoField
                      label='Math Label'
                      value={data.attainment_math_lbl_es}
                    />
                    <InfoField
                      label='Reading Label'
                      value={data.attainment_reading_lbl_es}
                    />
                    <InfoField
                      label='Math Percentile'
                      value={`${data.attainment_math_pct_es}%`}
                    />
                    <InfoField
                      label='Reading Percentile'
                      value={`${data.attainment_reading_pct_es}%`}
                    />
                  </div>
                </section>
              </TabsContent>

              <TabsContent value='climate' className='mt-6 space-y-6'>
                <section className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-xs font-bold tracking-wider text-slate-500 uppercase'>
                      Avaliação de Pesquisa
                    </h4>
                    <span className='rounded bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'>
                      {data.school_survey_rating}
                    </span>
                  </div>
                  <div className='grid grid-cols-1 gap-3'>
                    <ProgressBar
                      label='Ambiente de Suporte'
                      value={data.school_survey_supportive}
                    />
                    <ProgressBar
                      label='Segurança'
                      value={data.school_survey_safety}
                    />
                    <ProgressBar
                      label='Envolvimento dos Pais'
                      value={data.school_survey_involved}
                    />
                    <ProgressBar
                      label='Liderança Efetiva'
                      value={data.school_survey_effective}
                    />
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function InfoField({
  label,
  value,
  isLink,
  highlight,
}: {
  label: string;
  value: any;
  isLink?: boolean;
  highlight?: boolean;
}) {
  const renderValue = () => {
    if (value && typeof value === 'object' && value.url) {
      return value.url;
    }
    return value;
  };

  const finalValue = renderValue();

  return (
    <div className='flex flex-col gap-1'>
      <span className='text-[10px] font-semibold tracking-tight text-slate-400 uppercase'>
        {label}
      </span>

      {isLink && finalValue ? (
        <a
          href={
            finalValue.startsWith('http') ? finalValue : `https://${finalValue}`
          }
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:underline dark:text-blue-400'
        >
          {finalValue.replace(/^https?:\/\//, '').split('/')[0]}
          <Globe className='h-3 w-3' />
        </a>
      ) : (
        <span
          className={`text-sm font-medium ${
            highlight
              ? 'text-lg font-bold text-blue-600 dark:text-blue-400'
              : 'text-slate-800 dark:text-slate-200'
          }`}
        >
          {finalValue || '---'}
        </span>
      )}
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: string }) {
  return (
    <div className='space-y-1.5'>
      <div className='flex justify-between text-xs font-medium'>
        <span className='text-slate-600 dark:text-slate-400'>{label}</span>
        <span className='font-bold text-slate-900 dark:text-slate-200'>
          {value}
        </span>
      </div>
      <div className='h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800'>
        <div
          className='h-full bg-blue-600 dark:bg-blue-500'
          style={{
            width:
              value === 'VERY STRONG'
                ? '100%'
                : value === 'STRONG'
                  ? '75%'
                  : '50%',
          }}
        />
      </div>
    </div>
  );
}
