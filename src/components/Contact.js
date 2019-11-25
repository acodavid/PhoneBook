import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteContact } from '../actions/phoneBookActions'

class Contact extends Component {

    onDeleteClick(id) {
        this.props.deleteContact(id);
    }

    render() {

        const { id, name, email, number, tags } = this.props.contact;

        return (
            <div className="container">
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <table className="table table-hover">
                            <tbody>
                                <tr className="table-light">
                                    <th scope="row" className="text-primary">Name:</th>
                                    <td className="text-primary">{name}</td>
                                </tr>
                                {email !== '' ? (
                                    <tr className="table-light">
                                        <th scope="row" className="text-primary">Email:</th>
                                        <td className="text-primary">{email}</td>
                                    </tr>
                                ) : null}

                                <tr className="table-light">
                                    <th scope="row" className="text-primary">Number:</th>
                                    <td className="text-primary">{number}</td>
                                </tr>

                                {tags[0] !== '' ? (
                                    <tr className="table-light">
                                        <th scope="row" className="text-primary">Tags:</th>
                                        <td className="text-primary">{tags[0]}</td>
                                    </tr>
                                ) : null}

                                {tags[1] !== '' ? (
                                    <tr className="table-light">
                                        <th></th>
                                        <td className="text-primary">{tags[1]}</td>
                                    </tr>
                                ) : null}

                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-6">
                                <Link to={`/contact/update/${id}`} className="btn btn-outline-warning btn-block mb-3">Edit</Link>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-outline-danger btn-block" onClick={this.onDeleteClick.bind(this, id)}>Delete</button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired
}

export default connect(null, { deleteContact })(Contact);
