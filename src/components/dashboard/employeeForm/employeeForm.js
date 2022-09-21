import React, { useState, useContext, useEffect } from 'react';
import GridWrapper from '../../wrappers/GridWrapper';
import TypographyWrapper from '../../wrappers/TypographyWrapper';
import TextFieldWrapper from '../../wrappers/TextFieldWrapper';
import ToolbarWrapper from '../../wrappers/ToolbarWrapper';
import ButtonWrapper from '../../wrappers/ButtonWrapper';
import CheckboxWrapper from '../../wrappers/CheckboxWrapper';
import BoxWrapper from '../../wrappers/BoxWrapper';
import FormControlLabelWrapper from '../../wrappers/FormControlLabelWrapper';
import FormControlWrapper from '../../wrappers/FormControlWrapper';
import SelectWrapper from '../../wrappers/SelectWrapper';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { BoxStyled } from './styles/addUserFormStyles';
import { VaccinationContext } from '../../../contexts/vaccinationContext';
import { updateEmployeeService, updateVaccineInfoService, addEmployeeVaccineService, getEmployeeListService, getVaccineListService } from '../../../services/dashboardServices';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { Stack } from '@mui/system';
import { Switch, FormGroup, InputLabel, MenuItem, ListItemText } from '@mui/material'

