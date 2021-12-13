import './styles.css';
// import './css/index.scss';
import './images/recipe-book.png';
import './images/baking.png';
import './images/like.png';
import apiCalls from './apiCalls';

import Recipe from './classes/Recipe';
import recipeData from './data/recipes';
import User from './classes/User';
import usersData from './data/users';
import Ingredient from './classes/Ingredient';
import RecipeRepository from './classes/RecipeRepository';
import ingredientsData from './data/ingredients';

              /*********** GLOBAL VARIABLES ***********/

let recipeRepo = new RecipeRepository(recipeData);
let currentUser;
let currentUserName;
let currentUserId;
let myCurrentRecipeId;
let currentUserFavorites;
const recipeClasses = recipeData.map(recipeData => new Recipe(recipeData));
const tags = {
  appetizers: ['antipasti', 'antipasto', 'starter', 'appetizer', 'hor d\'oeuvre', 'dip', 'spread'],
  breakfast: ['breakfast', 'morning meal', 'brunch'],
  lunch: ['lunch', 'brunch', 'main dish', 'salad'],
  dinner: ['dinner', 'main course', 'main dish', 'salad'],
  sides: ['side dish', 'dip'],
  snacks: ['snack', 'dip'],
  condiments: ['condiment', 'sauce']
}

              /*********** QUERY SELECTORS ***********/

