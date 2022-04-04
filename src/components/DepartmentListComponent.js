import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

function RenderDepartment({department}) {
    return (
        <Card className="mt-2 border border-secondary">
            <CardTitle className='ml-2'>{department.name}</CardTitle>
            <CardText className='ml-4 mb-2'>Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </Card>
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
    return (
        <div className="container">
            <div className="row mb-2">
                {departments}
            </div>
        </div>
    );
}

export default DepartmentList;