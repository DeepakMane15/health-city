import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
  Card,
  DashboardCardsModel,
} from '../common/models/DashboardCardsModel';
import { DashboardCardsConstant } from '../common/constants/DashboardCardsConstant';
import { UserTypeConstant } from '../common/constants/UserTypeConstant';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { ResponsiveService } from '../shared/services/responsive/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  public cards: Card[] | undefined;
  public cardsSet2: Card[] | undefined;
  columns: Boolean = true;
  public userData: any;

  constructor(
    private responsiveObserver: ResponsiveService,
    private authService: AuthService
  ) {
    this.responsiveObserver.observeResolution().subscribe((columns) => {
      this.columns = columns;
    });
  }
  ngOnInit() {
    this.authService.userData$.subscribe((userData) => {
      this.userData = userData;
      console.log(userData);
    });
    let allCards = DashboardCardsConstant.find(
      (card) => card.role === UserTypeConstant.ADMIN
    )?.cards;
    this.cards = allCards?.setOne;
    this.cardsSet2 = allCards?.setTwo;
  }
}
