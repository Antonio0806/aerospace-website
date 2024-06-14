import Grid from '@mui/material/Grid/Grid';
import { CVAWidgetContainer, CVAWidgetContent } from './styled';

export const CVA = () => {
  return (
    <>
      <Grid container item xs={12} md={12} spacing={2}>
        <Grid item xs={12} display={'flex'}>
          <CVAWidgetContainer>
            <CVAWidgetContent>
              THIS APPLICATION IS IN HEAVY BETA BRUV, A LOT OF STUFF WILL NOT WORK SO PLS JUST WAIT IT IS A ONE PERSON
              PROJECT
            </CVAWidgetContent>
          </CVAWidgetContainer>
        </Grid>
      </Grid>
    </>
  );
};
