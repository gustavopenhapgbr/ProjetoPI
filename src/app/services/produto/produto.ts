import { Injectable } from '@angular/core';


export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private chave = 'fcustom_produtos';

  listar(): Produto[] {
    const dados = localStorage.getItem(this.chave);
    return dados ? JSON.parse(dados) : [];
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
    produtos.push({ id: novoId, ...produto });
    this.salvarLista(produtos);
  }

  atualizar(produtoAtualizado: Produto): void {
    const produtos = this.listar();
    const indice = produtos.findIndex((p) => p.id === produtoAtualizado.id);
    if (indice !== -1) {
      produtos[indice] = produtoAtualizado;
      this.salvarLista(produtos);
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