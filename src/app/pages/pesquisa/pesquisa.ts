import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-pesquisa',
  imports: [RouterLink],
  templateUrl: './pesquisa.html',
  styleUrl: './pesquisa.css',
})
export class Pesquisa {

  constructor(public produtoService: ProdutoService, private router: Router) {}

  abrirProduto(produto: Produto) {
    this.produtoService.idSelecionado = produto.id;
    this.router.navigate(['/produto']);
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}