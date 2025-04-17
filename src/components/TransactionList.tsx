import { useEffect, useState } from "react";
import { Transaction } from "../types/Transaction";
import api from "../services/api";

export default function TransactionList() {
    const [transacoes, setTransacoes] = useState<Transaction[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/transacoes');
                setTransacoes(response.data);

            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        }

        fetchData();
    }, []);
    

    return (
        <div>
            <h2>Minhas Transações</h2>
            <ul>
                {transacoes.map((t) => (
                    <li key={t.id}>
                        <strong>{t.descricao}</strong> - R${t.valor.toFixed(2)} ({t.tipo}) <br />
                        <small>{new Date(t.data).toLocaleDateString()} | Categoria: {t.categoria}</small>
                    </li>
                ))}
            </ul>
        </div>
    )
}