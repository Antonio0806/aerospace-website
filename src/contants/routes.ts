const themePrefix = '/theme';
const userPrefix = '/user';
const componentPrefix = `${themePrefix}/component`;
const orderPrefix = '/order';

export const routes = {
  dashboard: '/',
  callback: '/callback',
  user: userPrefix,
  userAccount: `${userPrefix}/account`,
  userProfile: `${userPrefix}/profile`,
  userList: `${userPrefix}/list`,
  userCreate: `${userPrefix}/create`,
  userEdit: `${userPrefix}/edit`,
  themeTypography: `${themePrefix}/typography`,
  themeColors: `${themePrefix}/colors`,
  componentsButton: `${componentPrefix}/button`,
  calendar: `/calendar`,
  notFound: '/404',
  maintenance: '/maintenance',
  ordersList: `${orderPrefix}/list`,
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  verifyCode: '/verify-code',
};
