import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-status-pro',
  templateUrl: './transaction-status-pro.component.html',
  styleUrls: ['./transaction-status-pro.component.scss'] // Use styleUrls instead of styleUrl
})

export class TransactionStatusProComponent {
  dataSource = ELEMENT_DATA;
  
  displayedColumns: string[] = ['s.no.', 'Assig. id', 'Tran. id', 'Tran. date', 'Tran. status'];
}
export interface Row {
  sno: number;
  Assignid: number;
  Transid: string;
  date: Date;
  status : string;
}

const ELEMENT_DATA: Row[] = [
  { sno: 1, Assignid:1001, Transid:'qwszt12' , date: new Date(),  status: 'paid' },
  { sno: 2, Assignid:1002,Transid: 'aash2', date: new Date(),  status: 'pending' },
  { sno: 3, Assignid:1009, Transid:'zqcct12' , date: new Date(),  status: 'paid' },
  { sno: 4, Assignid:1029,Transid: 'kugf5', date: new Date(),  status: 'pending' },
  // Add more orders as needed
];