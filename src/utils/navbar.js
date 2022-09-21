import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import BoxWrapper from '../components/wrappers/BoxWrapper';
import Toolbar from '@mui/material/Toolbar';
import ButtonWrapper from '../components/wrappers/ButtonWrapper';
import { AuthContext } from '../contexts/authContext'

const Navbar = () => {
  const [dispatch, state] = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    })
  }

  return (
    <AppBar component="nav">
      <Toolbar>
        <BoxWrapper sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          <ButtonWrapper sx={{ color: '#fff' }}>
            Dashboard
          </ButtonWrapper>
        </BoxWrapper>
        <ButtonWrapper color="inherit" onClick={handleLogout}>Logout</ButtonWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;