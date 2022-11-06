import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Listings from './components/pages/Listings';
import Post from './components/pages/Post';
import WallOfText from './components/pages/WallOfText';
import EditListing from './components/pages/EditListing';
import SingleListing from './components/SingleListing';
import ErrorPage from './components/pages/ErrorPage'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/listings/:phrase?' component={Listings} />
          <Route exact path='/post' component={Post} />
          <Route path='/some-text' component={WallOfText} />
          <Route path='/uniquelisting/:id' component={SingleListing} />
          <Route path='/listing/edit/:id' component={EditListing} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;