import { useState } from 'react';
import { Transaction } from '../types/Transaction';
import api from '../services/api';

interface Props {
  onTransacaoAdicionada: () => void;
}

export default function TransactionForm({ onTransacaoAdicionada }: Props) {
  const [form, setForm] = useState<Transaction>({
    descricao: '',
    valor: 0,
    tipo: 'DESPESA',
    categoria: '',
    data: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'valor' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/transacoes', form);
    setForm({ descricao: '', valor: 0, tipo: 'DESPESA', categoria: '', data: '' });
    onTransacaoAdicionada();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
      <input name="valor" type="number" placeholder="Valor" value={form.valor} onChange={handleChange} />
      <select name="tipo" value={form.tipo} onChange={handleChange}>
        <option value="RECEITA">Receita</option>
        <option value="DESPESA">Despesa</option>
      </select>
      <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
      <input name="data" type="date" value={form.data} onChange={handleChange} />
      <button type="submit">Salvar</button>
    </form>
  );
}
