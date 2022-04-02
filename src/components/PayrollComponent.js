import React from "react";  
import { Breadcrumb, Card, CardBody, CardText, CardTitle } from "reactstrap";

function RenderPayroll({staff}) {
    return (
        <Card>
            <CardTitle>{staff.name}</CardTitle>
            <CardBody>
                <CardText>Mã nhân viên: {staff.id}</CardText>
                <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
                <Breadcrumb>Lương: {(staff.salaryScale*3000000 + staff.overTime*200000).toFixed(0)}</Breadcrumb>
            </CardBody>
        </Card>
    );
}

const Payroll = (props) => {
    const payroll = props.staffs.map((staff) => {
        return (
            <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
                <RenderPayroll staff={staff} />
            </div>
        );
    })
    return (
        <div className="container">
            <div className="row">
                {payroll}
            </div>
        </div>
    );
}

export default Payroll;