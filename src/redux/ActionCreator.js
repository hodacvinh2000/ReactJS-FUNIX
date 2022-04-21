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

export const addStaff = (staff) => ({
    type: ActionType.ADD_STAFF,
    payload: staff
})

export const postStaff = (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    var birthday = new Date(doB).toISOString();
    var startdate = new Date(startDate).toISOString()
    const newStaff = {
        name: name,
        doB: birthday,
        startDate: startdate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
        image: "/assets/images/alberto.png",
    }
    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
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
    .then(response => dispatch(addStaffs(response)))
    .catch(error => { console.log('Post staff ', error.message)
        alert('New staff could not be posted\nError: ' + error.message)});
}

export const updateStaff = (id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    var birthday = new Date(doB).toISOString();
    var startdate = new Date(startDate).toISOString()
    const staff = {
        id: id,
        name: name,
        doB: birthday,
        startDate: startdate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
        image: "/assets/images/alberto.png",
    }
    return fetch(baseUrl + 'staffs', {
        method: 'PATCH',
        body: JSON.stringify(staff),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
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
    .then(response => dispatch(updateStaffs(response)))
    .catch(error => { console.log('Update staff ', error.message)
        alert('Staff could not be updated\nError: ' + error.message)});
}

export const updateStaffs = (staffs) => ({
    type: ActionType.UPDATE_STAFF,
    payload: staffs
});


export const deleteStaff = (id) => (dispatch) => {

    return fetch(baseUrl + 'staffs/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
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
    .then(response => dispatch(deleteStaffs(response)))
    .catch(error => { console.log('Delete staff ', error.message)
        alert('Staff could not be deleted\nError: ' + error.message)});
}

export const deleteStaffs = (staffs) => ({
    type: ActionType.DELETE_STAFF,
    payload: staffs
});