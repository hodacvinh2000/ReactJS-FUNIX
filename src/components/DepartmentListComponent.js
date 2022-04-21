import React from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Fade, Stagger, FadeTransform } from 'react-animation-components';

function RenderDepartment({department}) {
    return (
        <Link to={`/departments/${department.id}`} className="text-decoration-none text-dark">
            <Card className="mt-2 border border-secondary">
                <CardTitle className='ml-2'>{department.name}</CardTitle>
                <CardText className='ml-4 mb-2'>Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </Card>
        </Link>
    );
}

const DepartmentList = (props) => {
    const departments = props.departments.map((department) => {
        return (
            <div className="col-12 col-md-6 col-lg-4">
                <RenderDepartment department={department} />
            </div>
        );
    })
    if (props.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.errMess) {
        return (
            <div>
                <h4>{props.errMess}</h4>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <div className="row mb-2">
                        {departments}
                    </div>
                </FadeTransform>
            </div>
        );
    }
}

export default DepartmentList;