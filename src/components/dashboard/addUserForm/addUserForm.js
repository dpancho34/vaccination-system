import React, { useState, useContext, useEffect } from 'react';
import GridWrapper from '../../wrappers/GridWrapper';
import TypographyWrapper from '../../wrappers/TypographyWrapper';
import TextFieldWrapper from '../../wrappers/TextFieldWrapper';
import ToolbarWrapper from '../../wrappers/ToolbarWrapper';
import ButtonWrapper from '../../wrappers/ButtonWrapper';
import BoxWrapper from '../../wrappers/BoxWrapper';
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { BoxStyled } from './styles/addUserFormStyles'
import { VaccinationContext } from '../../../contexts/vaccinationContext';
import { addEmployeeService, getEmployeeListService, updateEmployeeService, getVaccineListService } from '../../../services/dashboardServices'

const UserModalForm = ({ open, closeModal, data }) => {
    const [dispatch, state] = useContext(VaccinationContext);
    const [id, setId] = useState("");
    const [validId, setValidId] = useState(false);
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);

    useEffect(() => {
        if(data) {
            setId(data.id);
            setValidId(true);
            setName(data.name);
            setValidName(true);
            setLastName(data.lastName);
            setValidLastName(true);
            setEmail(data.email);
            setValidEmail(true);
        }
    }, [data]);

    const handleValidationEmail = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const reg = new RegExp(re);
        setValidEmail(reg.test(e.target.value));
    };

    const handleValidationId = (e) => {
        setId(e.target.value);
        const reg = new RegExp("^[0-9]{10}$");
        setValidId(reg.test(e.target.value));
    };

    const handleValidationName = (e) => {
        setName(e.target.value);
        const reg = new RegExp("^[A-Za-z]+$");
        setValidName(reg.test(e.target.value));
    };

    const handleValidationLastName = (e) => {
        setLastName(e.target.value);
        const reg = new RegExp("^[A-Za-z]+$");
        setValidLastName(reg.test(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let str = name + " " + lastName;
        let userTwoLetters = str.split(/\s/).reduce((response,word)=> response+=word.slice(0,2),'');

        const userObj = {
            id: parseInt(id),
            name,
            lastName,
            email,
            userName: !data ? userTwoLetters+id : data.userName,
            password: !data ? Math.floor(100000 + Math.random() * 900000) : data.password,
            birthday: !data ? new Date() : data.birthday,
            address: !data ? '' : data.address,
            phone: !data ? '' : data.phone,
            vaccinationState:  !data ? false : data.vaccinationState
        };

        if(!data) {
            const optionsPost = {
                method: 'POST', 
                body: JSON.stringify(userObj), 
                headers: { 'Content-Type': 'application/json' } 
            }

            await addEmployeeService(optionsPost);
        } else {
            const optionsPut = {
                method: 'PUT', 
                body: JSON.stringify(userObj), 
                headers: { 'Content-Type': 'application/json' } 
            }
            
            await updateEmployeeService(id, optionsPut)
        }
        
        const response = await getEmployeeListService();
        const result = await getVaccineListService();

        response.map(val => {
            let aux = val;
            const vaccineFiltered = result.find(vaccine => aux.id === vaccine.employeeId);
            if(vaccineFiltered) {
              return Object.assign(aux, {
                vaccineId: vaccineFiltered.id,
                type: vaccineFiltered.type,
                vaccineDate: vaccineFiltered.vaccineDate,
                doseNumber: vaccineFiltered.doseNumber
              });
            }
            return Object.assign(aux, {
              type: '',
              vaccineDate: '',
              doseNumber: 0
            });
          });

        dispatch({
            type: 'GET_USER_LIST',
            payload: response
        });

        dispatch({
            type: 'USER_OBJ',
            payload: null
        });

        setId('');
        setValidId(false);
        setName('');
        setValidName(false);
        setLastName('');
        setValidLastName(false);
        setEmail('');
        setValidEmail(false);

        closeModal();
    };
  
    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <BoxStyled>
                <TypographyWrapper id="modal-modal-title" variant="h6" component="h2">
                    User Form
                </TypographyWrapper>
                <form onSubmit={handleSubmit}>
                    <GridWrapper container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <GridWrapper item xs={6}>
                            <TextFieldWrapper
                                style={{ width: "95%", margin: "5px" }}
                                type="text"
                                label="ID"
                                variant="outlined"
                                value={id}
                                onChange={(e) => handleValidationId(e)}
                                inputProps={{ pattern: "^[0-9]{10}$" }}
                                error={!validId}
                                required={true}
                            />
                        </GridWrapper>
                        <GridWrapper item xs={6}>
                            <TextFieldWrapper
                                style={{ width: "95%", margin: "5px" }}
                                type="text"
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => handleValidationName(e)}
                                inputProps={{ pattern: "^[A-Za-z]+$" }}
                                error={!validName}
                                required={true}
                            />
                        </GridWrapper>
                        <GridWrapper item xs={6}>
                            <TextFieldWrapper
                                style={{ width: "95%", margin: "5px" }}
                                type="text"
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => handleValidationLastName(e)}
                                inputProps={{ pattern: "^[A-Za-z]+$" }}
                                error={!validLastName}
                                required={true}
                            />
                        </GridWrapper>
                        <GridWrapper item xs={6}>
                            <TextFieldWrapper
                                style={{ width: "95%", margin: "5px" }}
                                type="text"
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => handleValidationEmail(e)}
                                inputProps={{ pattern: "^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$" }}
                                error={!validEmail}
                                required={true}
                            />
                        </GridWrapper>
                    </GridWrapper>
                    <ToolbarWrapper style={{ paddingLeft: '4px' }}>
                        <BoxWrapper sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
                            <ButtonWrapper 
                                type="submit"
                                style={{ minWidth: '140px' }} 
                                variant="contained" 
                                startIcon={<SaveIcon />} 
                                disabled={!validId || !validName || !validLastName || !validEmail ? true : false }>
                                Guardar Datos
                            </ButtonWrapper>
                        </BoxWrapper>
                        <ButtonWrapper onClick={closeModal} style={{ minWidth: '140px' }} variant="outlined" startIcon={<ClearIcon />}>
                            Cancelar
                        </ButtonWrapper>
                    </ToolbarWrapper>
                </form>
            </BoxStyled>
        </Modal>
    );
  }
  
  export default UserModalForm;