import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
    }

    renderCampsite(campsite) {
        return(
            <div className="col-md-5 and m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        ); 
    }

    formatDate(date) {
        return(
            new Intl.DateTimeFormat('en-US', 
            { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)))  
        );
    }
  
    renderComments(comments) {
       if (comments) {
        return(
            <div className="col-md-5 and m-1">
                <h4 className="header">Comments</h4>
                {comments.map (comment => (
                    <div>
                        <div key={comment.id}>{comment.text}</div>
                        <div key={comment.id}>{comment.author} {this.formatDate(comment.date)}</div>
                    </div> 
                )
                    )}
            </div>    
        )
    }
         return <div />
    }

    render() {
        if (this.props.campsite) {
            return (
            <div className="row">
                 {this.renderCampsite(this.props.campsite)}
                 {this.renderComments(this.props.campsite.comments)}
            </div>
            );
        }
        return <div />
    }
}

export default CampsiteInfo;