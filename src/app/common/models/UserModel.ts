import { UserRoleConstant } from '../constants/UserRoleConstant';

export class UserModel {
  [key: string]: any;
  public user_id: number;
  public username: string;
  public password: string;
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public force_password_change!: Boolean | undefined;
  public user_role!: UserRoleConstant;

  constructor() {
    this.user_id = 0;
    this.username = '';
    this.password = '';
    this.first_name = '';
    this.middle_name = '';
    this.last_name = '';
    this.force_password_change = true;
  }
}
