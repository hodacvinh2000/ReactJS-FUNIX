import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from 'dateformat';

    function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">   
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
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
            <div className="col-12 col-md-5 m-1">   
                <h3>Comments</h3>
                {comment}
            </div>
        );
    }

    const Dishdetail = (props) => {
        console.log(props.dish);
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
        );
    }

export default Dishdetail;