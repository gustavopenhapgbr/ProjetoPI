import { Component } from '@angular/core';
import { Beneficios } from '../../component/beneficios/beneficios';
import { Banner } from '../../component/banner/banner';
import { Faixa } from '../../component/faixa/faixa';
import { Depoimentos } from '../../component/depoimentos/depoimentos';

@Component({
  selector: 'app-home',
  imports: [Banner, Beneficios, Faixa, Depoimentos],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
