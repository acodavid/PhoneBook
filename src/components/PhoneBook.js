import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContacts } from '../actions/phoneBookActions';

import Contact from './Contact';

class PhoneBook extends Component {

    componentDidMount() {
        this.props.getContacts();
    }

    render() {

        const { contacts } = this.props.phoneBook;

        let content;

        if (contacts === null) {
            content = <h4 className="text-center">Loading...</h4>
        } else {
            if (contacts.length > 0) {
                content = contacts.map(contact => (
                    <Contact key={contact.id} contact={contact} />
                ))
            } else {
                content = <h4 className="text-center">Phone Book is empty...</h4>
            }
        }

        return (
            <div className="container">
                <Link to='/contact/create' className="btn btn-outline-primary btn-block mb-3">Add Contact</Link>
                {content}
            </div>
        )
    }
}

PhoneBook.propTypes = {
    phoneBook: PropTypes.object.isRequired,
    getContacts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    phoneBook: state.phoneBook
});

export default connect(mapStateToProps, { getContacts })(PhoneBook);
