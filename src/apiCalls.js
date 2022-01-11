function fetchUsersData() {
 return fetch("http://localhost:3001/api/v1/users")
 .then(response => response.json())
 .catch(err => showError(err));
}

const showError = (err) => {
  const errorField = document.querySelector('.js-error');
  if(error.message === '404 (Not Found)') {
    errorField.innerHTML = `<h4>Hey something went wrong, check your network.</h4>`
  }
  errorField.innerText = '${error.message}'
}


function fetchIngredientsData() {
  return fetch("http://localhost:3001/api/v1/ingredients")
  .then(response => response.json())
  .catch(err => console.log(err));
 }

 function fetchRecipesData() {
  return fetch("http://localhost:3001/api/v1/recipes")
  .then(response => response.json())
  .catch(err => console.log(err));
 }

 const postToPantry = (missingIngredients) => {
    return fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(missingIngredients),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

 export {fetchUsersData, fetchIngredientsData, fetchRecipesData, postToPantry};
