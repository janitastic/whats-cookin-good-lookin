// Your fetch requests will live here!


console.log('I will be a fetch request!')

function fetchUsersData() {
 return fetch("http://localhost:3001/api/v1/users")
 .then(response => response.json())
//  .then(data => console.log(data))
 .catch(err => console.log(err));
}

function fetchIngredientsData() {
  return fetch("http://localhost:3001/api/v1/ingredients")
  .then(response => response.json())
  // .then(data => console.log(data))
  .catch(err => console.log(err));
 }

 function fetchRecipesData() {
  return fetch("http://localhost:3001/api/v1/recipes")
  .then(response => response.json())
  // .then(data => console.log(data))
  .catch(err => console.log(err));
 }

 export {fetchUsersData, fetchIngredientsData, fetchRecipesData};