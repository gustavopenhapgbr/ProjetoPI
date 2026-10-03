import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Card } from '../../../component/card/card';
import { Produto, ProdutoService } from '../../../services/produto/produto';

@Component({
  selector: 'app-calcas',
  imports: [Card, RouterLink],
  templateUrl: './calcas.html',
  styleUrl: './calcas.css',
})
export class Calcas {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtoService
      .listar()
      .filter((produto) => produto.categoria === 'calcas');
  }

  irParaOproduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}