import { CssBaseline, ThemeProvider } from '@mui/material';
import { Dashboard } from './pages/dashboard/Dashboard';
import { TypographyPage } from './docs/pages/typography-page/TypographyPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './contants/routes';
import { ColorsPage } from './docs/pages/colors-page/ColorsPage';
import { UserAccountPage } from './pages/user/user-account-page/UserAccountPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentUser } from './hooks/api/use-current-user/useCurrentUser';
import { Loader } from './components/loader/Loader';
import { ButtonPage } from './docs/pages/button-page/ButtonPage';
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
import ProtectedRoute from './components/protected-route/ProtectedRoute.tsx';
import { AuthProvider } from './hooks/api/use-auth/useAuth.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SidebarLayout>
        <ProtectedRoute />
      </SidebarLayout>
    ),
    errorElement: <NotFoundPage />,
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

  const theme = getThemeByName(themeName, mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Analytics />
        <QueryClientProvider client={queryClient}>
          <>
            <AuthProvider>
              <AppRouter />
              <ThemeConfigurator setThemeName={setThemeName} themeName={themeName} />
            </AuthProvider>
          </>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
