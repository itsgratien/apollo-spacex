import React from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'react-emotion';
import { isLoggedInVar } from '../cache';
import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

const LogoutButton: React.FC<any> = () => {
  const client = useApolloClient();

  const handleLogout = () => {
    client.cache.evict({ fieldName: 'me' });

    client.cache.gc();

    localStorage.removeItem('token');

    localStorage.removeItem('userId');

    isLoggedInVar(false);
  };

  return (
    <StyledButton data-testid='logout-button' onClick={handleLogout}>
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});

export default LogoutButton;
