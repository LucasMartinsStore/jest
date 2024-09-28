import { GeneroLiterario } from './../componentes/livro/livro';
import { Livro } from '../componentes/livro/livro';
import { livros } from '../mock-livros';
import { ErroGeneroLiterario, LivroService } from './livro.service';
describe('LivroService', () => {
  let livroService: LivroService;

  beforeEach(() => {
    livroService = new LivroService();
  });

  it('should be created', () => {
    expect(livroService).toBeTruthy();
  });

  it('should add new book', () => {
    //Preparar

    const newBook: Livro = {
      titulo: 'O Senhor dos Anéis',
      autoria: 'J.R.R. Tolkien',
      imagem:
        'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg',
      genero: { id: 'romance', value: 'Romance' },
      dataLeitura: '2021-06-01',
      classificacao: 5,
    };

    //Agir
    livroService.adicionarLivro(newBook);
    const livrosPorGenero = livroService.obterLivrosPorGenero('romance');

    //Afirmar
    expect(livrosPorGenero).toContain(newBook);
  });

  it('should return correct the books by gender', () => {
    const livrosPorGenero = livroService.obterLivrosPorGenero('romance');
    const livrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'romance'
    );
    expect(livrosPorGenero).toEqual(livrosEsperados);
  });

  it('should iniatilizater genders correct', () => {
    const generosEsperados: GeneroLiterario[] = [
      { id: 'romance', value: 'Romance' },
      { id: 'misterio', value: 'Mistério' },
      { id: 'fantasia', value: 'Fantasia' },
      { id: 'ficcao-cientifica', value: 'Ficção Científica' },
      { id: 'tecnicos', value: 'Técnicos' },
    ];

    expect(livroService.generos).toEqual(generosEsperados);
  });

  it('should error when adding a book with a gender that does not exist', () => {
    const newBook: Livro = {
      titulo: 'O Senhor dos Anéis',
      autoria: 'J.R.R. Tolkien',
      imagem:
        'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg',
      genero: { id: 'nao-existe', value: 'Não Existe' },
      dataLeitura: '2021-06-01',
      classificacao: 5,
    };
    expect(() => livroService.adicionarLivro(newBook)).toThrowError(
      ErroGeneroLiterario
    );
  });
});
