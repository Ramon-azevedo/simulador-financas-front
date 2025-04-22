import { Transaction } from "../types/Transaction";

interface Props {
    transacoes: Transaction[];
}

export default function TransactionList({ transacoes }: Props) {
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
    );
}
