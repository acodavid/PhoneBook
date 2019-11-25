import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import './bootstrap-theme.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PhoneBook from './components/PhoneBook';
import CreateContact from './components/CreateContact';
import EditContact from './components/EditContact';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={PhoneBook} />
          <Route exact path="/contact/create" component={CreateContact} />
          <Route exact path="/contact/update/:id" component={EditContact} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
