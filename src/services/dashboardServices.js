export const getEmployeeListService = async () => {
    const res = await fetch('http://localhost:3000/employee');
    const json = await res.json();
    
    return json;
};

export const addEmployeeService = async (options) => {
    const res = await fetch('http://localhost:3000/employee', options);
    const json = await res.json();

    return json;
};

export const updateEmployeeService = async (id, options) => {
    const res = await fetch(`http://localhost:3000/employee/${id}`, options);
    const json = await res.json();
    
    return json;
};

export const deleteEmployeeService = async (id, options) => {
    const res = await fetch(`http://localhost:3000/employee/${id}`, options);
    const json = await res.json();
    
    return json;
};

export const getVaccineListService = async () => {
    const res = await fetch('http://localhost:3000/vaccine');
    const json = await res.json();
    
    return json;
};

export const addEmployeeVaccineService = async (options) => {
    const res = await fetch('http://localhost:3000/vaccine', options);
    const json = await res.json();

    return json;
};

export const updateVaccineInfoService = async (id, options) => {
    const res = await fetch(`http://localhost:3000/vaccine/${id}`, options);
    const json = await res.json();
    
    return json;
};