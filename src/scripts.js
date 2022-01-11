import {fetchUsersData, fetchIngredientsData, fetchRecipesData, postToPantry} from './apiCalls';

import Recipe from './classes/Recipe';
import User from './classes/User';
import Ingredient from './classes/Ingredient';
import RecipeRepository from './classes/RecipeRepository';
import Pantry from './classes/Pantry';
import domUpdates from './domUpdates';
import {
  allRecipesBtn,
  favoritesBtn,
  toCookBtn,
  returnBtn,
  searchButton,
  favSearchButton,
  searchByName,
  searchByIngredient,
  searchInput,
  favSearchByName,
  favSearchByIngredient,
  favSearchInput,
  addToCookButton,
  favFilterByAppetizer,
  favFilterByBreakfast,
  favFilterByLunch,
  favFilterByDinner,
  favFilterBySides,
  favFilterByCondiments,
  favFilterBySnacks,
  favShowAllButton,
  filterByAppetizer,
  filterByBreakfast,
  filterByLunch,
  filterByDinner,
  filterBySides,
  filterByCondiments,
  filterBySnacks,
  showAllButton,
  favoriteButton,
  displayAllRecipes,
  displayRecipeCard,
  displayFavorites,
  displayToCook,
  filterBySelection,
  toggleDropDown,
  searchByRecipeName,
  searchByIngredients,
  favSearchByRecipeName,
  favSearchByIngredients,
  filterByFavSelection,
  pantryBtn,
  checkPantryBtn,
  displayUserPantry,
  checkForIngredients,
  addToPantry,
  addMissingIngredients,
  selectPantryMenu,
  welcomeUser,
  trashButton,
  removeFromPantry, 
  returnToCook 
} from './domUpdates';
import {currentPantry} from './domUpdates';

              /*********** GLOBAL VARIABLES ***********/

let recipeRepo;
let currentUser;
let recipeData;
let ingredientsData;
let currentUserName;
let usersData = [];
let ingredients;
let currentUserId;
let myCurrentRecipeId;
let currentUserPantry;
let currentUserFavorites;
let recipeClasses;
const tags = {
  appetizers: ['antipasti', 'antipasto', 'starter', 'appetizer', 'hor d\'oeuvre', 'dip', 'spread'],
  breakfast: ['breakfast', 'morning meal', 'brunch'],
  lunch: ['lunch', 'brunch', 'main dish', 'salad'],
  dinner: ['dinner', 'main course', 'main dish', 'salad'],
  sides: ['side dish', 'dip'],
  snacks: ['snack', 'dip'],
  condiments: ['condiment', 'sauce']
};

              /*********** EVENT LISTENERS ***********/

window.addEventListener('load', loadPage);
//Sections
recipeCardSection.addEventListener('click', selectRecipeCard);
toCookSection.addEventListener('click', selectRecipeToCook)
favoritesSection.addEventListener('dblclick', removeFromFavorites);
returnBtn.addEventListener('click', () => {displayAllRecipes(recipeClasses)});
checkPantryBtn.addEventListener('click', () => {selectPantryMenu()});
returnToCook.addEventListener('click', () => {displayToCook()});
//Menu Buttons
allRecipesBtn.addEventListener('click', () => {displayAllRecipes(recipeClasses)});
favoritesBtn.addEventListener('click', () => {displayFavorites()});
toCookBtn.addEventListener('click', () => {displayToCook()});
pantryBtn.addEventListener('click', () => {selectPantryMenu()});
//Main Search Buttons
searchButton.addEventListener('click', () => {toggleDropDown()});
searchByName.addEventListener('click', () => {searchByRecipeName()});
searchByIngredient.addEventListener('click', () => {searchByIngredients(ingredientsData)});
searchInput.addEventListener('keyup', checkInput);
//Favorite Search Buttons
favSearchButton.addEventListener('click', () => {toggleDropDown()});
favSearchByName.addEventListener('click', () => {favSearchByRecipeName()});
favSearchByIngredient.addEventListener('click', () => {favSearchByIngredients(ingredientsData)});
favSearchInput.addEventListener('keyup', favCheckInput);
//To Cook Button
addToCookButton.addEventListener('click', addToCookList);

//Recipe Card Buttons
favoriteButton.addEventListener('click', saveToFavorites);
addToPantry.addEventListener('click', () => {addMissingIngredients();
});
trashButton.addEventListener('click', removeIngredient);

// Filter Favorites
favFilterByAppetizer.addEventListener('click', () => {
  filterByFavSelection(tags.appetizers)
});
favFilterByBreakfast.addEventListener('click', () => {
  filterByFavSelection(tags.breakfast)
});
favFilterByLunch.addEventListener('click', () => {
  filterByFavSelection(tags.lunch)
});
favFilterByDinner.addEventListener('click', () => {
  filterByFavSelection(tags.dinner)
});
favFilterBySides.addEventListener('click', () => {
  filterByFavSelection(tags.sides)
});
favFilterByCondiments.addEventListener('click', () => {
  filterByFavSelection(tags.condiments)
});
favFilterBySnacks.addEventListener('click', () => {
  filterByFavSelection(tags.snacks)
});
favShowAllButton.addEventListener('click', () => {displayFavorites()});

