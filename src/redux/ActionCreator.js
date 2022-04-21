import * as ActionType from './ActionType';
import { baseUrl } from '../shared/baseUrl';

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)));
}

export const staffsLoading = () => ({
    type: ActionType.STAFFS_LOADING
});

export const staffsFailed = (error) => ({
    type: ActionType.STAFFS_FAILED,
    payload: error
});

export const addStaffs = (staffs) => ({
    type: ActionType.ADD_STAFFS,
    payload: staffs
})

export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
}

export const departmentsLoading = () => ({
    type: ActionType.DEPARTMENTS_LOADING
});

export const departmentsFailed = (error) => ({
    type: ActionType.DEPARTMENTS_FAILED,
    payload: error
});

export const addDepartments = (departments) => ({
    type: ActionType.ADD_DEPARTMENTS,
    payload: departments
})

export const fetchStaffsOfDepartment = (departmentId) => (dispatch) => {
    dispatch(staffsOfDepartmentLoading(true));

    return fetch(baseUrl + 'departments/' + departmentId)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(staffsOfDepartment => dispatch(addStaffsOfDepartment(staffsOfDepartment)))
        .catch(error => dispatch(staffsOfDepartmentFailed(error.message)));
}

export const staffsOfDepartmentLoading = () => ({
    type: ActionType.STAFFS_OF_DEPARTMENT_LOADING
});

export const staffsOfDepartmentFailed = (error) => ({
    type: ActionType.STAFFS_OF_DEPARTMENT_FAILED,
    payload: error
});

export const addStaffsOfDepartment = (staffsOfDepartment) => ({
    type: ActionType.ADD_STAFFS_OF_DEPARTMENT,
    payload: staffsOfDepartment
})

export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsOfDepartmentLoading(true));

    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => dispatch(staffsSalaryFailed(error.message)));
}

export const staffsSalaryLoading = () => ({
    type: ActionType.STAFFS_SALARY_LOADING
});

export const staffsSalaryFailed = (error) => ({
    type: ActionType.STAFFS_SALARY_FAILED,
    payload: error
});

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionType.ADD_STAFFS_SALARY,
    payload: staffsSalary
})