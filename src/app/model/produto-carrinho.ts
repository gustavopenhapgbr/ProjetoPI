import { Produto } from './produto';


export interface ProdutoCarrinho {
    produto: Produto;
    tamanho: string;
    quantidade: number;
}