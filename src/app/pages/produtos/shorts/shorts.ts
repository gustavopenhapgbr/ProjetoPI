import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../component/card/card';
import { Produto, ProdutoService } from '../../../services/produto/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shorts',
  imports: [Card, RouterLink],
  templateUrl: './shorts.html',
  styleUrl: './shorts.css',
})
export class Shorts {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtoService
      .listar()
      .filter((produto) => produto.categoria === 'shorts');
  }

  irParaOproduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}