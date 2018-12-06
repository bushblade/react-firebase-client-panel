import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Clients extends Component {
  render() {
    const clients = [
      {
        id: '343434',
        firstName: 'Kevin',
        lastName: 'Johnson',
        email: 'kevin@gmail.com',
        phone: '555-555-5555',
        balance: '30'
      },
      {
        id: '345656',
        firstName: 'Bob',
        lastName: 'Pickering',
        email: 'bob@gmail.com',
        phone: '444-555-5555',
        balance: '1160'
      }
    ]

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

export default Clients
