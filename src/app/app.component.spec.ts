import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
describe('Aplicación', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports:[AppRoutingModule]
  }));

  it('El componente se instanció correctamente.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`La aplicación tiene como titulo 'angular_adoclic'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular_adoclic');
  });
});
