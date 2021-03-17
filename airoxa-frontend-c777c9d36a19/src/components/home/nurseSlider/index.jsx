import React, { Component } from 'react';
import { IMG01, IMG02, IMG03, IMG04 } from './img.jsx';
//slider
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import { getNurses } from "../../../redux/actions/NurseActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HomeNurseSlider extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getNurses();
    }

    render(){
        const settings = {
            width:400,
            dots:false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            centerPadding: '10px',
            arrows: true,
            centerMode: false,
            responsive: [
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                      
                    }
                },
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                      
                    }
                }
            ]

          };
        return(
            <section className="section section-doctor">
    <div className="container-fluid">
       <div className="row">
            <div className="col-lg-4">
                <div className="section-header ">
                    <h2>Search Nurse</h2>
                    <p>Lorem Ipsum is simply dummy text </p>
                </div>
                <div className="about-content">
                    <p>It is a long established fact that a reader will be distracted by the readable 
                        content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
                    <p>web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes</p>					
                    <Link to="" >View All</Link>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="doctor-slider slider">
                <Slider {...settings}>
                {this.props.nurse.NurseList && this.props.nurse.NurseList.results
                .map((nurse, index) => (
                    <div className="profile-widget">
                        <div className="doc-img">
                        <Link to={`/nurse/${nurse.username}`}>
                                <img className="img-fluid" alt="User" src={IMG04} />
                            </Link>
                        </div>
                        <div className="pro-content">
                            <h3 className="title">
                                <Link to={`/nurse/${nurse.username}`}>{nurse.firstName} {nurse.lastName}</Link> 
                                <i className="fas fa-check-circle verified"></i>
                            </h3>
                            <p className="speciality">{nurse.hospitalOrFacility}</p>
                            <div className="rating">
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star"></i>
                                <span className="d-inline-block average-rating">(4)</span>
                            </div>
                            <ul className="available-info">
                                <li>
                                    <i className="fas fa-map-marker-alt"></i> Louisiana, USA
                                </li>
                            </ul>
                            <div className="row row-sm">
                                <div className="col">
                                <Link to={`/nurse/${nurse.username}`} className="btn view-btn">View Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
              
                </Slider>    
                </div>
            </div>
       </div>
    </div>
</section>
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
  )(HomeNurseSlider)
);