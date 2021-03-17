import React, { Component } from 'react';
import HomeSearch from './search';
import HomeNurseSlider from './nurseSlider';

class Home extends Component{
    render(){
        return(
            <div>
 <div className="main-wrapper">
  <HomeSearch />  
  <HomeNurseSlider />
       </div>
    </div>
        );
    }
}
export default Home;