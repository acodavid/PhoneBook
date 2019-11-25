import axios from 'axios';
import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, GET_CONTACT, UPDATE_CONTACT } from './types';

export const getContacts = () => dispatch => {
    axios.get('http://localhost:3000/get')
        .then(res => {
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CONTACTS,
                payload: null
            })
        })
}

export const getContact = (id) => dispatch => {
    axios.get(`http://localhost:3000/get/${id}`)
        .then(res => {
            dispatch({
                type: GET_CONTACT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CONTACT,
                payload: null
            })
        })
}

export const postContact = (contact, history) => dispatch => {
    axios.post('http://localhost:3000/post', contact)
        .then(res => {
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
            history.push('/')
        })
        .catch(err => console.log(err))
}

export const deleteContact = (id) => dispatch => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_CONTACT,
                    payload: id
                })
            }).catch(err => console.log(err))
    }

}

export const updateContact = (contact, history) => dispatch => {
    axios.put('http://localhost:3000/put', contact)
        .then(res => {
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
            history.push('/')
        }).catch(err => console.log(err))
}