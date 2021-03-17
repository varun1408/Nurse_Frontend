import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import ViewProfile from './components/nurse/viewProfile';
import SearchNurse from './components/nurse/searchNurse';

const AppContainer = function (props) {
  if (props) {
    const url = props.location.pathname.split("/")[1];

    console.log('url', url);
    return (
      <Router>
            <div>
            {/* <Route path="/sider-menu" exact component={SideMenu} /> */}
            <Route render={(props)=> <Header {...props}/>} />
            <Switch>
              <Route path="(/|/home)" exact component={Home} />
              <Route path="/nurse/:nurseUsername" component={ViewProfile} />
              <Route path="/search-nurse" exact component={SearchNurse} />
            </Switch>
            <Route render={(props) => <Footer {...props}/>}/>
            </div>
      </Router>
    )
  }
  return null;
}

export default AppContainer;
