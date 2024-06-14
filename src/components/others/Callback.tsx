import { useHandleSignInCallback } from '@logto/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../contants/routes';

const Callback = () => {
  const navigate = useNavigate();
  const { isLoading } = useHandleSignInCallback(() => {
    navigate(routes.dashboard);
  });

  // When it's working in progress
  if (isLoading) {
    return (
      <div>
        Redirecting... If you are not redirected automatically, press here:{' '}
        <button onClick={() => navigate(routes.dashboard)}>click</button>
      </div>
    );
  }
};
export default Callback;
