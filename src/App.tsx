
import { useEffect, useState } from 'react'
import './App.css'
import BalanceCard from './components/BalanceCard'
import PieChart from './components/PieChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { Transaction } from './types/Transaction'
import api from './services/api'

function App() {
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);

  async function fetchTransacoes() {
    const res = await api.get('/transacoes');
    setTransacoes(res.data);
  }

  useEffect(() => {
    fetchTransacoes();
  }, []);

  return (
    <div style={{ padding: '20px' }} id='campo1'>
      <h1>Simulador de Finanças</h1>
      <BalanceCard transacoes={transacoes} />
      <TransactionForm onTransacaoAdicionada={fetchTransacoes} />
      <PieChart transacoes={transacoes} />
      <TransactionList transacoes={transacoes} />
    </div>
  )
}

export default App
