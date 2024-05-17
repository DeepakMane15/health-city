export enum APIConstant {
  LOGIN = '/login',
  IS_USERNAME_AVAILABLE = 'is-username-available',
  RESET_PASSWORD = 'medical/reset-password',
  UPLOAD_PROFILE_PICTURE = 'medical/update-picture',
  COMMON_DELETE = 'common-delete',
  // customers
  GET_CUSTOMERS = 'customers',
  ADD_CUSTOMER = 'customer/add',
  DELETE_CUSTOMER = 'customer/delete',
  EDIT_CUSTOMER = 'customer/edit',
  GET_TIMEZONE = 'timezones',
  GET_CATEGORY = "customer/get-category-data",
  // medical-teams
  GET_MEDICALTEAMS = 'medical-teams',
  ADD_MEDICALTEAM = 'medical-team/add',
  DELETE_MEDICALTEAM = 'medical-team/delete',
  EDIT_MEDICALTEAM = 'medical-team/edit',
  APPROVE_MEDICALTEAM = 'medical-team/approve',
  GET_MEDICAL_FIELD_DATA = 'getProfessionalFieldData',
  GET_MEDICALTEAM_BY_ID = 'medical/get-medical-team-by-id',
  SEND_INVITATION = 'medical/invite-medical-team',
  VERIFY_INVITATION = 'medical-team/verify-token',
  ACCEPT_INVITATION = 'medical/change-invitation-status',

  // users
  GET_USERS = 'users',
  ADD_USER = 'user/add',
  EDIT_USER = 'user/edit',
  DELETE_USER = 'user/delete',

  // team-board
  FILTER_MEDICAL_TEAM = 'medical/filter-medical-team',
  SAVE_PAYMENT = 'medical/save-payment',

  // patients
  GET_PATIENTS = 'medical/get-patients',
  GET_PATIENT_BY_ID = 'medical/get-patient-by-id',
  ADD_PATIENT = 'patient/add',
  EDIT_PATIENT = 'patient/edit',

  // Assignment
  GET_ASSIGNMENT_INITIAL_DATA = 'assignment/get-initial-data',
  ADD_ASSIGNMENT = 'assignment/add',
  EDIT_ASSIGNMENT = 'assignment/edit',
  GET_ASSIGNMENTS = 'assignment/get',

  // MedTrans
  ADD_MEDTRANS = 'medtrans/add',
  EDIT_MEDTRANS = 'medtrans/edit',
  GET_MEDTRANS = 'medtrans/get',
  GET_MEDTRANS_BY_ID = 'medtrans/get-by-id',

  // Driver
  ADD_DRIVER = 'driver/add',
  EDIT_DRIVER = 'driver/edit',
  GET_DRIVERS = 'snm-get',
  GET_DRIVER_BY_ID = 'driver/get-by-id',

  // Job Portal
  ADD_JOB_PORTAL = 'job-portal/add',
  EDIT_JOB_PORTAL = 'job-portal/edit',
  GET_JOB_PORTAL = 'job-portal/get',
  GET_JOB_PORTAL_BY_ID = 'job-portal/get-by-id',
  APPLY_JOB_OPENING = 'job-portal/apply',


  // chat

  GET_PARTICIPANTS = 'medical/getParticipants',

  // living
  GET_ROOMS_MASTER = 'living/get-rooms-master',
  GET_LIVINGS = 'living/get',
  ADD_LIVING = 'living/addLiving',
  EDIT_LIVING = 'living/editLiving',
  SEARCH_LIVING = 'living/search',
  GET_LIVING_BY_ID = 'living/get-by-id',
  GET_ROOM_AMENITY = 'living/get-room-amenity',
  BOOK_LIVING = 'living/book',



  GET_VEHICLE = 'snm-get',
  SNM_GET = 'snm-get',

  // SNM
}
