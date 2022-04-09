import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Input, FormGroup, Form, Button, Col, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback } from 'reactstrap';
import { Field,Control, LocalForm, Errors } from 'react-redux-form';

function RenderStaff({staff}) {
    return(
        <Card className='text-center border border-secondary'>
            <Link to={`/staff/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />
            </Link>
            <CardTitle className='pb-0'>{staff.name}</CardTitle>
        </Card>
    );
};
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
            department: ''
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
        if (values.doB != '' && values.startDate != '' && values.name) {
            let newStaff = {
                name: values.name,
                doB: values.doB,
                salaryScale: values.salaryScale,
                startDate: values.startDate,
                department: (values.department) ? this.props.departments.filter((department) => department.id === values.department)[0] : this.props.departments[0],
                annualLeave: values.annualLeave,
                overTime: values.overTime,
                image: '/assets/images/alberto.png',
            }
            let staffs = JSON.parse(localStorage.getItem('staffs'));
            let maxId = staffs.map((staff)=>{return staff.id}).reduce(function(a,b){
                return (a>b)?a:b;
            });
            newStaff['id'] = maxId + 1;
            staffs.push(newStaff);
            localStorage.setItem('staffs',JSON.stringify(staffs));
            this.props.parentCallback(staffs);
            console.log(newStaff);
        }
    }

    render() {

        let staffs = this.props.staffs;
        if (this.state.searchInput != "") {
            staffs = staffs.filter((staff) => staff.name.toLowerCase().search(this.state.searchInput.toLowerCase()) != -1);
        }
        const ListStaff = staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-2 mb-2">
                    <RenderStaff staff={staff} onClick={this.props.onClick} />
                </div>
            );
        })
    
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
                                            {this.props.departments.map((department) => {
                                                return(
                                                    <option value={department.id}>{department.name}</option>
                                                );
                                            })}
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
                {staffs.length > 0 ? ListStaff :
                    <h3 className='col-12 col-md-12 col-lg-12'>Không tìm thấy kết quả!</h3>
                }
                </div>
            </div>
        );
    }
};

export default  StaffList;