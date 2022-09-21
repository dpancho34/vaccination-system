import React from 'react';
import Navbar from '../utils/navbar';
import ToolbarWrapper from '../components/wrappers/ToolbarWrapper';
import Dashboard from '../components/dashboard/index';
import { VaccinationContextProvider } from '../contexts/vaccinationContext';

const DashboardLayout = () => {

  return (
    <VaccinationContextProvider>
        <Navbar />
        <ToolbarWrapper />
        <Dashboard />
    </VaccinationContextProvider>
  );
};

export default DashboardLayout;