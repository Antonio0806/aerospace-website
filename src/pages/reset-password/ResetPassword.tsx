import { Button, Divider, FormControl, Link, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../contants/routes';
import { WelcomeContent } from '../../content/welcome-content/WelcomeContent';
import { HalfLayout } from '../../layouts/half-layout/HalfLayout';
import { useState } from 'react';
import { sendThePassResetEmail } from '../../firebase';
import consola from 'consola';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const sendTheVerificationEmail = async () => {
    try {
      const result = await sendThePassResetEmail(email);
      consola.log(result);
    } catch (e) {
      consola.error(e);
    }
  };

  return (
    <HalfLayout>
      <WelcomeContent />
      <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
        <Typography variant={'h3'} component={'h1'}>
          Reset password
        </Typography>
        <Typography variant={'body1'}>Enter an email associated with your account.</Typography>
        <FormControl fullWidth>
          <TextField fullWidth placeholder={'Email'} onChange={handleEmailChange} />
        </FormControl>
        <Button variant={'contained'} fullWidth onClick={() => sendTheVerificationEmail}>
          Reset password
        </Button>
        <Divider sx={{ width: '100%' }} />
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
            Already have an account?{' '}
            <Link
              onClick={() => navigate(routes.login)}
              component={'button'}
              underline={'hover'}
              fontWeight={'fontWeightMedium'}
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </HalfLayout>
  );
};
