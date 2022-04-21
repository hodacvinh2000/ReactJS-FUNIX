import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Input, Form, Button, Col, Row, Breadcrumb, BreadcrumbItem, Card, CardImg, CardTitle} from 'reactstrap';
import { Loading } from "./LoadingComponent";
import {connect} from 'react-redux';
import { fetchStaffsOfDepartment } from '../redux/ActionCreator' ;
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderStaff({staff}) {
    return(
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card className='text-center border border-secondary'>
                <Link to={`/staffs/${staff.id}`} >
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                </Link>
                <CardTitle className='pb-0'>{staff.name}</CardTitle>
            </Card>
        </FadeTransform>
    );
};

function ListStaffsOfDepartment ({staffs, isLoading, errMess}) {
    if (isLoading) {
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
                            <RenderStaff staff={staff} />
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


class StaffsOfDepartment extends Component {

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

    componentDidMount() {
        this.props.fetchStaffsOfDepartment(this.props.departmentId);
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

        let staffs = this.props.staffsOfDepartment.staffs;
        if (this.state.searchInput != "") {
            staffs = staffs.filter((staff) => staff.name.toLowerCase().search(this.state.searchInput.toLowerCase()) != -1);
        }
    
        return (
            <div className="container-fluid pl-5 pr-5">
                <div className="row mt-2">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/departments">Phòng ban</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.departmentId}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-md-4 col-lg-4"></div>
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
                </div>
                <hr/>
                <div className="row mb-2" style={{'text-align':'center'}}>
                <ListStaffsOfDepartment staffs={staffs} isLoading={this.props.staffsOfDepartment.isLoading} errMess={this.props.staffsOfDepartment.errMess} />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    staffsOfDepartment: state.staffsOfDepartment
})

const mapDispatchToProps = (dispatch)=> ({
    fetchStaffsOfDepartment: (id) => dispatch(fetchStaffsOfDepartment(id))
})

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(StaffsOfDepartment));;