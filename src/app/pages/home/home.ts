import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Beneficios } from '../../component/beneficios/beneficios';
import { Banner } from '../../component/banner/banner';
import { Faixa } from '../../component/faixa/faixa';
import { Depoimentos } from '../../component/depoimentos/depoimentos';
import { Card } from '../../component/card/card';
import { Produto, ProdutoService } from '../../services/produto/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Banner, Beneficios, Faixa, Depoimentos, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  produtosDestaque: Produto[] = [];

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit(): void {
    this.produtosDestaque = this.produtoService.listar().filter((produto) => produto.destaque);
  }

  irPageProduto(produto: Produto): void {
    this.router.navigate(['/produto', produto.id]);
  }
}