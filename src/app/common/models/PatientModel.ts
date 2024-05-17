import { UserTypeConstant } from '../constants/UserTypeConstant';

export class PatientModel {
  [key: string]: any;
  public id: number;
  public customer_id: number;
  public type: string;
  public name: string;
  public address: string;
  public telephone: string;
  public mobile: string;
  public city: string;
  public state: string;
  public zip_code: string;
  public contactPerson1_name: string;
  public contactPerson1_phone: string;
  public contactPerson2_name: string;
  public contactPerson2_phone: string;
  public working_hours: string;
  public time_zone: string;
  public special_notes: string;
  public internal_notes: string;
  public company_name: string;

  constructor() {
    this.id = 0;
    this.customer_id = 0;
    this.name = '';
    this.telephone = '';
    this.mobile = '';
    this.city = '';
    this.type = '';
    this.state = '';
    this.zip_code = '';
    this.contactPerson1_name = '';
    this.contactPerson1_phone = '';
    this.contactPerson2_name = '';
    this.contactPerson2_phone = '';
    this.working_hours = '';
    this.special_notes = '';
    this.address = '';
    this.internal_notes = '';
    this.time_zone = '';
    this.company_name = '';
  }
}
