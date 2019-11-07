import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const Header = (props) => {
  const {appTitle} = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">{appTitle}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">

            <li className="nav-item active">
              <Link className="nav-link" to="/"><i className="fa fa-home"></i> Home</Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/contact/add"><i className="fa fa-plus"></i> Contact Add</Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/about"><i className="fa fa-question"></i> About</Link>
            </li>

          </ul>
          
        </div>
      </div>
    </nav>
  )
}

Header.defaultProps = {
  appTitle: 'Contact Manager'
}

Header.propTypes = {
  appTitle: PropTypes.string.isRequired
}

export default Header;
