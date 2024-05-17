import { UserTypeConstant } from '../constants/UserTypeConstant';

export class DriverModel {
  [key: string]: any;
  public id: number;
  public customer_id: number;
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public address: string;
  public mobile_no: string;
  public email: string;
  public password: string;
  public licence!: File;

  constructor() {
    this.id = 0;
    this.customer_id = 0;
    this.first_name = '';
    this.last_name = '';
    this.full_name = '';
    this.address = '';
    this.mobile_no = '';
    this.email = '';
    this.password = '';
  }
}
