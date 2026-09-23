import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './component/header/header';
import { Nav } from './component/nav/nav';
import { Footer } from './component/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,Nav,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProjetoPI');
}
