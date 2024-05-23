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
import { ApiService } from '../shared/services/api/api.service';
import { APIConstant } from '../common/constants/APIConstant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  public cards: Card[] | undefined;
  public cardsSet2: Card[] | undefined;
  public showSpinner: boolean = true;
  public dashboardData!:any;
  public driverData!:any;
  columns: Boolean = true;
  public userData: any;
  public requests: any;

  constructor(
    private responsiveObserver: ResponsiveService,
    private authService: AuthService,
    private _apiService: ApiService,
    private router: Router
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
    this.getDashboardData();
    this.getDriver();
    this.cardsSet2 = allCards?.setTwo;
  }

  getDashboardData() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('type','10');
    this._apiService
        .post(
          APIConstant.SNM_GET,
          fd
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.dashboardData = res.data['counts'][0];
              this.requests = res.data['request']?.splice(0,10);
            } else {
              this.showSpinner = false;
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
          }
        );
  }
  getDriver() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('type','1');
    this._apiService
        .post(
          APIConstant.SNM_GET,
          fd
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.driverData = res.data.splice(0,10);;
            } else {
              this.showSpinner = false;
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
          }
        );
  }
  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
