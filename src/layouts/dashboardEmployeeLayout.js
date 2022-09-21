import React, { useContext } from 'react';
import Navbar from '../utils/navbar';
import ToolbarWrapper from '../components/wrappers/ToolbarWrapper';
import { VaccinationContextProvider } from '../contexts/vaccinationContext';
import { AuthContext } from '../contexts/authContext';
import UserForm from '../components/dashboard/employeeForm/employeeForm';

const DashboardEmployeeLayout = () => {
  const [dispatch, state] = useContext(AuthContext);

  return (
    <VaccinationContextProvider>
        <Navbar />
        <ToolbarWrapper />
        <UserForm data={state.userData}/>
    </VaccinationContextProvider>
  );
};

export default DashboardEmployeeLayout;