import { useState } from 'react';
import { useChicagoData } from '@/hooks/useChicagoData.hook';
import { PAGE_LIMIT } from '@/constants/pagination';

export function Dashboard() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, isPlaceholderData } = useChicagoData(page);

  if (isLoading) return <div>Carregando registros...</div>;
  if (isError) return <div>Erro ao carregar dados. Tente novamente.</div>;

  return (
    <section>
      <h1>Lista de Instalações - Chicago</h1>

      <table
        border={1}
        style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Comunidade</th>
            <th>Tipo de Prédio</th>
            <th>População</th>
            <th>Total kWh</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.community_area_name}</td>
              <td>
                {item.building_type} ({item.building_subtype})
              </td>
              <td>{item.total_population}</td>
              <td>{item.total_kwh} kWh</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav style={{ marginTop: '1rem' }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 0}>
          Anterior
        </button>

        <span style={{ margin: '0 1rem' }}>Página {page + 1}</span>

        <button
          onClick={() => setPage(p => p + 1)}
          disabled={isPlaceholderData || (data && data.length < PAGE_LIMIT)}
        >
          Próxima
        </button>
      </nav>
    </section>
  );
}
