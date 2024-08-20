/* eslint-disable @typescript-eslint/no-explicit-any */
import List from '@mui/material/List';
import { NavigationItem } from './components/navigation-item/NavigationItem';
import { NavigationItemType } from './components/navigation-item/types';
import { routes } from '../../../../contants/routes';
import {
  Abc,
  AccountBoxOutlined,
  ConstructionOutlined,
  DashboardOutlined,
  DesignServicesOutlined,
  Login,
  QuestionMarkOutlined,
  ShapeLineOutlined,
  SystemUpdate,
} from '@mui/icons-material';
import { useMemo } from 'react';
import { useNotifications } from '../../../../hooks/api/use-notifications/useNotifications';

export function Navigation() {
  const { data: notifications } = useNotifications();

  const navigationItems: NavigationItemType[] = useMemo(
    () => [
      {
        header: 'Dashboards',
      },
      {
        path: routes.dashboard,
        label: 'Dashboard',
        icon: (props: any) => <DashboardOutlined {...props} />,
      },
      {
        header: 'Pages',
      },
      {
        label: 'User',
        icon: (props: any) => <AccountBoxOutlined {...props} />,
        description: 'User management',
        items: [
          {
            path: routes.userAccount,
            label: 'Account',
          },
        ],
      },
      {
        label: 'Orders',
        icon: (props: any) => <Abc {...props} />,
        description: 'Order management',
        items: [
          {
            path: routes.ordersList,
            label: 'List',
          },
        ],
      },
      {
        label: 'System',
        icon: (props: any) => <SystemUpdate {...props} />,
        description: 'System pages',
        items: [
          {
            path: routes.notFound,
            label: '(404) Page not found',
            icon: (props: any) => <QuestionMarkOutlined {...props} />,
          },
          {
            path: routes.maintenance,
            label: 'Under construction',
            icon: (props: any) => <ConstructionOutlined {...props} />,
          },
        ],
      },
      {
        label: 'Authentication',
        icon: (props: any) => <Login {...props} />,
        description: 'Authentication pages',
        items: [
          {
            path: routes.login,
            label: 'Login',
          },
          {
            path: routes.register,
            label: 'Register',
          },
          {
            path: routes.resetPassword,
            label: 'Reset password',
          },
          {
            path: routes.verifyCode,
            label: 'Verify code',
          },
        ],
      },
      {
        header: 'Documentation',
      },
      {
        label: 'Theme',
        icon: (props: any) => <DesignServicesOutlined {...props} />,
        items: [
          {
            path: routes.themeTypography,
            label: 'Typography',
          },
          {
            path: routes.themeColors,
            label: 'Colors',
          },
        ],
      },
      {
        label: 'Components',
        icon: (props: any) => <ShapeLineOutlined {...props} />,
        items: [
          {
            path: routes.componentsButton,
            label: 'Button',
          },
        ],
      },
    ],
    [notifications?.notifications?.length],
  );

  const navigationItemsList = navigationItems.map((item) => {
    return <NavigationItem key={Object.values(item).toString()} item={item} />;
  });

  return (
    <List sx={{ width: '100%', maxWidth: 360, padding: 2 }} component='nav' aria-labelledby='nested-list-subheader'>
      {navigationItemsList}
    </List>
  );
}
