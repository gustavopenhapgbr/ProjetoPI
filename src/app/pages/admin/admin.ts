import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { ProdutoService, Produto } from '../../services/produto/produto';

export interface GrupoCategoria {
  categoria: string;
  quantidade: number;
  precoMin: number;
  precoMax: number;
  emDestaque: string;
  produtos: Produto[];
}

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  produtos: Produto[] = [];
  grupos: GrupoCategoria[] = [];
  categoriasAbertas = new Set<string>();
  categorias = ['camisetas', 'calcas', 'shorts', 'conjuntos', 'acessorios'];

  produtoEmEdicao: Produto = this.produtoVazio();
  editando = false;

  constructor(
    private produtoService: ProdutoService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  sair(): void {
    this.auth.sair();
    this.router.navigate(['/']);
  }

  carregarProdutos(): void {
    this.produtos = this.produtoService.listar();
    this.agruparPorCategoria();
  }

  private agruparPorCategoria(): void {
    const mapa = new Map<string, Produto[]>();
    for (const produto of this.produtos) {
      const lista = mapa.get(produto.categoria) ?? [];
      lista.push(produto);
      mapa.set(produto.categoria, lista);
    }

    this.grupos = Array.from(mapa, ([categoria, produtos]) => {
      const precos = produtos.map((p) => p.preco);
      return {
        categoria,
        quantidade: produtos.length,
        precoMin: Math.min(...precos),
        precoMax: Math.max(...precos),
        emDestaque: produtos.find((p) => p.destaque)?.nome ?? '—',
        produtos,
      };
    });
  }

  alternarCategoria(categoria: string): void {
    if (this.categoriasAbertas.has(categoria)) {
      this.categoriasAbertas.delete(categoria);
    } else {
      this.categoriasAbertas.add(categoria);
    }
  }

  formatarPreco(grupo: GrupoCategoria): string {
    const min = 'R$ ' + grupo.precoMin.toFixed(2);
    const max = 'R$ ' + grupo.precoMax.toFixed(2);
    return grupo.precoMin === grupo.precoMax ? min : min + ' – ' + max;
  }

  totalEstoque(produto: Produto): number {
    return produto.estoqueS + produto.estoqueM + produto.estoqueL + produto.estoqueXL;
  }

  produtoVazio(): Produto {
    return {
      id: 0,
      nome: '',
      preco: 0,
      categoria: 'camisetas',
      imagem: '',
      descricao: '',
      destaque: false,
      estoqueS: 0,
      estoqueM: 0,
      estoqueL: 0,
      estoqueXL: 0,
    };
  }

  onImagemSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (!arquivo) {
      this.produtoEmEdicao.imagem = '';
      return;
    }

    if (!arquivo.type.startsWith('image/')) {
      alert('Selecione uma imagem válida (PNG, JPG ou WEBP).');
      input.value = '';
      this.produtoEmEdicao.imagem = '';
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
      this.produtoEmEdicao.imagem = typeof leitor.result === 'string' ? leitor.result : '';
    };
    leitor.readAsDataURL(arquivo);
  }

    salvarProduto(): void {
    if (!this.produtoEmEdicao.nome.trim() || this.produtoEmEdicao.preco <= 0) {
      alert('Preencha ao menos o nome e um preço válido.');
      return;
    }

        const p = this.produtoEmEdicao;

    p.estoqueS = Number(p.estoqueS ?? 0);
    p.estoqueM = Number(p.estoqueM ?? 0);
    p.estoqueL = Number(p.estoqueL ?? 0);
    p.estoqueXL = Number(p.estoqueXL ?? 0);

    const quantidades = [p.estoqueS, p.estoqueM, p.estoqueL, p.estoqueXL];
    const invalido = quantidades.some((q) => !Number.isInteger(q) || q < 0);

    if (invalido) {
      alert('As quantidades de estoque devem ser números inteiros iguais ou maiores que 0.');
      return;
    }

    const total = p.estoqueS + p.estoqueM + p.estoqueL + p.estoqueXL;

    if (total === 0) {
      alert('Informe a quantidade em estoque de pelo menos um tamanho.');
      return;
    }

    if (this.editando) {
      this.produtoService.atualizar(this.produtoEmEdicao);
    } else {
      const { id, ...dadosDoProduto } = this.produtoEmEdicao;
      this.produtoService.adicionar(dadosDoProduto);
    }

    this.cancelarEdicao();
    this.carregarProdutos();
  }

  editarProduto(produto: Produto): void {
    this.produtoEmEdicao = { ...produto };
    this.editando = true;
  }

  cancelarEdicao(): void {
    this.produtoEmEdicao = this.produtoVazio();
    this.editando = false;
  }

  removerProduto(id: number): void {
    const confirmou = confirm('Deseja remover este produto?');
    if (confirmou) {
      this.produtoService.remover(id);
      this.carregarProdutos();
    }
  }
}