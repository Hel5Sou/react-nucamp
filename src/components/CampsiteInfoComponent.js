import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading } from './LoadingComponent';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

    function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        ); 
    }


   function FormatDate(date) {
        return(
            new Intl.DateTimeFormat('en-US', 
            { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)))  
        );
    }
  
    function RenderComments({comments, addComment, campsiteId}) {
       if (comments) {
        return(
            <div className="col-md-5 m-1">
                <h4 className="header">Comments</h4>
                {comments.map (comment => (
                    <div>
                        <div key={comment.id}>{comment.text}</div>
                        <div key={comment.id}>{comment.author} {FormatDate(comment.date)}</div>
                    </div> 
                )
                    )}
                <CommentForm campsiteId={campsiteId} addComment={addComment} />         
            </div>    
        )
    }
         return <div />
    }

    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state={
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
            toggleModal() {
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                });
            }
        
            handleSubmit(values) {
                this.toggleModal();
                this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
            }

    
        render() {
            return(
                <div>
                    
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil fa-lg" /> {''}Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <div className="form-group">
                                        <Label htmlFor="rating">Rating </Label>
                                        <Control.select name="rating" model=".rating" id="rating" className="form-control" defaultValue="1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>    
                                            
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="author">Your Name </Label>
                                        <Control.text model=".author" id="author" name="author"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{ 
                                                    minLength: minLength(2),
                                                    maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                component="div"
                                                messages={{
                                                    minLength: 'Must be at least 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                    </div>
                                    
                                    <div className="form-group">
                                        <Label htmlFor="text">Comment </Label>
                                        <Control.textarea name="text" placeholder= "Comment" model=".text" id="text" className="form-control" rows="6" 
                                        />
                                    </div>
                                    <Button type="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }
    }

    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                    <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                 </div>
            </div> 
            <div className="row">
                        <RenderCampsite campsite ={props.campsite} />
                        <RenderComments 
                            comments={props.comments}
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                    />
                    </div>
                </div>
            );
        }
        return <div />;
    }


export default CampsiteInfo;