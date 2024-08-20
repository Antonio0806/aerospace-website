const themePrefix = '/theme';
const userPrefix = '/user';
const componentPrefix = `${themePrefix}/component`;
const orderPrefix = '/order';

export const routes = {
  dashboard: '/',
  callback: '/callback',
  user: userPrefix,
  userAccount: `${userPrefix}/account`,
  themeTypography: `${themePrefix}/typography`,
  themeColors: `${themePrefix}/colors`,
  componentsButton: `${componentPrefix}/button`,
  notFound: '/404',
  maintenance: '/maintenance',
  ordersList: `${orderPrefix}/list`,
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  verifyCode: '/verify-code',
};
