import React from "react";  
import { Breadcrumb, Card, CardBody, CardText, CardTitle, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

function RenderPayroll({staff}) {
    return (
        <Card className='border border-2 border-secondary'>
            <CardTitle className='ml-3 mt-3'>{staff.name}</CardTitle>
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
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row mb-2">
                {payroll}
            </div>
        </div>
    );
}

export default Payroll;