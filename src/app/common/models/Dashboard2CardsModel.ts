//dashboadr2cards.model.ts//
import { UserTypeConstant } from '../constants/UserTypeConstant';

export interface Card {
  title: string;
  cols: number;
  rows: number;
  icon: string;
}

export class Dashboard2CardsModel {
  public role!: UserTypeConstant;
  public cards: Card[];

  constructor() {
    this.cards = [];
  }
}
