import React, { useState, useEffect, useContext } from 'react';
import SearchAndAddRow from './searchAndAddUserRow/searchAndAddUserForm';
import UserModalForm from './addUserForm/addUserForm';
import DataTable from './userTable/userListTable';
import ToolbarWrapper from '../wrappers/ToolbarWrapper';
import { getEmployeeListService, getVaccineListService } from '../../services/dashboardServices'
import { VaccinationContext } from '../../contexts/vaccinationContext';

const Dashboard = () => {
  const [dispatch, state] = useContext(VaccinationContext);
  const [open, setOpen] = useState(false);
  const [vaccineState, setVaccineState] = useState([]);
  const [vaccineType, setVaccineType] = useState([]);
  const [vaccineDate, setVaccineDate] = useState([null, null]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getEmployeeListApi();
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
  }

  fetchMyAPI();
  }, []);

  const getEmployeeListApi = async () => {
    return await getEmployeeListService();
};

  return (
    <>
      <SearchAndAddRow openModal={handleOpen} filterVaccinationState={(value) => setVaccineState(value)} filterVaccinationType={(value) => setVaccineType(value)} filterDateRange={(value) => setVaccineDate(value)}/>
      <UserModalForm open={open} closeModal={handleClose} data={state?.userObj}/>
      <ToolbarWrapper />
      <DataTable openModal={handleOpen} vaccineState={vaccineState} vaccineType={vaccineType} vaccineDate={vaccineDate}/>
    </>
  );
}

export default Dashboard;