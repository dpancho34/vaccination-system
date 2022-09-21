import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ButtonWrapper from '../../wrappers/ButtonWrapper';

export const PaperLoginFormStyled = styled( 'div' )(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

export const AvatarLockedStyled = styled( Avatar )(({ theme }) => ({
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
}));

export const LoginFormStyled = styled( 'form' )(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1)
}));

export const ButtonSubmitStyled = styled( ButtonWrapper )(({ theme }) => ({
    margin: theme.spacing(3, 0, 2)
}));