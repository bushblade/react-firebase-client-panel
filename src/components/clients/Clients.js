import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { firestore } from 'firebase'

class Clients extends Component {
  render() {
    const { clients } = this.props

    if (clients) {
      return (
        <>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6"> </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(({ id, firstName, lastName, email, phone, balance }) => (
                <tr key={id}>
                  <td>
                    {firstName} {lastName}
                  </td>
                  <td>{email}</td>
                  <td>£{parseFloat(balance).toFixed(2)}</td>
                  <td>
                    <Link to={`/client/${id}`} className="btn btn-secondary btn-sm">
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.fireStore.ordered.clients
  }))
)(Clients)
