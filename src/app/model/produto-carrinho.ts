import { Produto } from './produto';


export interface ItemCarrinho{
    produto:Produto;
    tamanho:string;
    quantidade:number;
}