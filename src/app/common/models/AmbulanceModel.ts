import { UserTypeConstant } from '../constants/UserTypeConstant';

export class AmbulanceModel {
  [key: string]: any;
  public customer_id: number;
  public assignment: string;
  public date: string;
  public paymentDate: string;
  public transaction: string;
  public amount: string;
  public driver: number;
  public vehicleModel: string;
  public registrationNo: string;
  public cPerson1Name: string;
  public cPerson1Phone: string;
  public cPerson2Name: string;
  public cPerson2Phone: string;
  public pickupAddres: string;
  public pickupDate: string;
  public pickupTime: string;
  public pickupPO: string;
  public pickupU: string;
  public destAddres: string;
  public destDate: string;
  public destTime: string;
  public destPO: string;
  public destPU: string;
  public driverNotes: string;
  public specialNotes: string;

  constructor() {
    this.customer_id = 0;
    this.assignment = '';
    this.paymentDate = '';
    this.cPerson1Name = '';
    this.cPerson1Phone = '';
    this.cPerson2Name = '';
    this.cPerson2Phone = '';
    this.date = '';
    this.amount = '';
    this.pickupAddres = '';
    this.pickupDate = '';
    this.pickupTime = '';
    this.pickupPO = '';
    this.pickupU = '';
    this.destAddres = '';
    this.destDate = '';
    this.destTime = '';
    this.destPO = '';
    this.destPU = '';
    this.driverNotes = '';
    this.specialNotes = '';
    this.transaction = "";
    this.driver = 0;
    this.vehicleModel = '';
    this.registrationNo = '';
  }
}
