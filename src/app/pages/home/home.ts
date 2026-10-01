import { Component } from '@angular/core';
import { Beneficios } from '../../component/beneficios/beneficios';
import { Banner } from '../../component/banner/banner';
import { Faixa } from '../../component/faixa/faixa';
import { Depoimentos } from '../../component/depoimentos/depoimentos';
import { Card } from '../../component/card/card';
import { Produto } from '../../services/produto/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Banner, Beneficios, Faixa, Depoimentos, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  produtos: any[] = [];

  constructor(private router:  Router){}
  ngOnInit(): void {
    this.produtos = JSON.parse(localStorage.getItem('fcustom_produtos') || '[]');
  }

  irPageProduto(produto: any){
    this.router.navigate(['/produto', produto.id])
  }

}
