import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Produto } from '../../services/produto/produto';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  produto = input.required<Produto>();
}