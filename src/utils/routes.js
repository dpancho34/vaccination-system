import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginLayout from '../layouts/loginLayout';
import DashboardLayout from '../layouts/dashboardLayout';
import DashboardEmployeeLayout from '../layouts/dashboardEmployeeLayout';
import { AuthContext } from '../contexts/authContext';
import { getEmployeeListService } from '../services/dashboardServices'

const RoutesApp = () => {
    const [dispatch, state] = useContext(AuthContext);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    

    useEffect(() => {
        async function fetchMyAPI() {
            const response = await getEmployeeListService();
            let filterUser = response.filter(val => val.userName === state.user?.email && val.password === parseInt(state.user?.password));

            if( !state.user || filterUser.length === 0 ) {
                navigate('/login');
            } else {
                setRole(filterUser[0]?.role);
                navigate('/dashboard');
                dispatch({
                    type: 'GET_ROLE',
                    payload: filterUser[0]?.role
                });
                dispatch({
                    type: 'SAVE_USER_DATA',
                    payload: filterUser[0]
                });
            }
        }

        fetchMyAPI();
    }, [state.user]);

    return (
        <Routes>
            <Route
                path='/dashboard'
                element={ role === 'admin' ? <DashboardLayout/> : <DashboardEmployeeLayout/>}
            />
            <Route
                path='/login'
                element={<LoginLayout/>}
            />
        </Routes>
    );
}

export default RoutesApp;