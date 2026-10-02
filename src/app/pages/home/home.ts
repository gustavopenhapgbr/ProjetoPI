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

  exemplos: any[] = [
    { id: 'ex1', nome: 'Camiseta Básica', preco: 79.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex2', nome: 'Camiseta Preta', preco: 89.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex3', nome: 'Camiseta Branca', preco: 69.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex4', nome: 'Camiseta Oversized', preco: 99.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex5', nome: 'Camiseta Estampada', preco: 109.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex6', nome: 'Camiseta Polo', preco: 119.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex7', nome: 'Camiseta Regata', preco: 59.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex8', nome: 'Camiseta Manga Longa', preco: 129.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex9', nome: 'Camiseta Premium', preco: 149.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex10', nome: 'Camiseta Regata', preco: 59.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex11', nome: 'Camiseta Manga Longa', preco: 129.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
    { id: 'ex12', nome: 'Camiseta Premium', preco: 149.9, categoria: 'camisetas', imagem: 'camiseta.png', descricao: '' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const doAdmin: any[] = JSON.parse(localStorage.getItem('fcustom_produtos') || '[]');
    const faltam = Math.max(0, 12 - doAdmin.length);
    this.produtos = [...doAdmin, ...this.exemplos.slice(0, faltam)];
  }

  irPageProduto(produto: any) {
    if (String(produto.id).startsWith('ex')) return;
    this.router.navigate(['/produto', produto.id]);
  }
}