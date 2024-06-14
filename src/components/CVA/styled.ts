import { Box, styled } from '@mui/material';

export const CVAWidgetContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 6),
  minHeight: '50px',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '10px',
}));

export const CVAWidgetContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  boxShadow: 'inner',
  zIndex: 2,
  textDecorationColor: theme.palette.primary.contrastText,
}));
