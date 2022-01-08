import {fetchUsersData, fetchIngredientsData, fetchRecipesData} from './apiCalls';

import Recipe from './classes/Recipe';
import User from './classes/User';
import Ingredient from './classes/Ingredient';
import RecipeRepository from './classes/RecipeRepository';
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
  pantryBtn
} from './domUpdates';

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
favoritesSection.addEventListener('dblclick', removeFromFavorites);
returnBtn.addEventListener('click', () => {displayAllRecipes(recipeClasses)});
//Menu Buttons
allRecipesBtn.addEventListener('click', () => {displayAllRecipes(recipeClasses)});
favoritesBtn.addEventListener('click', () => {displayFavorites()});
toCookBtn.addEventListener('click', () => {displayToCook()});
pantryBtn.addEventListener('click', () => {displayUserPantry()});
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


async function fetchAllData() {
  const response = await Promise.all([fetchUsersData(), fetchIngredientsData(), fetchRecipesData()])

  return response
}

function getUser() {
  let userIndex = getRandomIndex(usersData);
  currentUser = new User(usersData[userIndex]);
  currentUserName = currentUser.name;
  currentUserId = currentUser.id;
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
    userMessage.innerHTML =
      `<h2>Lookin' Good ${currentUserName}!<br>Let's Get Cookin'!</h2>`;
  })
}

function selectRecipeCard() {
  const recipeId = Number(event.target.parentNode.id);
  myCurrentRecipeId = recipeId;
  displayRecipeCard(recipeClasses, ingredientsData);
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

export {currentUser};
export {recipeRepo};