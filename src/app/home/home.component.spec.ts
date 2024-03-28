import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';

describe('List Product', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports:[MatTableModule,HttpClientModule,MatDialogModule]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente se instanció correctamente.', () => {
    expect(component).toBeTruthy();
  });
});
