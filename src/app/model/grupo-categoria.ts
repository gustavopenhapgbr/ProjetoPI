import { Produto } from './produto';

// Resumo de uma categoria, usado no painel administrativo
export interface GrupoCategoria {
  categoria: string;
  quantidade: number;
  precoMin: number;
  precoMax: number;
  emDestaque: string;
  produtos: Produto[];
  aberto: boolean;
}