export enum UserRoleConstant {
  ADMIN = 1,
  ACCOUNT = 2,
  REGIONAL_DIRECTOR = 3,
  BRANCH_DIRECTOR = 4,
  TEAM_MANAGER = 5,
  SALES_AGENT = 6,
  OPERATION = 7,
  CARRIER_COMPLIANCE = 8,
}

export const UserTypes = [
  {
    name: 'Admin',
    id: UserRoleConstant.ADMIN,
  },
  {
    name: 'Account',
    id: UserRoleConstant.ACCOUNT,
  },
  {
    name: 'Regional Director',
    id: UserRoleConstant.REGIONAL_DIRECTOR,
  },
  {
    name: 'Branch Director',
    id: UserRoleConstant.BRANCH_DIRECTOR,
  },
  {
    name: 'Team Manager',
    id: UserRoleConstant.TEAM_MANAGER,
  },
  {
    name: 'Sales Agent',
    id: UserRoleConstant.SALES_AGENT,
  },
  {
    name: 'Operation',
    id: UserRoleConstant.OPERATION,
  },
  {
    name: 'Carrier Compliance',
    id: UserRoleConstant.CARRIER_COMPLIANCE,
  },
];
