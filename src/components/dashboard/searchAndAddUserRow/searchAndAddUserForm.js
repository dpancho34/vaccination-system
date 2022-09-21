import React, { useState } from 'react';
import BoxWrapper from '../../wrappers/BoxWrapper';
import AddIcon from '@mui/icons-material/Add';
import ButtonWrapper from '../../wrappers/ButtonWrapper';
import CheckboxWrapper from '../../wrappers/CheckboxWrapper';
import FormControlWrapper from '../../wrappers/FormControlWrapper';
import TextFieldWrapper from '../../wrappers/TextFieldWrapper';
import ToolbarWrapper from '../../wrappers/ToolbarWrapper';
import SelectWrapper from '../../wrappers/SelectWrapper';
import { InputLabel, ListItemText, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const SearchAndAddRow = ({ openModal, filterVaccinationState, filterVaccinationType, filterDateRange }) => {
  const [filterState, setFilterState] = useState([]);
  const [vaccineTypeFilter, setVaccineTypeFilter] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  const vaccineStates = [
    'Vacunado',
    'No Vacunado'
  ];

  const vaccineOptions = [
    'Sputnik',
    'AstraZeneca',
    'Pfizer',
    'Jhonson&Jhonson'
  ];

  const handleVaccinationState = (event) => {
    const {
      target: { value },
    } = event;
    let aux = value.map(val => val === 'Vacunado' ? true : false);
    setDateRange([null, null]);
    filterDateRange([null, null]);
    filterVaccinationState(aux);
    setFilterState(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDateRange([null, null]);
    filterDateRange([null, null]);
    filterVaccinationType(value);
    setVaccineTypeFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <ToolbarWrapper>
      <BoxWrapper sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <FormControlWrapper sx={{ m: 1, width: 250 }}>
          <InputLabel>Estado de vacunación</InputLabel>
          <SelectWrapper
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            size='small'
            multiple
            value={filterState}
            onChange={handleVaccinationState}
            variant='standard'
            renderValue={(selected) => selected.join(', ')}
          >
            {vaccineStates.map((name) => (
              <MenuItem key={name} value={name}>
                <CheckboxWrapper checked={filterState.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </SelectWrapper>
        </FormControlWrapper>
      </BoxWrapper>
      <BoxWrapper sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <FormControlWrapper sx={{ m: 1, width: 250 }}>
          <InputLabel>Tipo de vacuna</InputLabel>
          <SelectWrapper
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            size='small'
            value={vaccineTypeFilter}
            onChange={handleChange}
            variant='standard'
            renderValue={(selected) => selected.join(', ')}
          >
            {vaccineOptions.map((name) => (
              <MenuItem key={name} value={name}>
                <CheckboxWrapper checked={vaccineTypeFilter.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </SelectWrapper>
        </FormControlWrapper>
      </BoxWrapper>
      <BoxWrapper sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
      <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: 'Inicio', end: 'Fin' }}
    >
      <DateRangePicker
        value={dateRange}
        onChange={(newValue) => {
          filterVaccinationState([]);
          setFilterState([]);
          filterVaccinationType([]);
          setVaccineTypeFilter([]);
          filterDateRange(newValue);
          setDateRange(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextFieldWrapper {...startProps} variant='standard'/>
            <BoxWrapper sx={{ mx: 2 }}> to </BoxWrapper>
            <TextFieldWrapper {...endProps} variant='standard'/>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
      </BoxWrapper>
      <BoxWrapper component="main" sx={{ p: 3 }}>
        <ButtonWrapper onClick={openModal} variant="outlined" startIcon={<AddIcon />}>
          Agregar Empleado
        </ButtonWrapper>
      </BoxWrapper>
    </ToolbarWrapper>
  );
}

export default SearchAndAddRow;