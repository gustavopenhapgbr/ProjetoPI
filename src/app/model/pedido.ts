import {ProdutoCarrinho} from './produto-carrinho';

export interface Pedido {
    id? : number | string;
    usuarioId: string;
    email: string;
    itens: ProdutoCarrinho[];
    total: number;
    data: string;

}