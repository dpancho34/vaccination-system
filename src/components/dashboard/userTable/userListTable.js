import React, { useContext, useEffect, useState } from 'react';
import { VaccinationContext } from '../../../contexts/vaccinationContext';
import { DataGrid } from '@mui/x-data-grid';
import IconButtonWrapper from '../../wrappers/IconButtonWrapper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteEmployeeService, getEmployeeListService } from '../../../services/dashboardServices';

const DataTable = ({openModal, vaccineState, vaccineType, vaccineDate}) => {
    const [dispatch, state] = useContext(VaccinationContext);
    const [employeeList, setEmployeeList] = useState([]);

    const handleDeleteEmployee = async (event, cellValues) => {
        const optionsDelete = {
            method: 'DELETE', 
        }
    
        await deleteEmployeeService(cellValues.row.id, optionsDelete);
        
        const res = await getEmployeeListService();

        dispatch({
            type: 'GET_USER_LIST',
            payload: res
        });
        
    };

    const columns = [
        { field: "id", headerName: "CI", width: 130 },
        { field: "name", headerName: "Nombre", width: 130 },
        { field: "lastName", headerName: "Apellido", width: 130 },
        { field: "email", headerName: "Correo Electrónico", width: 200 },
        { field: "userName", headerName: "User", width: 130 },
        { field: "birthday", headerName: "Fecha de Nacimiento", width: 150 },
        { field: "address", headerName: "Dirección", width: 250 },
        { field: "phone", headerName: "Teléfono", width: 130 },
        { field: "vaccinationState", headerName: "Estado de Vacunación", type: "boolean", width: 160 },
        { field: "type", headerName: "Tipo de Vacuna", width: 140 },
        { field: "vaccineDate", headerName: "Fecha de Vacunación", width: 160 },
        { field: "doseNumber", headerName: "Dosis", width: 100 },
        {
          field: "actions",
          headerName: "Acciones",
          renderCell: (cellValues) => {
            return (
                <div>
                    <IconButtonWrapper
                        aria-label="edit"
                        color="primary"
                        onClick={() => {
                            dispatch({
                                type: 'USER_OBJ',
                                payload: cellValues.row
                            });
                            openModal();
                        }}
                    >
                        <EditIcon/>
                    </IconButtonWrapper>
                    <IconButtonWrapper
                        aria-label="edit"
                        color="primary"
                        onClick={(event) => {
                            handleDeleteEmployee(event, cellValues);
                        }}
                    >
                        <DeleteIcon/>
                    </IconButtonWrapper>
                </div>
            );
          },
          width: 150
        }
      ];

    useEffect(() => {
        if(vaccineState.length === 0 && vaccineType.length === 0 && !vaccineDate[0]) {
            setEmployeeList(state.userList);
        } else {
            let filteredResultState = state.userList.filter(val => vaccineState.includes(val.vaccinationState));
            let filteredResultType = state.userList.filter(val => vaccineType.includes(val.type));
            if(vaccineState.length !== 0 && vaccineType.length === 0 && !vaccineDate[0]) { 
                setEmployeeList(filteredResultState);
            }
            if(vaccineState.length === 0 && vaccineType.length !== 0 && !vaccineDate[0]) {
                setEmployeeList(filteredResultType);
            }
            if(vaccineState.length !== 0 && vaccineType.length !== 0 && !vaccineDate[0]) {
                let filteredResultTypeCombined = filteredResultState.filter(val => vaccineType.includes(val.type))
                setEmployeeList(filteredResultTypeCombined);
            }
            if(vaccineDate[0] && vaccineDate[1]) {
                let startDate = new Date(vaccineDate[0]);
                let endDate = new Date(vaccineDate[1]);
                let resultByVaccineDate = state.userList.filter(val => {
                    const date = new Date(val.vaccineDate);
                    
                    return (date >= startDate && date <= endDate);
                  });
                
                setEmployeeList(resultByVaccineDate);
            }
        }
    }, [state.userList, vaccineState, vaccineType, vaccineDate]);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={employeeList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

export default DataTable;