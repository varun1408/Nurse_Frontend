import React, {Component} from 'react';

import queryString from 'query-string'
import { getNurses } from "../../../redux/actions/NurseActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";


class SearchNurseFilter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: queryString.parse(this.props.location.search).name || ''
        };
    }

    handleChange = event => {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
        this.props.getNurses({name: event.target.value});
        
    };
      /* handleChange = date => {
        this.setState({
          startDate: date
        });
      };   */
    render(){
        return(
            <div className="card search-filter">
                <div className="card-header">
                    <h4 className="card-title mb-0">Search Filter</h4>
                </div>
                <div className="card-body">
                    <div className="filter-widget">
                        <input type="text" className="form-control" placeholder="Filter nurse by name" value={this.state.name} onChange={this.handleChange} name="name" />
                    </div>
                    <div className="btn-search">
                        <button type="button" className="btn btn-block">Search</button>
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
  )(SearchNurseFilter)
);