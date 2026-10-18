import { Produto } from './produto';


export interface itemCarrinho{
    produto:Produto;
    tamanho:string;
    quantidade:number;
}