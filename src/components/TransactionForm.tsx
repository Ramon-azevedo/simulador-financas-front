import { useState } from 'react';
import { Transaction } from '../types/Transaction';
import api from '../services/api';

export default function TransactionForm() {
    const [form, setForm] = useState<Transaction>({
        descricao: '',
        valor: 0,
        tipo: 'DESPESA',
        categoria: '',
        data: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.post('/transacoes', form);
        setForm({descricao: '',valor: 0, tipo: 'DESPESA', categoria: '', data: ''});
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="descricao" placeholder='Descrição' value={form.descricao} onChange={handleChange}/>
            <input name="valor" type='number' placeholder='valor' value={form.valor} onChange={handleChange}/>
            <select name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
            </select>
            <input name="categoria" placeholder='categoria' value={form.categoria} onChange={handleChange}/>
            <input name="data" type='date' value={form.data} onChange={handleChange}/>
            <button type="submit">Salvar</button>
        </form>
    )
}