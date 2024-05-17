import { UserTypeConstant } from '../constants/UserTypeConstant';

export class TeamBoardMapDataModel {
  public pid!: number;
  public name!: string;
  public customer_id!: number;
  public address!: string;
  public profession!: string;
  public languages!: string;
  public photo!: string;
  public request_exists!: string;
  public latLng!: number[];

  constructor() {
    this.customer_id = 0;
    this.pid = 0;
    this.name = '';
    this.address = '';
    this.profession = '';
    this.languages = '';
    this.profession = '';
    this.photo = '';
    this.request_exists = '';
    this.latLng = [0,0]
  }
}
