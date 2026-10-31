import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from '../../components/banner/banner';
import { Beneficios } from '../../components/beneficios/beneficios';
import { Faixa } from '../../components/faixa/faixa';
import { Depoimentos } from '../../components/depoimentos/depoimentos';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-home',
  imports: [Banner, Beneficios, Faixa, Depoimentos],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  produtosDestaque: Produto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    for (let produto of this.produtoService.listar()) {
      if (produto.destaque) {
        this.produtosDestaque.push(produto);
      }
    }
  }

  abrirProduto(produto: Produto) {
    this.produtoService.idSelecionado = produto.id;
    this.router.navigate(['/produto']);
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}