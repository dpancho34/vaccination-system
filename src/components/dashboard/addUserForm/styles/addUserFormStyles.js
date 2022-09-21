import { styled } from '@mui/material/styles';
import BoxWrapper from '../../../wrappers/BoxWrapper';

export const BoxStyled = styled( BoxWrapper )(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    backgroundColor: '#fff',
    boxShadow: 24,
    padding: 25
}));