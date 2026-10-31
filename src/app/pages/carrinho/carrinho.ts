import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho';
import { AuthService } from '../../services/auth';
import { ProdutoService } from '../../services/produto';
import { ProdutoCarrinho } from '../../model/produto-carrinho';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {

  constructor(
    public carrinhoService: CarrinhoService,
    public auth: AuthService,
    private produtoService: ProdutoService
  ) {}

  estoqueDisponivel(item: ProdutoCarrinho): number {
    return this.produtoService.estoqueDoTamanho(item.produto, item.tamanho);
  }

  finalizarCompra() {
    let confirmou = confirm('Deseja finalizar a compra?');
    if (confirmou) {
      this.carrinhoService.finalizarCompra();
      alert('Compra finalizada! Obrigado por comprar na F.Company.');
    }
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }
}