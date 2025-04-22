import { Transaction } from "../types/Transaction";

interface Props {
  transacoes: Transaction[];
}

export default function BalanceCard({ transacoes }: Props) {
  const receitas = transacoes
    .filter(t => t.tipo === 'RECEITA')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const despesas = transacoes
    .filter(t => t.tipo === 'DESPESA')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldo = receitas - despesas;

  return (
    <div>
      <h3>Resumo Financeiro</h3>
      <p>Receitas: <strong style={{ color: 'green' }}>+R$ {receitas.toFixed(2)}</strong></p>
      <p>Despesas: <strong style={{ color: 'red' }}>-R$ {despesas.toFixed(2)}</strong></p>
      <p>Saldo Atual: <strong>R$ {saldo.toFixed(2)}</strong></p>
    </div>
  );
}
