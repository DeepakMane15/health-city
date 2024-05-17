import { UserTypeConstant } from '../constants/UserTypeConstant';
import { Dashboard2CardsModel } from '../models/Dashboard2CardsModel';

export interface Card {
  title: string;
  cols: number;
  rows: number;
  icon: string;
}

export const  Dashboard2CardsConstant: Dashboard2CardsModel[] = [
  {
    role : UserTypeConstant.CUSTOMER,
    cards : [
        {
          title: 'Assignment completed',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-chart-areaspline widget-two-icon',
        },
        {
          title: 'No. of Comp. Enrolled',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-layers widget-two-icon',
        },
        {
          title: 'Job Openings',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-access-point-network widget-two-icon',
        },
        {
          title: 'Payments',
          cols: 1,
          rows: 1,
          icon: 'mdi mdi-account-convert widget-two-icon',
        },
      ]
    },
    {
      role : UserTypeConstant.PROFESSIONAL,
      cards :
        [
          {
            title: 'Employees',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-chart-areaspline widget-two-icon',
          },
          {
            title: 'Customers',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-layers widget-two-icon',
          },
          {
            title: 'Medical Teams',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-access-point-network widget-two-icon',
          },
          {
            title: 'Patients',
            cols: 1,
            rows: 1,
            icon: 'mdi mdi-account-convert widget-two-icon',
          },
        ]
    }
  ]
