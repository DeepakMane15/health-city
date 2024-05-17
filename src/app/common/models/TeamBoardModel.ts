import { TeamBoardType } from '../constants/AppEnum';
import { UserRoleConstant } from '../constants/UserRoleConstant';

export class TeamBoardModel {
  [key: string]: any;
  public boardType: TeamBoardType;
  public language: number[];
  public county: number[];
  public profession: number[];
  public service_area: number[];

  constructor() {
    this.boardType = TeamBoardType.TEAM;
    this.language = [];
    this.county = [];
    this.profession = [];
    this.service_area = [];
  }
}
