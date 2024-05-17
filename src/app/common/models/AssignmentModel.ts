import { UserTypeConstant } from '../constants/UserTypeConstant';

export class AssignmentModel {
  [key: string]: any;
  public customer_id: number;
  public medicalId: any;
  public profession: string;
  public assignment: any;
  public paymentDate: string;
  public cPerson1Name: string;
  public cPerson1Phone: string;
  public cPerson2Name: string;
  public cPerson2Phone: string;
  public date: string;
  public transacti: string;
  public series: string;
  public amount: string;
  public patient: [];
  public visitDate: string;
  public visitTime: string;
  public pNotes: string;
  public prNotes: string;
  public iNotes: string;

  constructor() {
    this.customer_id = 0;
    this.medicalId = [];
    this.profession = '';
    this.assignment = [];
    this.paymentDate = '';
    this.cPerson1Name = '';
    this.cPerson1Phone = '';
    this.cPerson2Name = '';
    this.cPerson2Phone = '';
    this.date = '';
    this.transacti = '';
    this.series = '';
    this.amount = '';
    this.patient = [];
    this.visitDate = '';
    this.visitTime = '';
    this.pNotes = '';
    this.prNotes = '';
    this.iNotes = '';
  }
}
