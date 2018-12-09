import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddClient extends Component {
  state = {
    firstName: {
      field: 'firstName',
      val: '',
      text: 'First Name',
      required: true,
      minLength: 2,
      type: 'text'
    },
    lastName: {
      field: 'lastName',
      val: '',
      text: 'Last Name',
      required: true,
      minLength: 2,
      type: 'text'
    },
    email: {
      field: 'email',
      val: '',
      text: 'Email',
      required: false,
      minLength: 0,
      type: 'email'
    },
    phone: {
      field: 'phone',
      val: '',
      text: 'Phone',
      required: true,
      minLength: 10,
      type: 'text'
    },
    balance: {
      field: 'balance',
      val: '',
      text: 'Balance',
      required: false,
      minLength: 0,
      type: 'text'
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(state => ({
      [name]: { ...state[name], val: value }
    }))
  }

  submit = e => {
    e.preventDefault()

    const {
      state: { firstName, lastName, email, phone, balance },
      props: { firestore, history }
    } = this

    const newClient = {
      firstName: firstName.val,
      lastName: lastName.val,
      email: email.val,
      phone: phone.val,
      balance: balance.val === '' ? 0 : balance.val
    }

    firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'))
  }

  render() {
    const { state, onChange, submit } = this
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={submit}>
              {Object.values(state).map(({ field, val, text, required, minLength, type }) => (
                <div className="form-group" key={field}>
                  <label htmlFor={field}>{text}</label>
                  <input
                    type={type}
                    className="form-control"
                    name={field}
                    minLength={minLength}
                    required={required}
                    onChange={onChange}
                    value={val}
                  />
                </div>
              ))}
              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddClient)