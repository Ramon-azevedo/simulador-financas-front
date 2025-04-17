
import './App.css'
import BalanceCard from './components/BalanceCard'
import PieChart from './components/PieChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

function App() {

  return (
    <div>
      <h1>Simulador de Finanças</h1>
      <BalanceCard />
      <TransactionForm />
      <PieChart />
      <hr />
      <TransactionList />
    </div>
  )
}

export default App
