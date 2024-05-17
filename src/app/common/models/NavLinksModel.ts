import { UserTypeConstant } from '../constants/UserTypeConstant';

export class NavLinksModel {
  public label: string;
  public roles: UserTypeConstant[];
  public category: string;
  public subItems: NavLinksModel[];
  public icon: string;
  public url: string;

  constructor() {
    this.label = '';
    this.category = '';
    this.roles = [];
    this.subItems = [];
    this.icon = '';
    this.url = '';
  }
}
