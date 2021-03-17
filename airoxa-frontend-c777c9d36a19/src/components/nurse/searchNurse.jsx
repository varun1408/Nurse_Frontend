import React, { Component } from 'react';
import Select from 'react-select';
import SearchNurseFilter from './searchNurseFilter';
import SearchNurseList from './searchNurseList';
import StickyBox from "react-sticky-box";
import queryString from 'query-string';
import { getNurses } from "../../redux/actions/NurseActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import {IMG01} from './img';

class SearchNurse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: queryString.parse(this.props.location.search).location || ''
		};
	}

	componentDidMount(){
        this.props.getNurses();
    }

	render() {
		const options = [
			{ value: 'Select', label: 'Select' },
			{ value: 'Rating', label: 'Rating' },
			{ value: 'Popular', label: 'Popular' },
			{ value: 'Latest', label: 'Latest' },
			{ value: 'Free', label: 'Free' },
		]
		return (
			<div>
				<div className="breadcrumb-bar">
					<div className="container-fluid">
						<div className="row align-items-center">
							<div className="col-md-8 col-12">
								<nav aria-label="breadcrumb" className="page-breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item"><a href="/home">Home</a></li>
										<li className="breadcrumb-item active" aria-current="page">Search</li>
									</ol>
								</nav>
								{(this.state.location && 
									<h2 className="breadcrumb-title">2245 matches found for : Dentist In {this.state.location}</h2>
								)}
							</div>
							<div className="col-md-4 col-12 d-md-block d-none">
								<div className="sort-by">
									<span className="sort-title">Sort by</span>
									<span className="sortby-fliter">
										<Select options={options} />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="container-fluid">

						<div className="row">
							<div className="col-md-12 col-lg-4 col-xl-3">
								<StickyBox offsetTop={20} offsetBottom={20}>
									<SearchNurseFilter />
								</StickyBox>
							</div>

							<div className="col-md-12 col-lg-8 col-xl-9">
								{/* <SearchNurseList /> */}
								{this.props.nurse.NurseList && this.props.nurse.NurseList.results
                				.map((nurse, index) => (
									<div className="card">
										<div className="card-body">
											<div className="doctor-widget">
												<div className="doc-info-left">
													<div className="doctor-img">
													<Link to="/patient/doctor-profile">
														<img src={IMG01} className="img-fluid" alt="User" />
													</Link>
													</div>
													<div className="doc-info-cont">
														<h4 className="doc-name"><Link to={`/nurse/${nurse.username}`}>{nurse.firstName} {nurse.lastName}</Link> </h4>
														<p className="doc-speciality">{nurse.hospitalOrFacility}</p>
														<div className="rating">
															<i className="fas fa-star filled"></i>
															<i className="fas fa-star filled"></i>
															<i className="fas fa-star filled"></i>
															<i className="fas fa-star filled"></i>
															<i className="fas fa-star"></i>
															<span className="d-inline-block average-rating">(35)</span>
														</div>
														<div className="clinic-details">
															<p className="doc-location"><i className="fas fa-map-marker-alt"></i> Newyork, USA</p>
														</div>
													</div>
												</div>
												<div className="doc-info-right">
													<div className="clini-infos">
														<ul>
															<li><i className="far fa-thumbs-up"></i> 100%</li>
															<li><i className="far fa-comment"></i> 35 Feedback</li>
														</ul>
													</div>
													<div className="clinic-booking">
													<Link to={`/nurse/${nurse.username}`} className="view-pro-btn">View Profile</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
								{/* <div className="load-more text-center">
									<a href="#0" className="btn btn-primary btn-sm">Load More</a>
								</div> */}
							</div>
						</div>

					</div>

				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
  getNurses: PropTypes.func.isRequired,
  nurse: state.nurse
});

export default withRouter(
  connect(
    mapStateToProps,
    { getNurses }
  )(SearchNurse)
);