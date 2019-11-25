import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { postContact } from '../actions/phoneBookActions';

class CreateContact extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            number: '',
            tag1: '',
            tag2: '',
            errors: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const { name, email, number, tag1, tag2 } = this.state;

        if (name === '' && number === '') {
            this.setState({
                errors: {
                    name: 'Name is required',
                    number: 'Number is required'
                }
            });
            return;
        }

        if (name === '') {
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }

        if (number === '') {
            this.setState({ errors: { number: 'Number is required' } });
            return;
        }

        const newContact = {
            name,
            email,
            number,
            tags: [tag1, tag2]
        }

        this.props.postContact(newContact, this.props.history);

        this.setState({
            name: '',
            email: '',
            number: '',
            tag1: '',
            tag2: '',
            errors: {}
        })

    }


    render() {

        const { name, email, number, tag1, tag2, errors } = this.state;

        return (
            <div className="container">
                <h3 className="text-primary mb-3" id="element1">Create Contact</h3>
                <Link to="/" className="btn btn-outline-primary mb-3" id="element2">Back</Link>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" onChange={this.onChange} value={name} placeholder="Name" name="name" id="name" className={classnames('form-control form-control-lg mb-2', { 'is-invalid': errors.name })} />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={this.onChange} value={email} placeholder="Email" name="email" id="email" className="form-control form-control-lg mb-2" />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={this.onChange} value={number} placeholder="Number" name="number" id="number" className={classnames('form-control form-control-lg mb-2', { 'is-invalid': errors.number })} />
                        {errors.number && (<div className="invalid-feedback">{errors.number}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={this.onChange} value={tag1} placeholder="Tag" name="tag1" id="tag1" className="form-control form-control-lg mb-2" />
                    </div>
                    {tag1 === '' ? null : (
                        <div className="form-group">
                            <input type="text" onChange={this.onChange} value={tag2} placeholder="Tag" name="tag2" id="tag2" className="form-control form-control-lg mb-2" />
                        </div>
                    )}

                    <button onSubmit={this.onSubmit} className="btn btn-outline-primary btn-block mb-3">Add Contact</button>
                </form>
            </div>
        )
    }
}

CreateContact.propTypes = {
    postContact: PropTypes.func.isRequired
}


export default connect(null, { postContact })(withRouter(CreateContact));
