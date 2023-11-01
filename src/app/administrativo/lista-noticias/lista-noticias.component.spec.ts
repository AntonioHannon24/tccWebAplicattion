import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNoticiasComponent } from './lista-noticias.component';

describe('ListaNoticiasComponent', () => {
  let component: ListaNoticiasComponent;
  let fixture: ComponentFixture<ListaNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaNoticiasComponent]
    });
    fixture = TestBed.createComponent(ListaNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
