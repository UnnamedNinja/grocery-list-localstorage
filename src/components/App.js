import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Grocery from './groceries/Grocery';
import GroceryList from './groceries/GroceryList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GroceryList}/>
          <Route path="/:grocery_id" component={Grocery} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
