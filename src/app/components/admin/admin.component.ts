import { Component } from '@angular/core';
import { AdminService } from './adminService.service';
import { TableComponent } from '../../shared/dynamic-component/table-component.component';
import { tableColumnType } from '../../types/columnType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  tableData: any[] = [];
  errorMessage: string = '';
  tableColumns: tableColumnType[] = [];
  isLoading = true;
  constructor(private adminService: AdminService) {
    this.tableColumns = [
      {
        caption: 'user id',
        width: 100,
        dataField: 'userId',
      },
      {
        caption: 'Title',
        dataField: 'title',
      },
      {
        caption: 'Body',
        dataField: 'body',
      },
    ];
  }

  ngOnInit(): void {
    this.adminService.get().subscribe({
      next: (data: any) => {
        this.tableData = data;
        this.isLoading = false;
        console.log(data);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error fetching user data:', err);
        this.errorMessage = 'An error occurred while fetching data.';
      },
    });
  }
}