const UserForm = ({ open, closeModal, data }) => {
    const [dispatch, state] = useContext(VaccinationContext);
    const [id, setId] = useState("");
    const [validId, setValidId] = useState(false);
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    const [address, setAddress] = useState("");
    const [validAddress, setValidAddress] = useState(false);
    const [dose, setDose] = useState(null);
    const [validDose, setValidDose] = useState(false);
    const [date, setDate] = useState(dayjs('2014-08-18T21:11:54'));
    const [dateVaccine, setDateVaccine] = useState(dayjs('2014-08-18T21:11:54'));
    const [isVaccinated, setIsVaccinated] = useState(false);
    const [vaccine, setVaccine] = useState("");
    const [validVaccine, setValidVaccine] = useState(false);
    
    const vaccineOptions = [
        'Sputnik',
        'AstraZeneca',
        'Pfizer',
        'Jhonson&Jhonson'
      ];

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const handleDateVaccine = (newValue) => {
    setDateVaccine(newValue);
  };

  const handleIsVaccinated = ({ target }) => {
    setIsVaccinated(target.checked);
  };

    useEffect(() => {
        async function fetchMyAPI() {
            const result = await getVaccineListService();
            if(data) {
                const filterVaccinateRecord = result.find(val => val.employeeId === data.id);
                setId(data.id);
                setValidId(true);
                setName(data.name);
                setValidName(true);
                setLastName(data.lastName);
                setValidLastName(true);
                setEmail(data.email);
                setValidEmail(true);
                setAddress(data.address);
                setValidAddress(true);
                setPhone(data.address);
                setValidPhone(true);
                setDate(data.birthday);
                setIsVaccinated(data.vaccinationState);
                if(filterVaccinateRecord) {
                    setVaccine(filterVaccinateRecord.type);
                    setDateVaccine(filterVaccinateRecord.vaccineDate);
                    setDose(filterVaccinateRecord.doseNumber);
                }
            }
        }
        fetchMyAPI();
        console.log(data)
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

    const handleValidationDose = (e) => {
        setDose(e.target.value);
        const reg = new RegExp("^[0-9]{10}$");
        setValidDose(reg.test(e.target.value));
    };

    const handleValidationPhone = (e) => {
        setPhone(e.target.value);
        const reg = new RegExp("^[0-9]{10}$");
        setValidPhone(reg.test(e.target.value));
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

    const handleValidationAddress = (e) => {
        setAddress(e.target.value);
        const reg = new RegExp("^[a-zA-Z0-9_ ]*$");
        setValidAddress(reg.test(e.target.value));
    };

    const handleTypeVaccine = (event) => {
        const {
          target: { value },
        } = event;
        setVaccine(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
        setValidVaccine(true);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let str = name + " " + lastName;
        let userTwoLetters = str.split(/\s/).reduce((response,word)=> response+=word.slice(0,2),'');

        const userObj = {
            id,
            name,
            lastName,
            email,
            userName: data.userName,
            password: data.password,
            birthday: new Date(date),
            address: address,
            phone: phone,
            vaccinationState: isVaccinated,
            role: data.role
        };

        const userVaccineInfo = {
            employeeId: id,
            type: vaccine[0],
            vaccineDate: new Date(dateVaccine),
            doseNumber: parseInt(dose)
        };

            const optionsPut = {
                method: 'PUT', 
                body: JSON.stringify(userObj), 
                headers: { 'Content-Type': 'application/json' } 
            }

            await updateEmployeeService(id, optionsPut);

            if(!data.vaccinationState && dose) {
                const optionsVaccinePost = {
                    method: 'POST', 
                    body: JSON.stringify(userVaccineInfo), 
                    headers: { 'Content-Type': 'application/json' } 
                }

                await addEmployeeVaccineService(optionsVaccinePost);
            }
            if(data.vaccinationState){
                const optionsVaccinePut = {
                    method: 'PUT', 
                    body: JSON.stringify(userObj), 
                    headers: { 'Content-Type': 'application/json' } 
                }

                await updateVaccineInfoService(data.id, optionsVaccinePut);
            }

            const res = await getEmployeeListService();

            dispatch({
                type: 'GET_USER_LIST',
                payload: res
            });

    };
  
    return (
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
                    <GridWrapper item xs={6}>
                        <TextFieldWrapper
                            style={{ width: "95%", margin: "5px" }}
                            type="text"
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={(e) => handleValidationAddress(e)}
                            inputProps={{ pattern: "^[a-zA-Z0-9_ ]*$" }}
                            error={!validAddress}
                            required={true}
                        />
                    </GridWrapper>
                    <GridWrapper item xs={6}>
                        <TextFieldWrapper
                            style={{ width: "95%", margin: "5px" }}
                            type="text"
                            label="Phone"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => handleValidationPhone(e)}
                            inputProps={{ pattern: "^[0-9]{10}$" }}
                            error={!validPhone}
                            required={true}
                        />
                    </GridWrapper>
                    <GridWrapper item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3} sx={{ width: '95%', margin: "5px" }}>
                                <DesktopDatePicker
                                    label="Fecha de nacimiento"
                                    inputFormat="MM/DD/YYYY"
                                    value={date}
                                    onChange={handleChangeDate}
                                    renderInput={(params) => <TextFieldWrapper {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </GridWrapper>
                    <GridWrapper item xs={6}>
                        <FormGroup>
                            <FormControlLabelWrapper control={<Switch checked={isVaccinated} onChange={handleIsVaccinated}/>} label="Si eres vacunado, haz clic en el switch" />
                        </FormGroup>
                    </GridWrapper>
                    <GridWrapper item xs={4}>
                        <FormControlWrapper sx={{ width: '95%', margin: '5px' }}>
                            <InputLabel>Tipo de vacuna</InputLabel>
                            <SelectWrapper
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={vaccine}
                                onChange={handleTypeVaccine}
                                variant='standard'
                                renderValue={(selected) => selected}
                                disabled={ isVaccinated ? false :  true}
                            >
                                {vaccineOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <CheckboxWrapper checked={vaccine.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </SelectWrapper>
                        </FormControlWrapper>
                    </GridWrapper>
                    <GridWrapper item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3} sx={{ width: '95%', margin: "5px" }}>
                                <DesktopDatePicker
                                    label="Fecha de Vacunación"
                                    inputFormat="MM/DD/YYYY"
                                    value={dateVaccine}
                                    onChange={handleDateVaccine}
                                    disabled={ isVaccinated ? false :  true}
                                    renderInput={(params) => <TextFieldWrapper {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </GridWrapper>
                    <GridWrapper item xs={4}>
                        <TextFieldWrapper
                            style={{ width: "95%", margin: "5px" }}
                            type="number"
                            label="Dosis"
                            variant="standard"
                            value={dose}
                            onChange={(e) => handleValidationDose(e)}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            required={true}
                            disabled={ isVaccinated ? false :  true}
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
    );
  }
  
  export default UserForm;