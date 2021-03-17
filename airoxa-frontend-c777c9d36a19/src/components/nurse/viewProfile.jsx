import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Tabs, Tab, Spinner } from 'react-bootstrap';
import { Modal, Form, Col, Button, Toast } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';

import { IMG01, IMG02, IMG03, IMG04, IMG05, IMG06, IMG07, IMG08 } from './img';

import { getNurse, addReview, getReviews } from "../../redux/actions/NurseActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import * as Rating from 'react-rating';


class ViewProfile extends Component {
	constructor(props) {
		super(props);
        this.state = {
			key: 1,
			nurseData: {},
			reviewCount: 0,
			reviews: []
		}
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentWillMount(){
		this.props.getNurse(this.props.match.params);
		this.props.getReviews(this.props.match.params);
	}

	componentDidUpdate(prevProps){
		if(prevProps !== this.props) {
			this.setState({
				nurseData: this.props.nurse.NurseData,
				reviews: this.props.nurse.NurseReviews ? this.props.nurse.NurseReviews.results : [],
				reviewCount: this.props.nurse.NurseReviews ? this.props.nurse.NurseReviews.totalResults : 0
			})
		}
	}

    handleSelect(key) {
		this.setState({ key })
	}

	render() {
		const reviewFormValidationSchema = Yup.object({
			reviewerName: Yup.string().required('Please enter display name'),
			reviewerEmail: Yup.string().email('Please enter valid email').required('Please enter email'),
			reviewTitle: Yup.string(),
			review: Yup.string(),
			rating: Yup.number().required('Please select your rating').positive().integer()
		});
		return (
		<>
			<div>
				<div className="breadcrumb-bar">
					<div className="container-fluid">
						<div className="row align-items-center">
							<div className="col-md-12 col-12">
								<nav aria-label="breadcrumb" className="page-breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
										<li className="breadcrumb-item active" aria-current="page">Nurse Profile</li>
									</ol>
								</nav>
								<h2 className="breadcrumb-title">Nurse Profile</h2>
							</div>
						</div>
					</div>
				</div>

				<div className="content">
					<div className="container">
						<div className="card">
							<div className="card-body">
								{this.state.nurseData ? 
								<div className="doctor-widget">
									<div className="doc-info-left">
										<div className="doctor-img">
											<img src={IMG01} className="img-fluid" alt="User" />
										</div>
										<div className="doc-info-cont">
											<h4 className="doc-name">{this.state.nurseData.firstName} {this.state.nurseData.lastName}</h4>
											<p className="doc-speciality">{this.state.nurseData.hospitalOrFacility}</p>
											<div className="rating">
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star filled"></i>
												<i className="fas fa-star"></i>
												<span className="d-inline-block average-rating">({this.state.reviewCount})</span>
											</div>
											<div className="clinic-details">
												<p className="doc-location">
													<i className="fas fa-map-marker-alt"></i> Newyork, USA</p>
											</div>
										</div>
									</div>
									<div className="doc-info-right">
										<div className="clini-infos">
											<ul>
												<li><i className="far fa-thumbs-up"></i> 99%</li>
												<li><i className="far fa-comment"></i> {`${this.state.reviewCount} Feedback`}</li>
											</ul>
										</div>
									</div>
								</div>
								: <div className="d-flex justify-content-center"><Spinner animation="grow" variant="dark" /></div> }
							</div>
						</div>

						<div className="card">
							<div className="card-body pt-0">
								{this.state.nurseData ? 
								<Tabs
									className="tab-view"
									activeKey={this.state.key}
									onSelect={this.handleSelect}
									id="controlled-tab-example"
								>
									<Tab className="nav-item" eventKey={1} title="Overview">
										<div className="row">
											<div className="col-md-12 col-lg-9">

												<div className="widget about-widget">
													<h4 className="widget-title">About Me</h4>
													<p>{this.state.nurseData.about}</p>
												</div>

											</div>
										</div>
									</Tab>
									<Tab className="nav-item" eventKey={2} title="Reviews">
										<div>
											<div className="widget review-listing">
												<ul className="comments-list">
												{this.state.reviews.length ? this.state.reviews
                								.map((review, index) => (
													<li>
														<div className="comment">
															<img className="avatar avatar-sm rounded-circle" alt="User" src={IMG07} />
															<div className="comment-body">
																<div className="meta-data">
																	<span className="comment-author">{review.reviewerName}</span>
																	<span className="comment-date">{`Reviewed ${moment(review.reviewedAt).fromNow()}`}</span>
																	<div className="review-count rating">
																		{[...Array(review.rating).keys()].map(n => {
																			return (
																				<i className="fas fa-star filled"></i>
																			);
																		})}
																		{[...Array(5 - review.rating).keys()].map(n => {
																			return (
																				<i className="fas fa-star"></i>
																			);
																		})}
																	</div>
																</div>
																<p className="comment-content">{review.review}</p>
															</div>
														</div>
													</li>
													))
													: <div className="d-flex justify-content-center">No reviews found!</div> }

												</ul>

												{/* <div className="all-feedback text-center">
													<a href="#0" className="btn btn-primary btn-sm">
														Show all feedback <strong>(167)</strong>
													</a>
												</div> */}


											</div>

											<div className="write-review">
												<h4>Write a review for <strong>{this.state.nurseData.firstName} {this.state.nurseData.lastName}</strong></h4>

												<Formik
													validationSchema={reviewFormValidationSchema}
													onSubmit={(values, { setSubmitting, resetForm }) => {
														this.props.addReview(this.props.match.params.nurseUsername, values).then(()=>{
															resetForm({})
														});
													}}

													initialValues={{
														reviewerName: '',
														reviewerEmail: '',
														reviewTitle: '',
														review: '',
														rating: '1'
													}}
													>
													{({
														handleSubmit,
														handleChange,
														handleBlur,
														values,
														touched,
														isInvalid,
														errors,
														isSubmitting,
														setFieldValue
													}) => (
														<Form noValidate onSubmit={handleSubmit}>
															<div className="form-group">
																<label>Rating</label>
																<div className="star-rating">
																	<input id="star-5" type="radio" name="rating" value="5" checked={values.rating === "5"} onChange={() => setFieldValue("rating", "5")} />
																	<label htmlFor="star-5" title="5 stars">
																		<i className="active fa fa-star"></i>
																	</label>
																	<input id="star-4" type="radio" name="rating" value="4" checked={values.rating === "4"} onChange={() => setFieldValue("rating", "4")} />
																	<label htmlFor="star-4" title="4 stars">
																		<i className="active fa fa-star"></i>
																	</label>
																	<input id="star-3" type="radio" name="rating" value="3" checked={values.rating === "3"} onChange={() => setFieldValue("rating", "3")} />
																	<label htmlFor="star-3" title="3 stars">
																		<i className="active fa fa-star"></i>
																	</label>
																	<input id="star-2" type="radio" name="rating" value="2" checked={values.rating === "2"} onChange={() => setFieldValue("rating", "2")} />
																	<label htmlFor="star-2" title="2 stars">
																		<i className="active fa fa-star"></i>
																	</label>
																	<input id="star-1" type="radio" name="rating" value="1" checked={values.rating === "1"} onChange={() => setFieldValue("rating", "1")} />
																	<label htmlFor="star-1" title="1 star">
																		<i className="active fa fa-star"></i>
																	</label>
																</div>
															</div>
															
															<Form.Group controlId="formReviewerName">
																<Form.Label>Display Name</Form.Label>
																<Form.Control
																	type="text"
																	name="reviewerName"
																	value={values.reviewerName}
																	onChange={handleChange}
																	isInvalid={!!errors.reviewerName}
																/>
																<Form.Control.Feedback type="invalid">
																	{errors.reviewerName}
																</Form.Control.Feedback>
															</Form.Group>

															<Form.Group controlId="formReviewerEmail">
																<Form.Label>Email</Form.Label>
																<Form.Control
																	type="email"
																	name="reviewerEmail"
																	value={values.reviewerEmail}
																	onChange={handleChange}
																	isInvalid={!!errors.reviewerEmail}
																/>
																<Form.Control.Feedback type="invalid">
																	{errors.reviewerEmail}
																</Form.Control.Feedback>
															</Form.Group>

															<Form.Group controlId="formReviewTitle">
																<Form.Label>Title of your review (optional)</Form.Label>
																<Form.Control
																	type="text"
																	name="reviewTitle"
																	value={values.reviewTitle}
																	onChange={handleChange}
																	isInvalid={!!errors.reviewTitle}
																	placeholder="If you could say it in one sentence, what would you say?"
																/>
																<Form.Control.Feedback type="invalid">
																	{errors.reviewTitle}
																</Form.Control.Feedback>
															</Form.Group>

															<Form.Group controlId="formReview">
																<Form.Label>Your review</Form.Label>
																<Form.Control as="textarea" name="review" onChange={handleChange} rows={3} maxLength="100" />
															</Form.Group>
															
															<Form.Group>
																<div className="terms-accept">
																	<div className="custom-checkbox">
																		{/* <input type="checkbox" id="terms_accept" /> */}
																		<label htmlFor="terms_accept">By submitting this review, I agree to accept 
																<a href="#">Terms &amp; Conditions</a></label>
																	</div>
																</div>
															</Form.Group>
															<div className="submit-section">
																{this.props.nurse.submittingReview ? 
																<Button variant="primary" disabled>
																	Please wait...
																</Button>
																: <Button type="submit" className="btn btn-primary submit-btn">Submit Review</Button>
																}
															</div>
														</Form>
													)}
                    							</Formik>
												{/* <form>
													<div className="form-group">
														<label>Rating</label>
														<div className="star-rating">
															<input id="star-5" type="radio" name="rating" value="5" />
															<label htmlFor="star-5" title="5 stars">
																<i className="active fa fa-star"></i>
															</label>
															<input id="star-4" type="radio" name="rating" value="4" />
															<label htmlFor="star-4" title="4 stars">
																<i className="active fa fa-star"></i>
															</label>
															<input id="star-3" type="radio" name="rating" value="3" />
															<label htmlFor="star-3" title="3 stars">
																<i className="active fa fa-star"></i>
															</label>
															<input id="star-2" type="radio" name="rating" value="2" />
															<label htmlFor="star-2" title="2 stars">
																<i className="active fa fa-star"></i>
															</label>
															<input id="star-1" type="radio" name="rating" value="1" />
															<label htmlFor="star-1" title="1 star">
																<i className="active fa fa-star"></i>
															</label>
														</div>
													</div>
													<div className="form-group">
														<label>Display name</label>
														<input className="form-control" type="text" />
													</div>
													<div className="form-group">
														<label>Title of your review (optional)</label>
														<input className="form-control" type="text"
															placeholder="If you could say it in one sentence, what would you say?" />
													</div>
													<div className="form-group">
														<label>Your review</label>
														<textarea id="review_desc" maxLength="100" className="form-control"></textarea>

														<div className="d-flex justify-content-between mt-3">
															<small className="text-muted"><span id="chars">100</span> characters remaining</small></div>
													</div>

													<div className="form-group">
														<div className="terms-accept">
															<div className="custom-checkbox">
																<input type="checkbox" id="terms_accept" />
																<label htmlFor="terms_accept">I have read and accept
                                                        <a href="#">Terms &amp; Conditions</a></label>
															</div>
														</div>
													</div>
													<div className="submit-section">
														<button type="submit" className="btn btn-primary submit-btn">Submit Review</button>
													</div>
												</form> */}

											</div>
										</div>
									</Tab>
								</Tabs>
								: <div className="d-flex justify-content-center"><Spinner animation="grow" variant="dark" /></div> }
							</div>
						</div>

					</div>
				</div>	
			</div>
		</>
		);

	}
}

const mapStateToProps = state => ({
  getNurse: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  nurse: state.nurse
});

export default withRouter(
  connect(
    mapStateToProps,
    { getNurse, addReview, getReviews }
  )(ViewProfile)
);