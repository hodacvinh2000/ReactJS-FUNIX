import React, { Component } from "react";
import { Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { Fade, Stagger, FadeTransform } from 'react-animation-components';
import { Input, FormGroup, Form, Button, Col, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback } from 'reactstrap';
import { Field,Control, LocalForm, Errors } from 'react-redux-form';

function ListDepartment ({departments, isLoading, errMess}) {
    if (isLoading || errMess) {
        return (
            <option>Loading ...</option>
        );
    }
    else {
        return (
            departments.map((department) => {
                return(
                    <option value={department.id}>{department.name}</option>
                );
            })
        );
    }
}

class StaffDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            name: this.props.staff ? this.props.staff.name : null,
            doB: this.props.staff ? dateFormat(this.props.staff.doB, "yyyy-mm-dd") : null,
            startDate: this.props.staff ? dateFormat(this.props.staff.startDate, "yyyy-mm-dd") : null,
            department: this.props.department ? this.props.department.id : null,
            salaryScale: this.props.staff ? this.props.staff.salaryScale : null,
            annualLeave: this.props.staff ? this.props.staff.annualLeave : null,
            overTime: this.props.staff ? this.props.staff.overTime : null,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    onInputChange(event) { 
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]:value});
    }

    handleSubmit(values) {
        this.toggleModal();
        let name = values.name ? values.name : this.state.name;
        let doB = values.doB ? values.doB : this.state.doB;
        let startDate = values.startDate ? values.startDate : this.state.startDate;
        let departmentId = values.department ? values.department : this.state.department;
        let salaryScale = values.salaryScale ? values.salaryScale : this.state.salaryScale;
        let annualLeave = values.annualLeave ? values.annualLeave : this.state.annualLeave;
        let overTime = values.overTime ? values.overTime : this.state.overTime;
        this.props.updateStaff(this.props.staff.id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime);
    }

    render () {
        if (this.props.staffLoading || this.props.departmentLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.staffErrMess || this.props.departmentErrMess) {
            return (
                <div>
                    <h4>{this.props.errMess}</h4>
                </div>
            );
        }
        else {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/staffs">Nhân viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
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
                                        <Media object width="100%" src={this.props.staff.image} alt={this.props.staff.name} className='border border-secondary' />
                                    </Media>
                                    <Media body className="col-12 col-md-8 col-lg-9 m-1">
                                        <Media heading>Họ và tên: {this.props.staff.name}</Media>
                                        <p>Ngày sinh: {dateFormat(this.props.staff.doB,"dd-mm-yyyy")}</p>
                                        <p>Ngày vào công ty: {dateFormat(this.props.staff.startDate,"dd-mm-yyyy")}</p>
                                        <p>Phòng ban: {this.props.department.name}</p>
                                        <p>Số ngày nghỉ còn lại: {this.props.staff.annualLeave}</p>
                                        <p>Số ngày đã làm thêm: {this.props.staff.overTime}</p>
                                        <button className="btn btn-primary mr-3" onClick={this.toggleModal}>Cập nhật</button>
                                        <button className="btn btn-danger" onClick={() => this.props.deleteStaff(this.props.staff.id)} ><Link to={`/staffs`} className="text-light" style={{"text-decoration":"none"}}>Xóa</Link></button>
                                    </Media>
                                </Media>
                                </Fade>
                        </Stagger>
                    </FadeTransform>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={4}>Tên</Label>
                                    <Col md={8}>
                                        <Control.text model=".name" id="name" name="name"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.onInputChange} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                    <Col md={8}>
                                        <Control type="date" model=".doB" id="doB" name="doB" className="form-control"
                                            value={this.state.doB} 
                                            onChange={this.onInputChange} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                    <Col md={8}>
                                        <Control type="date" model=".startDate" id="startDate" name="startDate" className="form-control"
                                            value={this.state.startDate}
                                            onChange={this.onInputChange} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="department" md={4}>Phòng ban</Label>
                                    <Col md={8}>
                                        <Control.select model=".department" id=""name="department" value={this.state.department} onChange={this.onInputChange} className='form-control' >
                                            <ListDepartment departments={this.props.departments} isLoading={this.props.departmentsLoading} errMess={this.props.deparmentsErrMess} />
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                    <Col md={8}>
                                        <Control.text model=".salaryScale" id="salaryScale" name="salaryScale" 
                                        className="form-control"
                                        onChange={this.onInputChange}
                                        value={this.state.salaryScale} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                    <Col md={8}>
                                        <Control.text model=".annualLeave" id="annualLeave" name="annualLeave" 
                                        className="form-control"
                                        onChange={this.onInputChange}
                                        value={this.state.annualLeave} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                    <Col md={8}>
                                        <Control.text model=".overTime" id="overTime" name="overTime" 
                                        onChange={this.onInputChange}
                                        className="form-control"
                                        value={this.state.overTime} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10,offset:2}}>
                                        <Button type="submit" color="primary">Cập nhật</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength =  (len) => (val) => {
    if (val && val.length > 0) return val && (val.length >= len);
    else return true;
}

export default StaffDetail;