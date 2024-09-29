import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe('AvaliacaoEstrelasComponent', () => {
  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelasComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    });
    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.readOnly = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attribute one value clasification where method writeValue is called', () => {
    const classificacao = 3;
    component.writeValue(classificacao);
    expect(component.classificacao).toBe(classificacao);
  });

  it('should called o onchange method when method classificar is called', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const classficacao = 4;
    component.classificar(classficacao);
    expect(onChangeSpy).toHaveBeenCalledWith(classficacao);
  });

  it('should called o onTouched method when method classificar is called', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    const classificacao = 4;
    component.classificar(classificacao);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should not refresh classificacao when readOnly is true', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const classficacao = 4;
    component.readOnly = true;
    component.classificar(classficacao);
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(component.classificacao).not.toBe(classficacao);
  });

  it('should ignore values invalids and attribute value 1 at classificacao', () => {
    const valuesInvalids = [0, -1, 'abc', undefined];
    valuesInvalids.forEach((value) => {
      component.writeValue(value as any);
      expect(component.classificacao).toBe(1);
    });
  });

  it('should refresh DOM when classificacao is changed', () => {
    const classificacao = 3;
    component.classificar(classificacao);
    const starFilled = fixture.nativeElement.querySelector('.filled');
    expect(starFilled).toBeTruthy();
  });
});
