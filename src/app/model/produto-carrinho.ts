import { Produto } from './produto';

export interface ProdutoCarrinho {
  id?: number | string;
  usuarioId: string;
  produto: Produto;
  tamanho: string;
  quantidade: number;
}
