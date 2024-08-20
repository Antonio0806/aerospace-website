import { Button, Divider, FormControl, Link, Stack, TextField, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../contants/routes';
import { WelcomeContent } from '../../content/welcome-content/WelcomeContent';
import { HalfLayout } from '../../layouts/half-layout/HalfLayout';
import { useState } from 'react';
import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence } from 'firebase/auth';
import { auth } from '../../firebase';
import NotificationBox from '../../components/notification/NotificationBox';
import useNotification from '../../hooks/api/use-notification/useNotification';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { visible, text, showNotification } = useNotification();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRepeatPasswordChange = (event: any) => {
    setRepeatPassword(event.target.value);
  };

  const handleSignup = async () => {
    //handling login logic with Firebase
    if (!email || !password) {
      console.error('Provide Email and Password');
      showNotification('Provide Email and Password', 1500);
      return;
    }
    if (password !== repeatPassword) {
      console.error('The password and repeat passwords are not equal.');
      showNotification('The password and repeat passwords are not equal.', 1500);
      return;
    }
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          const user = userCredential.user;
          console.log(user);
          if (user) {
            //user logged in succesfully i need to add more like login logic to make this shit more secure, for now i will just redirect to the dashboard ;)
            navigate(routes.dashboard);
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errorCode = error.code;
          const errorMessage = error.message;
          showNotification(errorMessage, 1500);
          console.log('errorCode:', errorCode, 'errorMessage:', errorMessage);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode:', errorCode, 'errorMessage:', errorMessage);
      });
  };
  return (
    <HalfLayout>
      <WelcomeContent />
      <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
        <Typography variant={'h3'} component={'h1'}>
          Create account
        </Typography>
        <Typography variant={'body1'}>Fill the form below to register new account</Typography>
        <NotificationBox visible={visible} text={text} />
        <FormControl fullWidth>
          <TextField label={'Email'} fullWidth placeholder={'Email'} onChange={handleEmailChange} />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Password'}
            fullWidth
            placeholder={'Password'}
            type={'password'}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label={'Confirm password'}
            fullWidth
            placeholder={'Password'}
            type={'password'}
            onChange={handleRepeatPasswordChange}
          />
        </FormControl>

        <Button variant={'contained'} fullWidth onClick={handleSignup}>
          Create account
        </Button>
        <Divider sx={{ width: '100%' }} />
        <Typography variant={'body2'}>Or register with</Typography>
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
            Already have an account?{' '}
            <Link
              onClick={() => navigate(routes.login)}
              underline={'hover'}
              component={'button'}
              fontWeight={'fontWeightMedium'}
            >
              Sign in
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