// Menu Buttons
const allRecipesBtn = document.getElementById('recipesBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const toCookBtn = document.getElementById('toCookBtn');
// Main Sections
let recipeCardSection = document.getElementById('recipeCardSection');
let individualCardView = document.getElementById('individualCardView');


// Search Selectors
let searchButton = document.getElementById('searchButton');
let searchIcon = document.getElementById('searchIcon');
let searchInput = document.getElementById('searchBar');
let dropDownSearch = document.getElementById('dropDownSearch');
let searchByName = document.getElementById('searchByNameLink');
let searchByIngredient = document.getElementById('searchByIngredientLink');

// Filter Selectors
let filterByAppetizer = document.getElementById('appetizerButton');
let filterByBreakfast = document.getElementById('breakfastButton');
let filterByLunch = document.getElementById('lunchButton');
let filterByDinner = document.getElementById('dinnerButton');
let filterBySides = document.getElementById('sideButton');
let filterByCondiments = document.getElementById('condimentButton');
let filterBySnacks = document.getElementById('snackButton');
let showAllButton = document.getElementById('showAllButton');

// Favorite Filter Selectors
let favFilterByAppetizer = document.getElementById('favAppetizerButton');
let favFilterByBreakfast = document.getElementById('favBreakfastButton');
let favFilterByLunch = document.getElementById('favLunchButton');
let favFilterByDinner = document.getElementById('favDinnerButton');
let favFilterBySides = document.getElementById('favSideButton');
let favFilterByCondiments = document.getElementById('favCondimentButton');
let favFilterBySnacks = document.getElementById('favSnackButton');
let favShowAllButton = document.getElementById('favShowAllButton');

// Individual Recipe Card Selectors
let favoriteButton = document.getElementById('favoriteButton');
// let favoriteHeart = document.querySelector('#heart');

              /*********** EVENT LISTENERS ***********/

window.addEventListener('load', loadPage);
recipeCardSection.addEventListener('click', displayRecipeCard);
favoritesSection.addEventListener('dblclick', removeFromFavorites);
allRecipesBtn.addEventListener('click', displayAllRecipes);
favoritesBtn.addEventListener('click', displayFavorites);
toCookBtn.addEventListener('click', displayToCook);
searchButton.addEventListener('click', toggleDropDown);
searchByName.addEventListener('click', searchByRecipeName);
searchByIngredient.addEventListener('click', searchByIngredients);
searchInput.addEventListener('keyup', checkInput);
favoriteButton.addEventListener('click', saveToFavorites);

// Filter Favorites
favFilterByAppetizer.addEventListener('click', findAppetizersFavs);
favFilterByBreakfast.addEventListener('click', findBreakfastFavs);
// favFilterByLunch.addEventListener('click', findLunchFavs);
// favFilterByDinner.addEventListener('click', findDinnerFavs);
// favFilterBySides.addEventListener('click', findSidesFavs);
// favFilterByCondiments.addEventListener('click', findCondimentsFavs);
// favFilterBySnacks.addEventListener('click', findSnacksFavs);
// favShowAllButton.addEventListener('click', displayAllRecipesFavs);

// Filter recipes
filterByAppetizer.addEventListener('click', findAppetizers);
filterByBreakfast.addEventListener('click', findBreakfast);
filterByLunch.addEventListener('click', findLunch);
filterByDinner.addEventListener('click', findDinner);
filterBySides.addEventListener('click', findSides);
filterByCondiments.addEventListener('click', findCondiments);
filterBySnacks.addEventListener('click', findSnacks);
showAllButton.addEventListener('click', displayAllRecipes);
// favoriteHeart.addEventListener('click', saveToFavorites);
              /*********** HELPER FUNCTIONS ***********/

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function showRecipeCardSection() {
  hide(ingredientsTitle);
  hide(directionsTitle);
  show(recipeCardSection);
  hide(individualCardView);
  hide(favoritesSection);
  hide(toCookSection);
}

function showFavoritesSection() {
  hide(ingredientsTitle);
  hide(directionsTitle);
  hide(recipeCardSection);
  hide(individualCardView);
  show(favoritesSection);
  hide(toCookSection);
}

function showToCookSection() {
  hide(ingredientsTitle);
  hide(directionsTitle);
  hide(recipeCardSection);
  hide(individualCardView);
  hide(favoritesSection);
  show(toCookSection);
}

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

function resetSearch() {
  searchInput.value = null;
  searchByName.disabled = true;
  searchByIngredient.disabled = true;
}

function toggleDropDown() {
  dropDownSearch.classList.toggle('show');
  searchIcon.classList.toggle('fa-rotate-180');
  // searchRecipes();
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

              /*********** FUNCTIONS ***********/

function getUser() {
  let userIndex = getRandomIndex(usersData);
  currentUser = new User(usersData[userIndex]);
  console.log('lets try xtines ideas >>>', currentUser)
  currentUserName = currentUser.name;
  currentUserId = currentUser.id;
  console.log(`Welcome ${currentUserName}`)
  console.log(`This is the userId ${currentUserId}`)
  return currentUser;
}

function loadPage() {
  displayAllRecipes();
  getUser();
  userMessage.innerHTML = `<h2>Lookin' Good ${currentUserName}!<br>Let's Get Cookin'!</h2>`
}
//Might use later
function buildHTML(index) {
  favoriteHeart.addEventListener('click', saveToFavorites);
  if (usersData.favorites[index].heart) {
    let heart = 'img class="icon" id="heart" src="images/like.png"';
  } else {
    let heart = 'img class="icon" id="heart" src="images/baking.png"';
  }
  saveToFavorites(usersData[index].id);
}

function displayAllRecipes() {
  showRecipeCardSection();
  show(filterIcons);
  hide(favoriteFilterIcons);
  recipeCardSection.innerHTML = '';
  recipeClasses.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons" id="cardIcons">
      <img class="icon heart" id="heart" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function displayRecipeCard() {
  const recipeId = Number(event.target.parentNode.id);
  myCurrentRecipeId = recipeId;
  recipeImageName.innerHTML = '';
  // event.preventDefault();
  show(individualCardView);
  hide(recipeCardSection);
  displayNameAndImage();
  displayIngredients();
  displayDirections();
  displayRecipeCost();
}

function displayNameAndImage() {
  recipeCardSection.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  recipeClasses.forEach((recipe, index) => {
    if (recipe.id === recipeId) {
      console.log('recipe.id 225', recipe.id);
     return recipeImageName.innerHTML +=
      `<article class="full-recipe">
      <h4>${recipe.name}</h4>
      <img class="recipe-image" src=${recipe.image}>
      </article>`;
    }
  });
}

function displayIngredients() {
  show(ingredientsTitle);
  recipeIngredients.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === recipeId);
  console.log('recipeId 239', recipeId);
  foundRecipe.ingredients.forEach((step, index) => {
      return recipeIngredients.innerHTML +=
      `<article class="full-recipe">
        <ul>
          <li class="ingredient-bullet">${step.quantity.amount} ${step.quantity.unit} ${foundRecipe.logIngredients()[index]}
          </li>
        </ul>
      </article>`;
    });
}

function displayDirections() {
  show(directionsTitle);
  recipeDirections.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === recipeId);
  console.log('recipeId 255', recipeId);
  foundRecipe.instructions.forEach((step, index) => {
      return recipeDirections.innerHTML +=
      `<article class="full-recipe">
        <ol>
          <li><span class="step-number">${step.number}.</span> ${step.instruction}</li>
        </ol>
      </article>`;
    });
}

function displayRecipeCost() {
  recipeCost.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === recipeId);
  console.log('recipeId 269', recipeId);
    return recipeCost.innerHTML +=
    `<article class="full-recipe">
      <h4>Total Cost $${foundRecipe.logRecipeCost()}</h4>
    </article>`;
}

