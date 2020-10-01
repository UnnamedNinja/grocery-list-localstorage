import React, { Component } from 'react';
import GroceryListItem from './GroceryListItem';
import { deleteGrocery, changeStatus } from '../../actions/groceriesActions'
import AddGrocery from './AddGrocery';



class GroceryList extends Component {

       state = {
              groceries: [],
              filter: 'all'
       }

       errorRef = React.createRef();

       componentDidMount() {
              let groceries = localStorage.getItem('groceries');
              groceries = groceries ? JSON.parse(groceries) : []
              this.setState({
                     groceries
              })
       }

       handleChange = (e) => {
              this.setState({
                     [e.target.name]: e.target.value
              })
       }

       handleAddGrocery = (grocery) => {
              if (this.state.groceries.find(item => item.name === grocery.name)) {
                     this.errorRef.current.style.display = 'block';
              } else {
                     localStorage.setItem('groceries', JSON.stringify([...this.state.groceries, grocery]))
                     this.setState({
                            groceries: JSON.parse(localStorage.getItem('groceries'))
                     })
              }
       }

       handleChangeStatus = (e, id) => {
              changeStatus(e, this.state.groceries, id)
              this.setState({
                     groceries: JSON.parse(localStorage.getItem('groceries'))
              })
       }


       handleDelete = (id) => {
              deleteGrocery(this.state.groceries, id)
              this.setState({
                     groceries: JSON.parse(localStorage.getItem('groceries'))
              })
       }

       render(){
              return ( 
                     <section className="grocery-list-page" >
                            <div className="container">
                            <h2 className="text-center">Grocery List</h2>
                            <div className="grocery-list">
                                   <select name="filter" onChange={this.handleChange}>
                                          <option value="all">all</option>
                                          <option value="have">have</option>
                                          <option value="ran out">ran out</option>
                                   </select>
                                   <ul>
                                          { this.state.groceries.length ? this.state.groceries
                                          .sort((a, b) => {
                                                 if (a.priority === b.priority) {
                                                        return a.name[0].charCodeAt() - b.name[0].charCodeAt()
                                                 }
                                                 return b.priority - a.priority
                                          })
                                          .map(product => {
                                                 if (product.status === this.state.filter || this.state.filter === 'all') {
                                                        return (
                                                               <GroceryListItem 
                                                                      name={product.name}
                                                                      status={product.status}
                                                                      priority={product.priority}
                                                                      statusHistory={product.statusHistory}
                                                                      key={product.id}
                                                                      id={product.id}
                                                                      changeStatus={this.handleChangeStatus}
                                                                      deleteGrocery={this.handleDelete}
                                                               />
                                                 )
                                                 } return null
                                          }) : (
                                                 <h4 className="text-center">No products yet</h4>
                                          )}
                                   </ul>
                            </div>
                            <div ref={this.errorRef} className="text-center text-danger error-message mb-3">
                                   <h5>There is already such grocery</h5>
                            </div>
                            <AddGrocery 
                                   handleAddGrocery={this.handleAddGrocery}
                            />
                            </div>
                     </section>
              );
       }
}
 
export default GroceryList;