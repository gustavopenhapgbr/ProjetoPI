import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto/produto';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  logado = false;
  senhaDigitada = '';
  mostrarSenha = false;
  private readonly senhaCorreta = 'fcustom123'; 

  produtos: Produto[] = [];
  categorias = ['camisetas', 'calcas', 'shorts', 'conjuntos', 'acessorios'];

  produtoEmEdicao: Produto = this.produtoVazio();
  editando = false;

  constructor(private produtoService: ProdutoService) {}

  entrar(): void {
    if (this.senhaDigitada === this.senhaCorreta) {
      this.logado = true;
      this.carregarProdutos();
    } else {
      alert('Senha incorreta!');
    }
  }

  alternarMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  sair(): void {
    this.logado = false;
    this.senhaDigitada = '';
  }

  carregarProdutos(): void {
    this.produtos = this.produtoService.listar();
  }

  produtoVazio(): Produto {
    return { id: 0, nome: '', preco: 0, categoria: 'camisetas', imagem: '', descricao: '' };
  }

  salvarProduto(): void {
    if (!this.produtoEmEdicao.nome.trim() || this.produtoEmEdicao.preco <= 0) {
      alert('Preencha ao menos o nome e um preço válido.');
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
    const confirmou = confirm('Tem certeza que deseja remover este produto?');
    if (confirmou) {
      this.produtoService.remover(id);
      this.carregarProdutos();
    }
  }
}