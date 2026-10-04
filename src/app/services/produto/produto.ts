import { Injectable } from '@angular/core';


export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  descricao: string;
  destaque: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private chave = 'fcustom_produtos';

  listar(): Produto[] {
    const dados = localStorage.getItem(this.chave);
    if (!dados) {
      return [];
    }

    const produtos = JSON.parse(dados) as Partial<Produto>[];
    const categoriasComDestaque = new Set<string>();

    return produtos.map((produto) => {
      const destaque =
        produto.destaque === true && !categoriasComDestaque.has(produto.categoria ?? '');

      if (destaque) {
        categoriasComDestaque.add(produto.categoria ?? '');
      }

      return {
      id: produto.id ?? 0,
      nome: produto.nome ?? '',
      preco: produto.preco ?? 0,
      categoria: produto.categoria ?? '',
      imagem: produto.imagem ?? '',
      descricao: produto.descricao ?? '',
        destaque,
      };
    });
  }

    buscar(termo: string, limite?: number): Produto[] {
    const normaliza = (s: string) =>
      s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const t = normaliza(termo.trim());
    if (!t) return [];

    const achados = this.listar().filter(
      (p) => normaliza(p.nome).includes(t) || normaliza(p.categoria).includes(t)
    );
    return limite ? achados.slice(0, limite) : achados;
  }

  adicionar(produto: Omit<Produto, 'id'>): void {
    const produtos = this.listar();
    const novoId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
    const produtoComId = { id: novoId, ...produto };
    const produtosAtualizados = produtoComId.destaque
      ? produtos.map((item) =>
          item.categoria === produtoComId.categoria ? { ...item, destaque: false } : item,
        )
      : produtos;

    produtosAtualizados.push(produtoComId);
    this.salvarLista(produtosAtualizados);
  }

  atualizar(produtoAtualizado: Produto): void {
    const produtos = this.listar();
    const indice = produtos.findIndex((p) => p.id === produtoAtualizado.id);
    if (indice !== -1) {
      const produtosAtualizados = produtos.map((produto) => {
        if (
          produto.id !== produtoAtualizado.id &&
          produto.categoria === produtoAtualizado.categoria &&
          produtoAtualizado.destaque
        ) {
          return { ...produto, destaque: false };
        }

        return produto.id === produtoAtualizado.id ? produtoAtualizado : produto;
      });

      this.salvarLista(produtosAtualizados);
    }
  }

  remover(id: number): void {
    const produtos = this.listar().filter((p) => p.id !== id);
    this.salvarLista(produtos);
  }

  private salvarLista(produtos: Produto[]): void {
    localStorage.setItem(this.chave, JSON.stringify(produtos));
  }
}