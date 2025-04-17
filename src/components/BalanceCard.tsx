import { useEffect, useState } from "react";
import api from "../services/api";
import { Transaction } from "../types/Transaction";

export default function BalanceCard() {
    const [saldo, setSaldo] = useState(0);
    const [receitas, setReceitas] = useState(0);
    const [despesas, setDespesas] = useState(0);

    useEffect(() => {
        async function calcularSaldo() {
            try {
                const response = await api.get<Transaction[]>('/transacoes');
                const transacoes = response.data;

                const totalReceitas = transacoes
                    .filter(t => t.tipo === 'RECEITA')
                    .reduce((acc,curr) => acc + curr.valor,0);

                const totalDespesas = transacoes
                    .filter(t => t.tipo === 'DESPESA')
                    .reduce((acc,curr) => acc + curr.valor,0);

                setReceitas(totalReceitas);
                setDespesas(totalDespesas);
                setSaldo(totalReceitas - totalDespesas);

            } catch (error) {
                console.error('Erro ao calcular saldo:', error);
            }

        }
        calcularSaldo();
    }, []);

    return (
        <div>
            <h3>Resumo Financeiro</h3>
            <p>Receitas: <strong style={{color: 'green'}}>+R$ {receitas.toFixed(2)}</strong></p>
            <p>Despesas: <strong style={{color: 'red'}}>-R$ {despesas.toFixed(2)}</strong></p>
            <p>Saldo Atual: <strong>R$ {saldo.toFixed(2)}</strong></p>
        </div>
    )
}