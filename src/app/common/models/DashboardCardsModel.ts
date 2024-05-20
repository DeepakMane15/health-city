import { UserTypeConstant } from '../constants/UserTypeConstant';

export interface Card {
  title: string;
  cols: number;
  rows: number;
  key: string;
  icon: string;
  url: string;
  subItems: CardSubItem[];
}

export interface CardSubItem {
  title: string;
  color: string;
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
