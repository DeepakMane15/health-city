import { UserTypeConstant } from '../constants/UserTypeConstant';

export interface Card {
  title: string;
  cols: number;
  rows: number;
  icon: string;
}

export class DashboardCardsModel {
  public role: UserTypeConstant | undefined;
  public cards: {
    setOne: Card[];
    setTwo: Card[];
  };

  constructor() {
    this.cards = {
      setOne: [],
      setTwo: [],
    };
  }
}
