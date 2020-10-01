import React, { Component } from 'react'
import { deleteGrocery, changeStatus} from '../../actions/groceriesActions'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class Grocery extends Component {

       state = {
              grocery: null
       }

       static getDerivedStateFromProps(props) {
              return {
                     id: props.match.params.grocery_id,
                     index: JSON.parse(localStorage.getItem('groceries')).findIndex(elem => elem.id === props.match.params.grocery_id),
                     groceries: JSON.parse(localStorage.getItem('groceries'))
              }
       }

       componentDidMount() {
              this.setState({
                     grocery: (JSON.parse(localStorage.getItem('groceries'))[this.state.index])
              })
       }

       changeStatus = (e) => {
              changeStatus(e, this.state.groceries, this.state.id)
              this.setState({
                     grocery: JSON.parse(localStorage.getItem('groceries'))[this.state.index]
              })
       }

       handleDelete = () => {
              deleteGrocery(this.state.groceries, this.state.id)
              this.props.history.push('/')
       }

       render() {
              console.log(this.state)
              return (
                     <section className="grocery-page">
                            <div className="container">
                                   <div className="grocery">
                                          <h3 className="text-center">{this.state.grocery?.name}</h3>
                                          <div className="status-and-priority">
                                                 <div className="status">
                                                        <label className="mr-2" htmlFor="selectStatus">Status: </label>
                                                        <select id="selectStatus" onChange={this.changeStatus} value={this.state.grocery?.status}>
                                                               <option value={this.state.grocery?.status}>{this.state.grocery?.status}</option>
                                                               {this.state.grocery?.status === "ran out" ? 
                                                               <option value="have">have</option>
                                                               :
                                                               <option value="ran out">ran out</option>}
                                                        </select>
                                                 </div>
                                                 <div className="priority">
                                                        <p>Priority: {this.state.grocery?.priority}</p>
                                                 </div>
                                          </div>

                                          <div className="status-history">
                                                 <h5 className="text-center">Status changelog</h5>
                                                 {this.state.grocery?.statusHistory && this.state.grocery.statusHistory.map((item, index) => {
                                                        return (
                                                               <p key={index} className="text-center">{moment(item).format('LLLL')}</p>
                                                        )
                                                 })}
                                          </div>
                                          <div className="grocery-btns">
                                                 <button className="btn btn-secondary bg-danger" onClick={this.handleDelete}>Delete</button>
                                                 <Link className="btn btn-secondary" to="/">Go back</Link>
                                          </div>
                                   </div>
                            </div>
                     </section>
              )
       }
}
