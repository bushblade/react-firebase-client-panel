import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import posed from 'react-pose'

import Spinner from '../layouts/Spinner'

const Table = posed.table({
  from: { opacity: 0 },
  to: {
    staggerChildren: 100,
    opacity: 1,
    beforeChildren: true
  }
})

const Trow = posed.tr({
  from: { x: -100, opacity: 0 },
  to: { x: 0, opacity: 1 }
})

class Clients extends Component {
  render() {
    const { clients } = this.props
    // const { clients } = false

    if (clients) {
      const totalBalance = clients.reduce((acc, { balance }) => {
        acc += parseFloat(balance.toString())
        return acc
      }, 0)

      return (
        <>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{' '}
                <span className="text-primary">£{parseFloat(totalBalance).toFixed(2)}</span>
              </h5>
            </div>
          </div>
          <Table className="table table-striped" initialPose={'from'} pose={'to'}>
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(({ id, firstName, lastName, email, phone, balance }) => (
                <Trow key={id}>
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
                </Trow>
              ))}
            </tbody>
          </Table>
        </>
      )
    } else {
      return <Spinner />
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
    clients: state.firestore.ordered.clients
  }))
)(Clients)
