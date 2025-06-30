import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadCharactersPage } from './load-characters.page';

describe('LoadCharactersPage', () => {
  let component: LoadCharactersPage;
  let fixture: ComponentFixture<LoadCharactersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCharactersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
