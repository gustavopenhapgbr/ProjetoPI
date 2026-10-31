import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  produtos: Produto[] = [
    { id: 1, nome: 'Camiseta Cinza Clara', preco: 89.9, categoria: 'camisetas', imagem: '/images/camiseta_1_cinza_claro.png', descricao: 'Camiseta básica cinza clara.', destaque: true, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 2, nome: 'Camiseta Cinza Escura', preco: 89.9, categoria: 'camisetas', imagem: '/images/camiseta_2_cinza_escuro.png', descricao: 'Camiseta cinza escura.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 3, nome: 'Camiseta Preta', preco: 89.9, categoria: 'camisetas', imagem: '/images/camiseta_3_preta.png', descricao: 'Camiseta preta.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 4, nome: 'Camiseta Off-White', preco: 89.9, categoria: 'camisetas', imagem: '/images/camiseta_4_off_white.png', descricao: 'Camiseta off-white.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 5, nome: 'Camiseta Azul Petróleo', preco: 89.9, categoria: 'camisetas', imagem: '/images/camiseta_5_azul_petroleo.png', descricao: 'Camiseta azul petróleo.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 6, nome: 'Calça Cinza Logo Lateral', preco: 159.9, categoria: 'calcas', imagem: '/images/calca_1_cinza_logo_lateral.png', descricao: 'Calça cinza com logo lateral.', destaque: true, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 7, nome: 'Calça Preta Guaxinim Duplo', preco: 159.9, categoria: 'calcas', imagem: '/images/calca_2_preta_guaxinim_duplo.png', descricao: 'Calça preta com estampa dupla de guaxinim.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 8, nome: 'Calça Preta Grafite', preco: 159.9, categoria: 'calcas', imagem: '/images/calca_3_preta_grafite.png', descricao: 'Calça preta grafite.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 9, nome: 'Calça Cinza Guaxinim Roxo', preco: 159.9, categoria: 'calcas', imagem: '/images/calca_4_cinza_guaxinim_roxo.png', descricao: 'Calça cinza com guaxinim roxo.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 10, nome: 'Calça Preta Urban Street', preco: 159.9, categoria: 'calcas', imagem: '/images/calca_5_preta_urban_street.png', descricao: 'Calça preta Urban Street.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 11, nome: 'Shorts Moletom Cinza', preco: 99.9, categoria: 'shorts', imagem: '/images/shorts_1_moletom_cinza.png', descricao: 'Shorts de moletom cinza.', destaque: true, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 12, nome: 'Shorts Preto Script Lateral', preco: 99.9, categoria: 'shorts', imagem: '/images/shorts_2_preto_script_lateral.png', descricao: 'Shorts preto com escrita lateral.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 13, nome: 'Shorts Cinza Claro Script', preco: 99.9, categoria: 'shorts', imagem: '/images/shorts_3_cinza_claro_script.png', descricao: 'Shorts cinza claro com escrita.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 14, nome: 'Shorts Preto Cordão Branco', preco: 99.9, categoria: 'shorts', imagem: '/images/shorts_4_preto_cordao_branco.png', descricao: 'Shorts preto com cordão branco.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 15, nome: 'Shorts Preto Logo Lateral', preco: 99.9, categoria: 'shorts', imagem: '/images/shorts_5_preto_logo_lateral.jpg', descricao: 'Shorts preto com logo lateral.', destaque: false, estoqueP: 5, estoqueM: 5, estoqueG: 5, estoqueGG: 5 },
    { id: 16, nome: 'Conjunto Azul', preco: 249.9, categoria: 'conjuntos', imagem: '/images/conjunto_azul.png', descricao: 'Conjunto azul.', destaque: true, estoqueP: 3, estoqueM: 3, estoqueG: 3, estoqueGG: 3 },
    { id: 17, nome: 'Conjunto Bege', preco: 249.9, categoria: 'conjuntos', imagem: '/images/conjunto_bege.png', descricao: 'Conjunto bege.', destaque: false, estoqueP: 3, estoqueM: 3, estoqueG: 3, estoqueGG: 3 },
    { id: 18, nome: 'Conjunto Cinza', preco: 249.9, categoria: 'conjuntos', imagem: '/images/conjunto_cinza.png', descricao: 'Conjunto cinza.', destaque: false, estoqueP: 3, estoqueM: 3, estoqueG: 3, estoqueGG: 3 },
    { id: 19, nome: 'Conjunto Off-White', preco: 249.9, categoria: 'conjuntos', imagem: '/images/conjunto_off-white.png', descricao: 'Conjunto off-white.', destaque: false, estoqueP: 3, estoqueM: 3, estoqueG: 3, estoqueGG: 3 },
    { id: 20, nome: 'Conjunto Verde', preco: 249.9, categoria: 'conjuntos', imagem: '/images/conjunto_verde.png', descricao: 'Conjunto verde.', destaque: false, estoqueP: 3, estoqueM: 3, estoqueG: 3, estoqueGG: 3 },
    { id: 21, nome: 'Bolsa', preco: 129.9, categoria: 'acessorios', imagem: '/images/bolsa.png', descricao: 'Bolsa F.Company.', destaque: true, estoqueP: 0, estoqueM: 10, estoqueG: 0, estoqueGG: 0 },
    { id: 22, nome: 'Boné', preco: 79.9, categoria: 'acessorios', imagem: '/images/bone.png', descricao: 'Boné F.Company.', destaque: false, estoqueP: 0, estoqueM: 10, estoqueG: 0, estoqueGG: 0 },
    { id: 23, nome: 'Cordão', preco: 59.9, categoria: 'acessorios', imagem: '/images/cordao.png', descricao: 'Cordão F.Company.', destaque: false, estoqueP: 0, estoqueM: 10, estoqueG: 0, estoqueGG: 0 },
    { id: 24, nome: 'Garrafa', preco: 49.9, categoria: 'acessorios', imagem: '/images/garrafa.png', descricao: 'Garrafa F.Company.', destaque: false, estoqueP: 0, estoqueM: 10, estoqueG: 0, estoqueGG: 0 },
    { id: 25, nome: 'Gorro', preco: 69.9, categoria: 'acessorios', imagem: '/images/gorro.png', descricao: 'Gorro F.Company.', destaque: false, estoqueP: 0, estoqueM: 10, estoqueG: 0, estoqueGG: 0 },
  ];

  proximoId: number = 26;
  idSelecionado: number = 0;
  termoPesquisa: string = '';
  resultadosPesquisa: Produto[] = [];

  listar(): Produto[] {
    return this.produtos;
  }

  listarPorCategoria(categoria: string): Produto[] {
    let resultado: Produto[] = [];
    for (let produto of this.produtos) {
      if (produto.categoria === categoria) {
        resultado.push(produto);
      }
    }
    return resultado;
  }

  buscarPorId(id: number): Produto | undefined {
    for (let produto of this.produtos) {
      if (produto.id === id) {
        return produto;
      }
    }
    return undefined;
  }

  buscar(termo: string): Produto[] {
    let resultado: Produto[] = [];
    let busca = termo.trim().toLowerCase();
    if (busca === '') {
      return resultado;
    }
    for (let produto of this.produtos) {
      if (produto.nome.toLowerCase().includes(busca)) {
        resultado.push(produto);
      }
    }
    return resultado;
  }

  pesquisar(termo: string) {
    this.termoPesquisa = termo;
    this.resultadosPesquisa = this.buscar(termo);
  }

  adicionar(produto: Produto) {
    produto.id = this.proximoId;
    this.proximoId++;
    this.produtos.push(produto);
    this.ajustarDestaque(produto);
  }

  atualizar(produtoAtualizado: Produto) {
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id === produtoAtualizado.id) {
        this.produtos[i] = produtoAtualizado;
      }
    }
    this.ajustarDestaque(produtoAtualizado);
  }

  remover(id: number) {
    let listaNova: Produto[] = [];
    for (let produto of this.produtos) {
      if (produto.id !== id) {
        listaNova.push(produto);
      }
    }
    this.produtos = listaNova;
  }

  estoqueDoTamanho(produto: Produto, tamanho: string): number {
    switch (tamanho) {
      case 'P': return produto.estoqueP;
      case 'M': return produto.estoqueM;
      case 'G': return produto.estoqueG;
      case 'GG': return produto.estoqueGG;
      default: return 0;
    }
  }

  baixarEstoque(produto: Produto, tamanho: string, quantidade: number) {
    switch (tamanho) {
      case 'P': produto.estoqueP -= quantidade; break;
      case 'M': produto.estoqueM -= quantidade; break;
      case 'G': produto.estoqueG -= quantidade; break;
      case 'GG': produto.estoqueGG -= quantidade; break;
    }
  }

  totalEstoque(produto: Produto): number {
    return produto.estoqueP + produto.estoqueM + produto.estoqueG + produto.estoqueGG;
  }

  private ajustarDestaque(produto: Produto) {
    if (produto.destaque) {
      for (let outro of this.produtos) {
        if (outro.categoria === produto.categoria && outro.id !== produto.id) {
          outro.destaque = false;
        }
      }
    }
  }
}