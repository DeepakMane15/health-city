import { DashboardCardsModel } from '../models/DashboardCardsModel';
import { UserTypeConstant } from './UserTypeConstant';

export const DashboardCardsConstant: DashboardCardsModel[] = [
  {
    role: UserTypeConstant.ADMIN,
    cards: {
      setOne: [
        {
          title: 'Total Requests',
          cols: 1,
          rows: 1,
          key: 'count_request',
          icon: 'mdi mdi-form-select',
          url: '/driver',
          subItems: [
            {
              title: 'Open : 1 ',
              color: 'green'
            },
            {
              title: 'Closed : 1',
              color: '#df1717'
            }
          ]
        },
        {
          title: 'Vehicles Count',
          cols: 1,
          rows: 1,
          key: 'count_vehicle',
          url: '',
          icon: 'mdi mdi-car-back',
          subItems: [
            {
              title: 'Parked : 1 ',
              color: 'green'
            },
            {
              title: 'Out : 1',
              color: '#df1717'
            }
          ]
        },
        {
          title: 'Drivers Count',
          cols: 1,
          rows: 1,
          key: 'count_driver',
          icon: 'mdi mdi-account-supervisor',
          subItems: [
            {
              title: 'Ready : 2 ',
              color: 'green'
            },
            {
              title: 'Out : 2',
              color: '#df1717'
            }
          ],
          url: '',
        },
        {
          title: 'Fuel Consumed',
          cols: 1,
          rows: 1,
          key: 'count_fuel',
          icon: 'mdi mdi-gas-station-outline',
          subItems: [],
          url: '',
        },
      ],
      setTwo: [
        {
          title: 'Requests',
          cols: 1,
          rows: 1,
          key: '',
          icon: '',
          subItems: [],
          url: '',
        },
        {
          title: 'Drivers Available',
          cols: 1,
          rows: 1,
          key: '',
          icon: 'circle',
          subItems: [],
          url: '',
        },
      ],
    },
  },
];
