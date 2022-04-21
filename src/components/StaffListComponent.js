import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Input, FormGroup, Form, Button, Col, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback } from 'reactstrap';
import { Field,Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { Fade, Stagger, FadeTransform } from 'react-animation-components';

function RenderStaff({staff}) {
    return(
        <Card className='text-center border border-secondary'>
            <Link to={`/staffs/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />
            </Link>
            <CardTitle className='pb-0'>{staff.name}</CardTitle>
        </Card>
    );
};

function ListStaff ({staffs, isLoading, errMess, fetchStaffsOfDepartment}) {
    if (isLoading) {
        fetchStaffsOfDepartment;
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <div>
                <h4>{errMess}</h4>
            </div>
        );
    }
    else {
        if (staffs.length > 0) {
            return staffs.map((staff) => {
                return (
                    <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-2 mb-2">
                        <FadeTransform in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <RenderStaff staff={staff} />
                        </FadeTransform>
                    </div>
                );
            })
        }
        else {
            return (
                <div>
                    <h4 className='col-12 col-md-12 col-lg-12'>Không tìm thấy kết quả!</h4>
                </div>
            );
        }
    }
}

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

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength =  (len) => (val) => {
    if (val && val.length > 0) return val && (val.length >= len);
    else return true;
}

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            isModalOpen: false,
            doB: '',
            startDate: '',
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
      
      onSearchInputChange(keyword) {
        this.setState({searchInput: keyword});
      }
    
      handleSearch(event) {
        event.preventDefault();
        let keyword = event.target.search.value;
        this.onSearchInputChange(keyword);
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
        
    }

    render() {

        let staffs = this.props.staffs;
        if (this.state.searchInput != "") {
            staffs = staffs.filter((staff) => staff.name.toLowerCase().search(this.state.searchInput.toLowerCase()) != -1);
        }
    
        return (
            <div className="container-fluid pl-5 pr-5">
                <div className="row mt-2">
                    <h2 className="col-10 col-md-4 col-lg-4">Nhân viên</h2>
                    <div className='col-2 col-md-2 col-lg-2'>
                      <button className="btn btn-secondary" onClick={this.toggleModal}> <i className='fa fa-plus'></i> </button>
                    </div>
                    <Form className="col-12 col-md-6 col-lg-6" onSubmit={this.handleSearch}>
                      <Row className="form-group">
                        <Col className="col-10">
                          <Input type="text" id="search" name="search" />
                        </Col>
                        <Col className="col-2">
                          <Button type="submit" color="primary">Tìm</Button>
                        </Col>
                      </Row>
                    </Form>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={4}>Tên</Label>
                                    <Col md={8}>
                                        <Control.text model=".name" id="name" name="name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(2), maxLength: maxLength(30)
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập ',
                                                minLength: 'Yêu cầu ít nhất 2 ký tự ',
                                                maxLength: 'Yêu cầu nhiều nhất 30 ký tự '
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                    <Col md={8}>
                                        <Control type="date" model=".doB" id="doB" name="doB" className="form-control"
                                            value={this.state.doB} 
                                            onChange={this.onInputChange}
                                            validators={{
                                                required
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".doB"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                    <Col md={8}>
                                        <Control type="date" model=".startDate" id="startDate" name="startDate" className="form-control"
                                            value={this.state.startDate}
                                            onChange={this.onInputChange}
                                            validators={{
                                                required
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".startDate"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập',
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="department" md={4}>Phòng ban</Label>
                                    <Col md={8}>
                                        <Control.select model=".department" id=""name="department" className='form-control' >
                                            <ListDepartment departments={this.props.departments} isLoading={this.props.departmentsLoading} errMess={this.props.deparmentsErrMess} />
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                    <Col md={8}>
                                        <Control.text model=".salaryScale" id="salaryScale" name="salaryScale" 
                                        className="form-control"
                                        defaultValue={1} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                    <Col md={8}>
                                        <Control.text model=".annualLeave" id="annualLeave" name="annualLeave" 
                                        className="form-control"
                                        defaultValue={0} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                    <Col md={8}>
                                        <Control.text model=".overTime" id="overTime" name="overTime" 
                                        className="form-control"
                                        defaultValue={0} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10,offset:2}}>
                                        <Button type="submit" color="primary">Send Feedback</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
                <hr/>
                <div className="row mb-2" style={{'text-align':'center'}}>
                <ListStaff staffs={staffs} isLoading={this.props.staffsLoading} errMess={this.props.staffsErrMess} fetchStaffsOfDepartment={this.props.fetchStaffsOfDepartment} />
                </div>
            </div>
        );
    }
};

export default  StaffList;