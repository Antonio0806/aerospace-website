import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useCallback } from 'react';

const leftColumnSx = { maxWidth: '200px', width: '100%' };
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const CheckboxWithForm = ({ control, name, label }: { control: any; name: string; label: string }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <FormControlLabel
          control={<Checkbox onBlur={onBlur} onChange={onChange} checked={value} inputRef={ref} />}
          label={label}
        />
      )}
    />
  );
};

export const AccountSettingsForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, handleSubmit } = useForm({
    defaultValues: {
      enableEmailNotifications: true,
      enableSmsNotifications: false,
      emailPublic: true,
      profilePublic: false,
    },
  });

  const handleSave = useCallback((data: unknown) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Card elevation={2} sx={{ padding: 2 }}>
        <CardContent>
          <Stack direction={'row'} spacing={2}>
            <Stack spacing={2} paddingY={1} sx={leftColumnSx}>
              <Typography fontWeight={'fontWeightMedium'}>Delete account</Typography>
            </Stack>
            <Stack spacing={2}>
              <Button variant={'contained'} color={'error'}>
                Delete account
              </Button>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type={'submit'} variant={'contained'}>
            Save changes
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
