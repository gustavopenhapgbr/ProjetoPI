import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Nav } from './shared/nav/nav';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }