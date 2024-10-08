import { Box, Container, Tab, TabProps, Tabs } from '@mui/material';
import { PageHeader } from '../../../components/page-header/PageHeader';
import React from 'react';
import { Person, Settings } from '@mui/icons-material';
import { AccountSettingsForm } from '../components/account-settings-form/AccountSettingsForm';
import { UserForm } from '../components/user-form/UserForm';
import { Loader } from '../../../components/loader/Loader';
import useAuth from '../../../hooks/api/use-auth/useAuth';
import { UserFormDefaultValues } from '../components/user-form/types/userFormDefaultValues';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box marginTop={4}>{children}</Box>}
    </div>
  );
}

export const UserAccountPage = () => {
  const [value, setValue] = React.useState(0);
  const auth = useAuth();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabProps: TabProps = {
    sx: { minHeight: 42, textTransform: 'capitalize' },
    iconPosition: 'start',
  };
  const defaultValues: UserFormDefaultValues = auth.user
    ? {
        email: auth.user.email || 'N/A',
        phone: auth.user.phoneNumber || 'N/A',
        username: auth.user.displayName || 'N/A',
        image: auth.user.photoURL || 'https://i.imgur.com/P8nOheS.png',
      }
    : undefined;

  if (auth.loading || !auth.user) return <Loader />;
  return (
    <Container maxWidth='lg'>
      <PageHeader title={'User account'} breadcrumbs={['User', 'Account']} />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab {...tabProps} icon={<Person />} label='General' {...a11yProps(0)} />
            <Tab {...tabProps} icon={<Settings />} label='Settings' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserForm defaultValues={defaultValues} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AccountSettingsForm />
        </TabPanel>
      </Box>
    </Container>
  );
};
