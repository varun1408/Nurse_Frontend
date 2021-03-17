import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { withRouter } from "react-router-dom";

class homeSearch extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    handleChange = event => {
        event.persist();
        this.setState({
        [event.target.name]: event.target.value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.name) {
            this.props.history.push(`/search-nurse?name=${this.state.name}`);
        } else {
            this.props.history.push(`/search-nurse`);
        }
    };

    render(){
        return(
            <section className="section section-search">
                <div className="container-fluid">
                    <div className="banner-wrapper">
                        <div className="banner-header text-center">
                            <h1>Search Nurse</h1>
                            <p>Discover the best nurses based on user reviews.</p>
                        </div>
                
                        <div className="search-box">
                            <form action="/home" onSubmit={this.handleFormSubmit}>
                                <div className="form-group search-location">
                                    <input type="text" className="form-control" name="location" placeholder="Search Location" onChange={this.handleChange} />
                                    <span className="form-text">Based on your Location</span>
                                </div>
                                <div className="form-group search-info">
                                    <input type="text" className="form-control" name="name" placeholder="Search Nurses" onChange={this.handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary search-btn">  
                                 <FontAwesomeIcon icon={faSearch} /> <span>Search</span></button>
                            </form>
                        </div>
                      
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(homeSearch);