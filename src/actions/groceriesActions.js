


export const deleteGrocery = (groceries, id) => {
       const filteredGroceries = groceries.filter(item => item.id !== id)
       localStorage.setItem('groceries', JSON.stringify(filteredGroceries));
}


export const changeStatus = (e, groceries, id) => {
       const index = groceries.findIndex(elem => elem.id === id)
       let statusHistory = groceries[index].statusHistory ? 
       groceries[index].statusHistory : [];

       statusHistory.push(new Date());

       groceries[index].statusHistory = statusHistory;
       groceries[index].status = e.target.value;

       localStorage.setItem('groceries', JSON.stringify(groceries));
}

