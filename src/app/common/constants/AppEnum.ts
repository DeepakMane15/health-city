export enum TeamBoardType {
  TEAM = 'team',
  PROFMED = 'profmed',
}

export enum FileType {
  PHOTO = 'photo',
  LICENCE = 'licence',
  RESUME = 'resume',
}

export enum StatusCode {
  NOT_FOUND = 404,
  EXPIRED = 402,
  OK = 200,
}

export enum AssignmentStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  DFD = 'dfd',
  COMPLETED = 'completed',
}

export enum ADD_POPUP_COMPONENT {
  PATIENT = 1,
  FLEET = 2,
}

export enum DELETE_TYPE {
  MEDICAL = 1,
  PATIENT = 2,
  ASSIGNMENT = 3,
  DRIVER = 4,
  AMBULANCE = 5,
  LIVING = 6,
  JOB_PORTAL = 7,
}
