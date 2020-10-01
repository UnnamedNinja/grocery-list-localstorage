import React, { Component } from 'react'
import uuid from 'react-uuid'

class AddGrocery extends Component {


       state = {
              name: '',
              status: 'have',
              priority: '1'
       }

       handleChange = (e) => {
              this.setState({
                     [e.target.name]: e.target.value
              })
       }

       handleSubmit = (e) => {
              e.preventDefault();
              const grocery = {
                     id: uuid(),
                     name: this.state.name,
                     priority: this.state.priority,
                     status: this.state.status,
                     statusHistory: [new Date()]
                     
              }
              this.props.handleAddGrocery(grocery)
              e.target.reset();
       }

       render() {
              return (
                     <div className="add-grocery">
                            <form onSubmit={this.handleSubmit}>
                                   <div className="form-group">
                                          <label htmlFor="name">Name of product</label>
                                          <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange}/>
                                   </div>
                                   <div className="form-group">
                                          <label htmlFor="priority">Priority</label>
                                          <select className="form-control" id="priority" name="priority" onChange={this.handleChange}>
                                                 <option value="1">1</option>
                                                 <option value="2">2</option>
                                                 <option value="3">3</option>
                                                 <option value="4">4</option>
                                                 <option value="5">5</option>
                                          </select>
                                   </div>
                                   <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                          <select className="form-control" id="status" name="status" onChange={this.handleChange}>
                                                 <option value="have">have</option>
                                                 <option value="ran out">ran out</option>
                                          </select>
                                   </div>
                                   <button className="btn btn-secondary" type="submit">Add</button>
                            </form>
                     </div>
              )
       }
}



export default AddGrocery;
