export interface Transaction {
    id?: number;
    descricao: string;
    valor: number;
    tipo: 'RECEITA' | 'DESPESA';
    categoria: string;
    data: string;
}