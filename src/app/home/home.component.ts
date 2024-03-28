import { Component,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from '../service/table.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

export interface UserData {
  id: string;
  title: string;
  category: string;
  price: any;
  accion: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'accion'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  optionFilters: any;
  categoryselected:any;
  isloggedin: boolean = false;

  constructor(private servicetable: TableService,private authservice: AuthService,private router: Router, private dialog: MatDialog) {
    this.isloggedin=this.authservice.isloggedin();
    if (this.isloggedin) {
    this.servicetable.getData().subscribe((data) => {
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.servicetable.getAllCategories().subscribe((data) => {
      this.optionFilters = data;
    });
    }
    else
    {
      this.router.navigate(['login']);
    }
  }
  /*
  ngOnInit(): void {
    this.service.getAllCategories().subscribe(data => {
      this.optionFilters = data.map(item => item);
    });
  }*/
  onLogout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  onCategoryChange(category:any) {
    const filterValue = category.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (filterValue.trim().toLowerCase() == 'all') {
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogOpen(code: any) {
    this.OpenDialog(code);
  }

  OpenDialog(code: string) {
    const popup = this.dialog.open(ModalComponent, {
      data: code
    });
    popup.afterClosed().subscribe(res => {
     
    });
  }

}
