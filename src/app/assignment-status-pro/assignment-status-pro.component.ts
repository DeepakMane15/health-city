import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment-status-pro',
  templateUrl: './assignment-status-pro.component.html',
  styleUrl: './assignment-status-pro.component.scss'
})
export class AssignmentStatusProComponent {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['sr-no', 'assig-id', 'date', 'status'];
}
export interface Row {
  sno: number;
  assignId: number;
  date: Date;
  status : string;
}

const ELEMENT_DATA: Row[] = [
  { sno: 1, assignId:1001, date: new Date(),  status: 'paid' },
  { sno: 2, assignId:1002, date: new Date(),  status: 'pending' },
  { sno: 3, assignId:1009, date: new Date(),  status: 'paid' },
  { sno: 4, assignId:1029, date: new Date(),  status: 'pending' },
  // Add more orders as needed
];

