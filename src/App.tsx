import { CssBaseline, ThemeProvider } from '@mui/material';
import { Dashboard } from './pages/dashboard/Dashboard';
import { TypographyPage } from './docs/pages/typography-page/TypographyPage';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { routes } from './contants/routes';
import { ColorsPage } from './docs/pages/colors-page/ColorsPage';
import { UserAccountPage } from './pages/user/user-account-page/UserAccountPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentUser } from './hooks/api/use-current-user/useCurrentUser';
import { Loader } from './components/loader/Loader';
import { ButtonPage } from './docs/pages/button-page/ButtonPage';
import { UserProfilePage } from './pages/user/user-profile-page/UserProfilePage';
import { UserListPage } from './pages/user/user-list-page/UserListPage';
import { UserCreatePage } from './pages/user/user-create-page/UserCreatePage';
import Callback from './components/others/Callback.tsx';
import { CalendarPage } from './pages/calendar/Calendar';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { MaintenancePage } from './pages/maintenance/MaintenancePage';
import { OrderList } from './pages/orders/orders-list/OrdersList';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { ResetPassword } from './pages/reset-password/ResetPassword';
import { VerifyCode } from './pages/verify-code/VerifyCode';
import { ThemeConfigurator } from './demo/theme-configurator/ThemeConfigurator';
import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { getThemeByName } from './theme/theme.ts';
import { SidebarLayout } from './layouts/sidebar-layout/SidebarLayout.tsx';
import { UserEditPage } from './pages/user/user-edit-page/UserEditPage.tsx';

import { LogtoProvider, LogtoConfig } from '@logto/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
    ),
    children: [
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
      {
        path: routes.userAccount,
        element: <UserAccountPage />,
      },
      {
        path: routes.userProfile,
        element: <UserProfilePage />,
      },
      {
        path: routes.userList,
        element: <UserListPage />,
      },
      {
        path: routes.userEdit,
        element: <UserEditPage />,
      },
      {
        path: routes.userCreate,
        element: <UserCreatePage />,
      },
      {
        path: routes.themeColors,
        element: <ColorsPage />,
      },
      {
        path: routes.themeTypography,
        element: <TypographyPage />,
      },
      {
        path: routes.componentsButton,
        element: <ButtonPage />,
      },
      {
        path: routes.calendar,
        element: <CalendarPage />,
      },
      {
        path: routes.ordersList,
        element: <OrderList />,
      },
    ],
  },
  {
    path: routes.notFound,
    element: <NotFoundPage />,
  },
  {
    path: routes.maintenance,
    element: <MaintenancePage />,
  },
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.register,
    element: <RegisterPage />,
  },
  {
    path: routes.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: routes.verifyCode,
    element: <VerifyCode />,
  },
  {
    path: routes.callback,
    element: <Callback />,
  },
]);

const queryClient = new QueryClient();

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const AppRouter = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader />;
  }
  if (!user) return null;
  return <RouterProvider router={router} />;
};

export function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [themeName, setThemeName] = useState<'appTheme' | 'shadTheme'>('appTheme');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'dark'));
      },
    }),
    [],
  );
  const config: LogtoConfig = {
    endpoint: 'https://5ujc48.logto.app/',
    appId: 'h3yenuhj1if5hdmnrdvg8',
  };

  const theme = getThemeByName(themeName, mode);

  return (
    <LogtoProvider config={config}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Analytics />
          <QueryClientProvider client={queryClient}>
            <>
              <AppRouter />
              <ThemeConfigurator setThemeName={setThemeName} themeName={themeName} />
            </>
          </QueryClientProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LogtoProvider>
  );
}
