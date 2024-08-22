import { Button, Divider, FormControl, Link, Stack, TextField, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../contants/routes';
import { WelcomeContent } from '../../content/welcome-content/WelcomeContent';
import { HalfLayout } from '../../layouts/half-layout/HalfLayout';
import { useState } from 'react';
import useNotification from '../../hooks/api/use-notification/useNotification';
import NotificationBox from '../../components/notification/NotificationBox';
import useAuth from '../../hooks/api/use-auth/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { visible, text, showNotification } = useNotification();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      console.error('Provide Email and Password');
      showNotification('Provide Email and Password', 1500);
      return;
    }

    auth
      .login(email, password)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_userCredential) => {
        if (auth.user) {
          console.log('user email stored in auth context: ' + auth.user.email);
          navigate('/');
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.log(error);
        //showNotification(error, 1500);
      });
  };
  return (
    <HalfLayout>
      <WelcomeContent />
      <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
        <Typography variant={'h3'} component={'h1'}>
          Hello,
        </Typography>
        <Typography variant={'body1'}>Enter your credentials below</Typography>
        <NotificationBox visible={visible} text={text} />
        <FormControl fullWidth>
          <TextField fullWidth placeholder={'Email'} onChange={handleEmailChange} />
        </FormControl>
        <FormControl fullWidth>
          <TextField fullWidth placeholder={'Password'} type={'password'} onChange={handlePasswordChange} />
        </FormControl>

        <Button variant={'contained'} fullWidth onClick={() => handleLogin()}>
          Login
        </Button>
        <Divider sx={{ width: '100%' }} />
        <Typography variant={'body2'}>Or login with</Typography>
        <Stack direction={'row'} spacing={1}>
          <Button variant={'outlined'} startIcon={<GitHub />}>
            GitHub
          </Button>
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant={'body2'}
            sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
          >
            Don't have an account?{' '}
            <Link
              onClick={() => navigate(routes.register)}
              underline={'hover'}
              component={'button'}
              fontWeight={'fontWeightMedium'}
            >
              Sign up
            </Link>
          </Typography>
          <Typography
            variant={'body2'}
            sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
          >
            Forgot password?{' '}
            <Link
              onClick={() => navigate(routes.resetPassword)}
              component={'button'}
              underline={'hover'}
              fontWeight={'fontWeightMedium'}
            >
              Reset password
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </HalfLayout>
  );
};