function searchRecipes() {
  let userInput = searchInput.value;
  if (!userInput.value && searchByName.clicked === true) {
    console.log('please type a name');
  } else if (!userInput.value && searchByIngredient.clicked === true) {
    console.log('please type an ingredient');
  } else if (userInput.value && searchByName.clicked === true) {
    searchByRecipeName();
  } else if (userInput.value && searchByIngredient.clicked === true) {
    searchByIngredients();
  } else {
    console.log('please make a selection');
  }
}

function searchByIngredients() {
  recipeCardSection.innerHTML = '';
  let userInput = searchInput.value;
  let filteredRecipes = recipeRepo.filterByIngredients(userInput);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showRecipeCardSection();
}

function searchByRecipeName() {
  recipeCardSection.innerHTML = '';
  let userInput = searchInput.value;
  let filteredRecipes = recipeRepo.filterByName(userInput);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showRecipeCardSection();
}

function findAppetizers() {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let userSelection = tags.appetizers;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}


function findBreakfast() {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let userSelection = tags.breakfast;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}



function findLunch() {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let userSelection = tags.lunch;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function findDinner() {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let userSelection = tags.dinner;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function findSides() {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let userSelection = tags.sides;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function findCondiments() {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let userSelection = tags.condiments;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function findSnacks() {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let userSelection = tags.snacks;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function findAppetizersFavs() {
  favoritesSection.innerHTML = '';
  showFavoritesSection();
  let userSelection = tags.appetizers;
  let filteredRecipes = currentUser.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
    <section class="card-icons">
    <img class="icon" src="images/like.png">
    <img class="icon" src="images/baking.png">
    </section>
    <h3>${recipe.name}</h3>
    <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function findBreakfastFavs() {
  favoritesSection.innerHTML = '';
  showFavoritesSection();
  let userSelection = tags.breakfast;
  let filteredRecipes = currentUser.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
    <section class="card-icons">
    <img class="icon" src="images/like.png">
    <img class="icon" src="images/baking.png">
    </section>
    <h3>${recipe.name}</h3>
    <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function findLunchFavs() {
  favoritesSection.innerHTML = '';
  showFavoritesSection();
  let userSelection = tags.lunch;
  let filteredRecipes = currentUser.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
    <section class="card-icons">
    <img class="icon" src="images/like.png">
    <img class="icon" src="images/baking.png">
    </section>
    <h3>${recipe.name}</h3>
    <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function saveToFavorites() {
  const foundRecipe = recipeClasses.find(recipe => recipe.id === myCurrentRecipeId);
  currentUser.addToFavorites(foundRecipe)
  console.log(currentUser.favorites)
  displayFavorites();
}

function removeFromFavorites() {
  const clickedRecipeId = Number(event.target.parentNode.id);

  const foundRecipe = recipeClasses.find(recipe => recipe.id === clickedRecipeId);
  currentUser.removeFromFavorites(foundRecipe)
  displayFavorites()
}

function displayFavorites() {
  favoritesSection.innerHTML = '';
  const favoriteRecipes = currentUser.favorites;
  favoriteRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <section class="card-icons" id="cardIcons">
      <img class="icon heart" id="heart" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </section>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  showFavoritesSection();
  // hideRecipeCardSection();
  hide(filterIcons);
  show(favoriteFilterIcons);
}

function displayToCook() {
  showToCookSection();
}
