import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../component/card/card';
import { Produto, ProdutoService } from '../../../services/produto/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acessorios',
  imports: [Card, RouterLink],
  templateUrl: './acessorios.html',
  styleUrl: './acessorios.css',
})
export class Acessorios {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtoService
      .listar()
      .filter((produto) => produto.categoria === 'acessorios');
  }

  irParaOproduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}