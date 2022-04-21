import React from "react";
import { Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { Fade, Stagger, FadeTransform } from 'react-animation-components';

const StaffDetail = (props) => {
    console.log(props);
    if (props.staffLoading || props.departmentLoading) {
        return (
            <Loading />
        );
    }
    else if (props.staffErrMess || props.departmentErrMess) {
        return (
            <div>
                <h4>{props.errMess}</h4>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staffs">Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Stagger in>
                        <Fade in>
                            <Media className="row mb-2">
                                <Media left className='col-12 col-md-4 col-lg-3 m-1'>
                                    <Media object width="100%" src={props.staff.image} alt={props.staff.name} className='border border-secondary' />
                                </Media>
                                <Media body className="col-12 col-md-8 col-lg-9 m-1">
                                    <Media heading>Họ và tên: {props.staff.name}</Media>
                                    <p>Ngày sinh: {dateFormat(props.staff.doB,"dd-mm-yyyy")}</p>
                                    <p>Ngày vào công ty: {dateFormat(props.staff.startDate,"dd-mm-yyyy")}</p>
                                    <p>Phòng ban: {props.department.name}</p>
                                    <p>Số ngày nghỉ còn lại: {props.staff.annualLeave}</p>
                                    <p>Số ngày đã làm thêm: {props.staff.overTime}</p>
                                </Media>
                            </Media>
                            </Fade>
                    </Stagger>
                </FadeTransform>
            </div>
        );
    }
}

export default StaffDetail;