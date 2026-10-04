import { Component } from '@angular/core';

@Component({
  selector: 'app-depoimentos',
  imports: [],
  templateUrl: './depoimentos.html',
  styleUrl: './depoimentos.css',
})
export class Depoimentos {

  avaliacoes = [

    { nome: 'Victor Ferreira', estrelas: '★★★★★', texto: 'Melhor compra que ja fiz, melhorou muito o meu estilo e aumentou minha confiança.' },
    { nome: 'Gustavo Penha', estrelas: '★★★★★', texto: '  O tecido é muito bom e sem duvidas o caimento das roupas também.' },
    { nome: 'Kauã Carreiro', estrelas: '★★★★★', texto: 'Comprei a calça azule não me arrependi, além do tecido ser muito bom não gruda bolinhas .' },
    { nome: 'Vinicius Neri', estrelas: '★★★★★', texto: 'O tecido é muito bom e a cor é exatamente como eu imaginava. Além das estampas serem as mais brabas.' }
  ];

}