// Filter recipes
filterByAppetizer.addEventListener('click', () => {
  filterBySelection(tags.appetizers)
});
filterByBreakfast.addEventListener('click', () => {
  filterBySelection(tags.breakfast)
});
filterByLunch.addEventListener('click', () => {
  filterBySelection(tags.lunch)
});
filterByDinner.addEventListener('click', () => {
  filterBySelection(tags.dinner)
});
filterBySides.addEventListener('click', () => {
  filterBySelection(tags.sides)
});
filterByCondiments.addEventListener('click', () => {
  filterBySelection(tags.condiments)
});
filterBySnacks.addEventListener('click', () => {
  filterBySelection(tags.snacks)
});
showAllButton.addEventListener('click', () => {displayAllRecipes(recipeClasses)});

              /*********** HELPER FUNCTIONS ***********/

function checkInput() {
  let userInput = searchInput.value;
  if (userInput.value !== null) {
    searchByName.disabled = false;
    searchByIngredient.disabled = false;
  } else {
    searchByName.disabled = true;
    searchByIngredient.disabled = true;
    console.log('please enter something');
  }
}

function favCheckInput() {
  let userInput = favSearchInput.value;
  if (userInput.value !== null) {
    favSearchByName.disabled = false;
    favSearchByIngredient.disabled = false;
  } else {
    favSearchByName.disabled = true;
    favSearchByIngredient.disabled = true;
    console.log('please enter something');
  }
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

              /*********** HOME PAGE FUNCTIONS ***********/


function fetchAllData() {
  const response = Promise.all([fetchUsersData(), fetchIngredientsData(), fetchRecipesData()])
  return response;
}

function fetchUserData() {
  const response = Promise.all([fetchUsersData()])
  return response
}

function getUser() {
  let userIndex = getRandomIndex(usersData);
  currentUser = new User(usersData[userIndex]);
  currentUserName = currentUser.name;
  currentUserId = currentUser.id;
  currentUserPantry = currentUser.pantry;
  return currentUser;
}

function getRecipes() {
  recipeRepo = new RecipeRepository(recipeData);
  recipeClasses = recipeData.map(recipeData => new Recipe(recipeData));
}

function loadPage() {
  fetchAllData().then(data => {
    usersData = data[0]
    ingredientsData = data[1]
    recipeData = data[2]
    getUser();
    getRecipes();
    domUpdates(recipeClasses);
    welcomeUser();
  })
}

function selectRecipeCard() {
  const recipeId = Number(event.target.parentNode.id);
  myCurrentRecipeId = recipeId;
  displayRecipeCard(recipeClasses, ingredientsData);
}

function selectRecipeToCook() {
  const recipeId = Number(event.target.parentNode.id);
  myCurrentRecipeId = recipeId;
  checkForIngredients(recipeClasses, ingredientsData);
}
          /*********** FAVORITE PAGE FUNCTIONS ***********/

function saveToFavorites() {
  const foundRecipe = recipeClasses.find(recipe => recipe.id === myCurrentRecipeId);
  currentUser.addToFavorites(foundRecipe);
  displayFavorites();
}

function removeFromFavorites() {
  const clickedRecipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === clickedRecipeId);
  currentUser.removeFromFavorites(foundRecipe);
  displayFavorites();
}

          /*********** TO COOK PAGE FUNCTIONS ***********/

function addToCookList() {
  const foundRecipe = recipeClasses.find(recipe => recipe.id === myCurrentRecipeId);
  currentUser.addToCook(foundRecipe);
  displayToCook();
}

// function addIngredientsToPantry() {
//   console.log("this is a console log")
//   displayFavorites()
// }


function postIngredient() {
  currentPantry.shoppingList.forEach(item => {
    let ingredient = {userID: currentUser.id, ingredientID: item.ingredient, ingredientModification: item.amount}
    currentPantry.pantry.push(item)
    postToPantry(ingredient).then(ingredient => {
    currentPantry.logPantryIngredients(ingredientsData)
    });
  });
  currentPantry.shoppingList = [];
  console.log('AFTER adding shopping list to pantry should be []', currentPantry.shoppingList)
  displayToCook();
  updatePantryData();
}

function removeIngredient() {
  const foundRecipe = recipeClasses.find(recipe => recipe.id === myCurrentRecipeId);
  // console.log('foundRecipe', foundRecipe);
  console.log('pantry', currentPantry.pantry)

  foundRecipe.ingredients.forEach(item => {
    let ingredient = {userID: currentUser.id, ingredientID: item.id, ingredientModification: -item.quantity.amount}

    //NEED CODE BELOW FOR DOM
    const index = currentPantry.pantry.indexOf(item);
      if (index > -1) {
        currentPantry.pantry.splice(index, 1);
    }

    postToPantry(ingredient).then(ingredient => {
    currentPantry.logPantryIngredients(ingredientsData)
    });
  });

  
  //NEED CODE BELOW FOR DOM
  const index = currentUser.toCook.indexOf(foundRecipe);
  if (index > -1) {
    currentUser.toCook.splice(index, 1);
  }
  updatePantryData();
  displayToCook();
  console.log('pantry after something', currentPantry.pantry)
}

function updatePantryData() {
  fetchUserData().then(data => {
    return currentUser.pantry
  })
}




export {postIngredient};
export {currentUser};
export {recipeRepo};
export {removeIngredient};
