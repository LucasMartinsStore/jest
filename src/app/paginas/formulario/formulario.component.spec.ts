import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LivroService } from '../../services/livro.service';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [LivroService, FormBuilder],
    });

    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(FormularioComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form values void', () => {
    component.ngOnInit();
    expect(component.formulario.value).toEqual({
      titulo: '',
      autoria: '',
      imagem: '',
      genero: '',
      dataLeitura: '',
      classificacao: null,
    });
  });
  it('should add new Book', () => {
    const novoLivro = {
      titulo: 'Novo Livro',
      autoria: 'Autoria Desconhecida',
      imagem: 'http://example.com/cover.jpg',
      genero: 'romance',
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
    const routerSpy = jest.spyOn(component['router'], 'navigate');
    component.formulario.setValue(novoLivro);
    component.adicionarLivro();

    expect(adicionarLivroSpy).toHaveBeenCalledWith({
      ...novoLivro,
      genero: component.generos.find((g) => g.id === novoLivro.genero),
    });

    expect(component.formulario.value).toEqual({
      titulo: null,
      autoria: null,
      imagem: null,
      genero: null,
      dataLeitura: null,
      classificacao: null,
    });

    expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
  });
});
