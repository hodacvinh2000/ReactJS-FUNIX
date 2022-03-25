import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

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

    function RenderComments({comments}) {

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
            </div>
        );
    }

    const DishDetail = (props) => {
        console.log(props.dish);
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
    }

export default DishDetail;