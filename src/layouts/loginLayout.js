import ContainerWrapper from '../components/wrappers/ContainerWrapper';
import TypographyWrapper from '../components/wrappers/TypographyWrapper';
import LoginForm from '../components/login/index';
import { CssBaseline } from '@mui/material';
import { PaperLoginFormStyled, AvatarLockedStyled } from '../components/login/styles/loginStyles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginLayout = () => {

  return (
    <ContainerWrapper component="main" maxWidth="xs">
      <CssBaseline/>
      <PaperLoginFormStyled>
        <AvatarLockedStyled>
          <LockOutlinedIcon />
        </AvatarLockedStyled>
        <TypographyWrapper component="h1" variant="h5">
          Log In to Vaccinate System
        </TypographyWrapper>
        <LoginForm/>
      </PaperLoginFormStyled>
    </ContainerWrapper>
  );
}

export default LoginLayout;
