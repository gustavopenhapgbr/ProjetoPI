import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Card } from '../../../component/card/card';
import { Produto, ProdutoService } from '../../../services/produto/produto';

@Component({
  selector: 'app-camisetas',
  imports: [Card, RouterLink],
  templateUrl: './camisetas.html',
  styleUrl: './camisetas.css',
})
export class Camisetas {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtoService
      .listar()
      .filter((produto) => produto.categoria === 'camisetas');
  }

  irParaOproduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}