import { UserTypeConstant } from '../constants/UserTypeConstant';

export class MedicalTeamModel {
  [key: string]: any;
  public pid!: number;
  public customer_id: number;
  public first_name: string;
  public last_name: string;
  public describe: string;
  public approved: string;
  public request_exists: string;
  public payment: string;
  public is_active: string;
  public email: string;
  public photo!: File;
  public avatar!: string;
  public profession: any;
  public profession_name: string;
  public ethnicity: any;
  public languages: any;
  public county: any;
  public service_area: any;
  public phone: string;
  public address: string;
  public internal_notes: string;

  constructor() {
    this.customer_id = 0;
    this.first_name = '';
    this.last_name = '';
    this.describe = '';
    this.approved = '';
    this.request_exists = '';
    this.payment = '';
    this.is_active = '';
    this.email = '';
    this.profession = '';
    this.profession_name = '';
    this.ethnicity = '';
    this.avatar = '';
    this.languages = '';
    this.county = '';
    this.service_area = '';
    this.phone = '';
    this.address = '';
    this.internal_notes = '';
  }
}
