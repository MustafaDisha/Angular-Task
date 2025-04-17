import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/dynamic-component/table-component.component';
import { tableColumnType } from '../../types/columnType';
import { UserService } from './userService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [TableComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  tableData: any[] = [];
  errorMessage: string = '';
  tableColumns: tableColumnType[] = [];
  isLoading = true;
  constructor(private userService: UserService) {
    this.tableColumns = [
      {
        caption: 'post id',
        dataField: 'postId',
        width: 100,
      },
      {
        caption: 'Name',
        dataField: 'name',
      },
      {
        caption: 'Email',
        dataField: 'email',
      },
      {
        caption: 'Body',
        dataField: 'body',
      },
    ];
  }

  ngOnInit(): void {
    this.userService.get().subscribe({
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
