import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { tableColumnType } from '../../types/columnType';

@Component({
  selector: 'table-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss',
})
export class TableComponent {
  @Input() columns: tableColumnType[] = [];
  @Input() data: any[] = [];
}
