import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../model/produto';
import { GrupoCategoria } from '../../model/grupo-categoria';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  categorias: string[] = ['camisetas', 'calcas', 'shorts', 'conjuntos', 'acessorios'];

  imagens: string[] = [
    '/images/camiseta_1_cinza_claro.png',
    '/images/camiseta_2_cinza_escuro.png',
    '/images/camiseta_3_preta.png',
    '/images/camiseta_4_off_white.png',
    '/images/camiseta_5_azul_petroleo.png',
    '/images/camisa_6_Azulbb.jpg',
    '/images/calca_1_cinza_logo_lateral.png',
    '/images/calca_2_preta_guaxinim_duplo.png',
    '/images/calca_3_preta_grafite.png',
    '/images/calca_4_cinza_guaxinim_roxo.png',
    '/images/calca_5_preta_urban_street.png',
    '/images/calca_6_azulbebe.png',
    '/images/shorts_1_moletom_cinza.png',
    '/images/shorts_2_preto_script_lateral.png',
    '/images/shorts_3_cinza_claro_script.png',
    '/images/shorts_4_preto_cordao_branco.png',
    '/images/shorts_5_preto_logo_lateral.jpg',
    '/images/shorts_6_cinza_cos_preto.png',
    '/images/conjunto_azul.png',
    '/images/conjunto_bege.png',
    '/images/conjunto_cinza.png',
    '/images/conjunto_off-white.png',
    '/images/conjunto_verde.png',
    '/images/conjunto_vinho.png',
    '/images/bolsa.png',
    '/images/bone.png',
    '/images/cordao.png',
    '/images/garrafa.png',
    '/images/gorro.png',
    '/images/isqueiro.png'
  ];

  grupos: GrupoCategoria[] = [];
  produtoEmEdicao: Produto = this.produtoVazio();
  editando: boolean = false;

  constructor(
    public auth: AuthService,
    public produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.montarGrupos();
  }

  sair() {
    this.auth.sair();
    this.router.navigate(['/']);
  }

  montarGrupos() {

    let abertas: string[] = [];
    for (let grupo of this.grupos) {
      if (grupo.aberto) {
        abertas.push(grupo.categoria);
      }
    }

    this.grupos = [];

    for (let categoria of this.categorias) {
      let produtos = this.produtoService.listarPorCategoria(categoria);

      if (produtos.length > 0) {
        let grupo: GrupoCategoria = {
          categoria: categoria,
          quantidade: produtos.length,
          precoMin: produtos[0].preco,
          precoMax: produtos[0].preco,
          emDestaque: '—',
          produtos: produtos,
          aberto: abertas.includes(categoria)
        };

        for (let produto of produtos) {
          if (produto.preco < grupo.precoMin) {
            grupo.precoMin = produto.preco;
          }
          if (produto.preco > grupo.precoMax) {
            grupo.precoMax = produto.preco;
          }
          if (produto.destaque) {
            grupo.emDestaque = produto.nome;
          }
        }

        this.grupos.push(grupo);
      }
    }
  }

  alternarCategoria(grupo: GrupoCategoria) {
    grupo.aberto = !grupo.aberto;
  }

  formatarFaixaPreco(grupo: GrupoCategoria): string {
    let min = this.formatarPreco(grupo.precoMin);
    let max = this.formatarPreco(grupo.precoMax);
    if (grupo.precoMin === grupo.precoMax) {
      return min;
    }
    return min + ' – ' + max;
  }

  formatarPreco(preco: number): string {
    return 'R$ ' + preco.toFixed(2).replace('.', ',');
  }

  produtoVazio(): Produto {
    return {
      id: 0,
      nome: '',
      preco: 0,
      categoria: 'camisetas',
      imagem: '',
      descricao: '',
      destaque: false,
      estoqueP: 0,
      estoqueM: 0,
      estoqueG: 0,
      estoqueGG: 0
    };
  }

  quantidadeValida(quantidade: number): boolean {
    return quantidade >= 0 && quantidade % 1 === 0;
  }

  salvarProduto() {
    let p = this.produtoEmEdicao;

    p.preco = Number(p.preco);
    p.estoqueP = Number(p.estoqueP);
    p.estoqueM = Number(p.estoqueM);
    p.estoqueG = Number(p.estoqueG);
    p.estoqueGG = Number(p.estoqueGG);

    if (p.nome.trim() === '' || p.preco <= 0) {
      alert('Preencha ao menos o nome e um preço válido.');
    } else if (!this.quantidadeValida(p.estoqueP) || !this.quantidadeValida(p.estoqueM) ||
               !this.quantidadeValida(p.estoqueG) || !this.quantidadeValida(p.estoqueGG)) {
      alert('As quantidades de estoque devem ser números inteiros iguais ou maiores que 0.');
    } else if (this.produtoService.totalEstoque(p) === 0) {
      alert('Informe a quantidade em estoque de pelo menos um tamanho.');
    } else {
      if (this.editando) {
        this.produtoService.atualizar(p);
      } else {
        this.produtoService.adicionar(p);
      }
      this.cancelarEdicao();
      this.montarGrupos();
    }
  }

  editarProduto(produto: Produto) {
    this.produtoEmEdicao = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria,
      imagem: produto.imagem,
      descricao: produto.descricao,
      destaque: produto.destaque,
      estoqueP: produto.estoqueP,
      estoqueM: produto.estoqueM,
      estoqueG: produto.estoqueG,
      estoqueGG: produto.estoqueGG
    };
    this.editando = true;
  }

  cancelarEdicao() {
    this.produtoEmEdicao = this.produtoVazio();
    this.editando = false;
  }

  removerProduto(id: number) {
    let confirmou = confirm('Deseja remover este produto?');
    if (confirmou) {
      this.produtoService.remover(id);
      this.montarGrupos();
    }
  }
}