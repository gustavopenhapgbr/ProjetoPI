import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  descricao: string;
  destaque: boolean;
  estoqueS: number;
  estoqueM: number;
  estoqueL: number;
  estoqueXL: number;
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
        estoqueS: produto.estoqueS ?? 0,
        estoqueM: produto.estoqueM ?? 0,
        estoqueL: produto.estoqueL ?? 0,
        estoqueXL: produto.estoqueXL ?? 0,
      };
    });
  }

  buscar(termo: string): Produto[] {
    const busca = termo.trim();

    if (busca === '') {
      return [];
    }

    const produtos = this.listar();
    const encontrados: Produto[] = [];

    for (const produto of produtos) {

      if (produto.nome.indexOf(busca) !== -1 || produto.categoria.indexOf(busca) !== -1) {
        encontrados.push(produto);
      }
    }

    return encontrados;
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

  buscarPorId(id: number): Produto | undefined {
    return this.listar().find((p) => p.id === id);
  }

  estoqueDe(produto: Produto, tamanho: string): number {
    switch (tamanho) {
      case 'S': return produto.estoqueS;
      case 'M': return produto.estoqueM;
      case 'L': return produto.estoqueL;
      case 'XL': return produto.estoqueXL;
      default: return 0;
    }
  }

  baixarEstoque(id: number, tamanho: string, quantidade: number): void {
    const produtos = this.listar();
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    switch (tamanho) {
      case 'S': produto.estoqueS = Math.max(0, produto.estoqueS - quantidade); break;
      case 'M': produto.estoqueM = Math.max(0, produto.estoqueM - quantidade); break;
      case 'L': produto.estoqueL = Math.max(0, produto.estoqueL - quantidade); break;
      case 'XL': produto.estoqueXL = Math.max(0, produto.estoqueXL - quantidade); break;
    }

    const total = produto.estoqueS + produto.estoqueM + produto.estoqueL + produto.estoqueXL;

    const restantes = total === 0 ? produtos.filter((p) => p.id !== id) : produtos;
    this.salvarLista(restantes);
  }

  private salvarLista(produtos: Produto[]): void {
    localStorage.setItem(this.chave, JSON.stringify(produtos));
  }
}