import React from "react";  
import { Breadcrumb, Card, CardBody, CardText, CardTitle, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';
import { Fade, Stagger, FadeTransform } from 'react-animation-components';

function RenderPayroll({staffsSalary}) {
    return (
        <Fade in>
            <Card className='border border-2 border-secondary'>
                <CardTitle className='ml-3 mt-3'>{staffsSalary.name}</CardTitle>
                <CardBody>
                    <CardText>Mã nhân viên: {staffsSalary.id}</CardText>
                    <CardText>Hệ số lương: {staffsSalary.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {staffsSalary.overTime}</CardText>
                    <Breadcrumb>Lương: {(staffsSalary.salaryScale*3000000 + staffsSalary.overTime*200000).toFixed(0)}</Breadcrumb>
                </CardBody>
            </Card>
        </Fade>
    );
}

const Payroll = (props) => {
    const payroll = props.staffsSalary.map((staffsSalary) => {
        return (
            <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
                <RenderPayroll staffsSalary={staffsSalary} />
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
            <Stagger in>
                <div className="row mb-2">
                        {payroll}
                </div>
            </Stagger>
        </div>
    );
}

export default Payroll;