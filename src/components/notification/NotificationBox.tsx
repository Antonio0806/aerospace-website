import Box from '@mui/material/Box/Box';

interface Props {
  visible: boolean;
  text: string;
}

export default function NotificationBox({ visible, text }: Props): JSX.Element {
  if (!visible) {
    return <></>;
  }

  return (
    <>
      <Box
        sx={{
          borderRadius: 1,
          bgcolor: 'error.main',
          '&:hover': {
            bgcolor: 'error.dark',
          },
        }}
      >
        <div className='notification' style={{ margin: '10px' }}>
          {text}
        </div>
      </Box>
    </>
  );
}
