import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

class GroceryListItem extends Component {

       deleteGrocery = () => {
              this.props.deleteGrocery(this.props.id)
       }

       changeStatus = (e) => {
              this.props.changeStatus(e, this.props.id)
       }

       render() {
              return (
                     <li className="grocery-item" id={this.props.id}>
                            <Link className="grocery-name" to={"/" + this.props.id}>{this.props.name}</Link>
                            <select className="grocery-status" onChange={this.changeStatus} value={this.props.status}>
                                   <option value={this.props.status}>{this.props.status}</option>
                                   {this.props.status === "ran out" ? 
                                   <option value="have">have</option>
                                   :
                                   <option value="ran out">ran out</option>}
                            </select>
                            <small className="grocery-history">
                                   {this.props.statusHistory && moment(this.props.statusHistory[this.props.statusHistory.length - 1]).fromNow()}
                            </small>
                            {this.props.priority}
                            <button className="btn btn-primary" onClick={this.deleteGrocery}><i className="fas fa-trash-alt"></i></button>
                     </li>
              )
       }
}


export default GroceryListItem;