import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getContact, updateContact } from '../actions/phoneBookActions'

class EditContact extends Component {
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

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.getContact(this.props.match.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.phoneBook.contact) {
            const contact = nextProps.phoneBook.contact[0];

            if (!contact.tags) {
                contact.tags = '';
            }

            this.setState({
                name: contact.name,
                email: contact.email,
                number: contact.number,
                tag1: contact.tags[0],
                tag2: contact.tags[1]
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(id, e) {
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
            id,
            name,
            email,
            number,
            tags: [tag1, tag2]
        }

        this.props.updateContact(newContact, this.props.history);

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

        const { name, email, errors, number, tag1, tag2 } = this.state;

        return (
            <div className="container">
                <h3 className="text-primary" id="element1">Edit Contact</h3>
                <Link to="/" className="btn btn-outline-primary mb-3 element2" id="element2">Back</Link>
                <form onSubmit={this.onSubmit.bind(this, this.props.match.params.id)}>
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
                    <button onSubmit={this.onSubmit.bind(this, this.props.match.params.id)} className="btn btn-outline-primary btn-block mb-3">Edit Contact</button>
                </form>
            </div>
        )
    }
}

EditContact.propTypes = {
    phoneBook: PropTypes.object.isRequired,
    getContact: PropTypes.func.isRequired,
    updateContact: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    phoneBook: state.phoneBook
})

export default connect(mapStateToProps, { getContact, updateContact })(withRouter(EditContact));
