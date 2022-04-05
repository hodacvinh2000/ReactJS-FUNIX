import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Control, LocalForm, Errors } from "react-redux-form";

    function RenderDish({dish}) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments, onClick}) {

        const comment = comments.map((comment) => {
            let date = new Date(comment.date);
            return (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {dateFormat(date,"mmm, dd yyyy")}</p>
                </div>
            );
        });

        return (
            <div>   
                <h3>Comments</h3>
                {comment}
                <button className="form-control text-secondary col-5 col-md-5 col-lg-5" onClick={() => onClick()}>
                    <i className="fa fa-pencil"></i> Submit Comment
                </button>
            </div>
        );
    }

    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class DishDetail extends Component {

        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false,
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(event) {
            this.toggleModal();
            alert("Rating: " + this.rating.value + " Yourname: " + this.yourname.value
                + " Comment: " + this.comment.value);
            event.preventDefault();
    
        }

        render() {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={this.props.comments} onClick={this.toggleModal}/>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control type="number" model=".rating" min={1} max={5} defaultValue={1} id="rating" name="rating"
                                            innerRef={(input) => this.rating = input}
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="yourname" md={12}>Your name</Label>
                                    <Col md={12}>
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                            innerRef={(input) => this.yourname = input} 
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>
                                        Comment
                                    </Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" name="comment" id="comment" style={{'height':'200px'}}
                                            innerRef={(input) => this.comment = input}
                                            className="form-control"  />
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }

export default DishDetail;