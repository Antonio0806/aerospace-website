import { Stack, Typography } from '@mui/material';
import { Logo } from '../../components/logo/Logo.tsx';

export const WelcomeContent = () => {
  return (
    <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
      <Logo invertImage />
      <Typography variant={'h3'} component={'h1'}>
        Welcome to aerocloud.xyz
      </Typography>
      <Typography variant={'body1'}>The open-source, highly customizable cloud developement environements</Typography>
    </Stack>
  );
};
