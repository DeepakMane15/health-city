import { UserTypeConstant } from '../constants/UserTypeConstant';

export class CustomerModel {
  [key: string]: any;
  public customer_id: number;
  public username: string;
  public category: string;
  public password: string;
  public company_name: string;
  public federal_no: string;
  public physical_address: string;
  public mailing_address: string;
  public company_email: string;
  public phone: string;
  public fax: string;
  public website: string;
  public timezone: string;
  public contact_name: string;
  public position: string;
  public contact_phone: string;
  public contact_email: string;
  public credit_limit: string;
  public payment_method: string;
  public payment_days: string;
  public payment_terms: string;
  public notes: string;
  public company_id: string;
  public user_type!: UserTypeConstant;

  constructor() {
    this.customer_id = 0;
    this.username = '';
    this.category = '';
    this.password = '';
    this.company_name = '';
    this.federal_no = '';
    this.physical_address = '';
    this.mailing_address = '';
    this.company_email = '';
    this.phone = '';
    this.fax = '';
    this.website = '';
    this.timezone = '';
    this.contact_name = '';
    this.position = '';
    this.contact_phone = '';
    this.contact_email = '';
    this.credit_limit = '';
    this.payment_method = '';
    this.payment_days = '';
    this.payment_terms = '';
    this.notes = '';
    this.company_id = '';
  }
}
