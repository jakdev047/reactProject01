import React, { Component } from 'react'

// react-router
import {HashRouter as Router,Route,Switch} from 'react-router-dom';

// import contact.js
import Header from './component/layout/header';
import About from './component/pages/About';
import NotFounds from './component/pages/NotFounds';
import AddContact from './component/contacts-section/addContact';
import Contacts from './component/contacts-section/contacts';
import EditContact from './component/contacts-section/editContact';

import { Provider } from './context';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {

    return (
      <Provider>
        <Router>
          <div className="App">
            <Header  />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFounds} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App;
