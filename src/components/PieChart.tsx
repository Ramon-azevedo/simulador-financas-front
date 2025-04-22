import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
import { Transaction } from "../types/Transaction";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  transacoes: Transaction[];
}

export default function PieChart({ transacoes }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dadosGrafico, setDadosGrafico] = useState<any>(null);

  useEffect(() => {
    const despesas = transacoes.filter(t => t.tipo === 'DESPESA');
    const categorias: Record<string, number> = {};

    despesas.forEach((t) => {
      categorias[t.categoria] = (categorias[t.categoria] || 0) + t.valor;
    });

    setDadosGrafico({
      labels: Object.keys(categorias),
      datasets: [
        {
          label: 'Despesas por categoria',
          data: Object.values(categorias),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [transacoes]);

  if (!dadosGrafico) return <p>Carregando gráfico...</p>;

  return (
    <div style={{ width: '400px', marginTop: '30px' }}>
      <h3>Gastos por Categorias</h3>
      <Pie data={dadosGrafico} />
    </div>
  );
}
