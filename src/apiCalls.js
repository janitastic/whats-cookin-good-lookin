// Your fetch requests will live here!

import usersData from "./data/users";


console.log('I will be a fetch request!')

function fetchUsersData() {
 return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
 .then(response => response.json())
//  .then(data => data.usersData);
 .catch(err => console.log(err));
}

function fetchIngredientsData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then(response => response.json())
  // .then(data => console.log(data))
  .catch(err => console.log(err));
 }

 function fetchRecipesData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(response => response.json())
  // .then(data => console.log(data))
  .catch(err => console.log(err));
 }

 export {fetchUsersData, fetchIngredientsData, fetchRecipesData};