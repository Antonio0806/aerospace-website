import { Container, Grid } from '@mui/material';
import { StatWidget } from './components/stat-widget/StatWidget';
import { WelcomeWidget } from './components/welcome-widget/WelcomeWidget';
import { PageHeader } from '../../components/page-header/PageHeader';
import { CVA } from '../../components/CVA/CVA';

export const Dashboard = () => {
  return (
    <Container maxWidth={false}>
      <PageHeader title={'Dashboard'} />
      <CVA />
      <Grid container spacing={4}>
        <Grid container item xs={12} md={12} spacing={2}>
          <Grid item xs={12} display={'flex'}>
            <WelcomeWidget
              title={'Welcome'}
              description={'Welcome to aerospace. Learn how to set up your new dev environement here.'}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} md={12} spacing={2}>
          <Grid item md={3} xs={6}>
            <StatWidget title={'Active users'} value={'12 153'} footerText={'Current Month'} />
          </Grid>

          <Grid item md={3} xs={6}>
            <StatWidget title={'Users'} value={'19 539'} footerText={'Current Month'} />
          </Grid>

          <Grid item md={3} xs={6}>
            <StatWidget title={'Sales'} value={'1 521'} footerText={'Current Month'} />
          </Grid>

          <Grid item md={3} xs={6}>
            <StatWidget title={'Posts'} value={'126'} footerText={'Current Month'} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
