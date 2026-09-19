import { Component } from '@angular/core';

@Component({
  selector: 'app-depoimentos',
  imports: [],
  templateUrl: './depoimentos.html',
  styleUrl: './depoimentos.css',
})
export class Depoimentos {

  avaliacoes = [

    { nome: 'Gustavo Penha', estrelas: '★★★★★', texto: 'O tecido é muito bom e a cor é exatamente como eu imaginava. Fiz com estampa na frente e ficou nas costas também.' },
    { nome: 'Gustavo Penha', estrelas: '★★★★★', texto: 'O tecido é muito bom e a cor é exatamente como eu imaginava. Fiz com estampa na frente e ficou nas costas também.' },
    { nome: 'Gustavo Penha', estrelas: '★★★★★', texto: 'O tecido é muito bom e a cor é exatamente como eu imaginava. Fiz com estampa na frente e ficou nas costas também.' },
    { nome: 'Gustavo Penha', estrelas: '★★★★★', texto: 'O tecido é muito bom e a cor é exatamente como eu imaginava. Fiz com estampa na frente e ficou nas costas também.' }
  ];

}
