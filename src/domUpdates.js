// import './styles.css';
import './css/index.scss';
import './images/recipe-book.png';
import './images/baking.png';
import './images/like.png';
import './images/menu-baking.png';
import './images/menu-like.png';
import './images/view-recipes.png';
import './images/appetizer.png';
import './images/breakfast.png';
import './images/lunch.png';
import './images/dinner.png';
import './images/sides.png';
import './images/condiments.png';
import './images/snacks.png';

// import {fetchUsersData, fetchIngredientsData, fetchRecipesData} from './apiCalls';

import Recipe from './classes/Recipe';
import User from './classes/User';
import Ingredient from './classes/Ingredient';
import RecipeRepository from './classes/RecipeRepository';
import scripts from './scripts';


              /*********** GLOBAL VARIABLES ***********/

// let recipeRepo;
// let currentUser;
let recipeData;
// let ingredientsData;
// let currentUserName;
let usersData = [];
// let ingredients;
// let currentUserId;
// let myCurrentRecipeId;
// let currentUserFavorites;
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

              /*********** QUERY SELECTORS ***********/
let querySelectors = {
// const allRecipesBtn = document.getElementById('recipesBtn'),
}
export {querySelectors};

// Menu Buttons
const allRecipesBtn = document.getElementById('recipesBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const toCookBtn = document.getElementById('toCookBtn');
const returnBtn = document.getElementById('returnBtn');

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

// Favorite Search Selectors
let favSearchButton = document.getElementById('favSearchButton');
let favSearchIcon = document.getElementById('favSearchIcon');
let favSearchInput = document.getElementById('favSearchBar');
let favDropDownSearch = document.getElementById('favDropDownSearch');
let favSearchByName = document.getElementById('favSearchByNameLink');
let favSearchByIngredient = document.getElementById('favSearchByIngredientLink');

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
let addToCookButton = document.getElementById('addToCook');

              /*********** EVENT LISTENERS ***********/

// window.addEventListener('load', loadPage);
// //Sections
// recipeCardSection.addEventListener('click', displayRecipeCard);
// favoritesSection.addEventListener('dblclick', removeFromFavorites);
// returnBtn.addEventListener('click', displayAllRecipes);
// //Menu Buttons
allRecipesBtn.addEventListener('click', displayAllRecipes);
// favoritesBtn.addEventListener('click', displayFavorites);
// toCookBtn.addEventListener('click', displayToCook);
// //Main Search Buttons
// searchButton.addEventListener('click', toggleDropDown);
searchByName.addEventListener('click', searchByRecipeName);
searchByIngredient.addEventListener('click', searchByIngredients);
searchInput.addEventListener('keyup', () => {scripts.checkInput()});
// //Favorite Search Buttons
// favSearchButton.addEventListener('click', toggleDropDown);
// favSearchByName.addEventListener('click', favSearchByRecipeName);
// favSearchByIngredient.addEventListener('click', favSearchByIngredients);
// favSearchInput.addEventListener('keyup', favCheckInput);
// //To Cook Button
// addToCookButton.addEventListener('click', addToCookList);

//Recipe Card Buttons
// favoriteButton.addEventListener('click', saveToFavorites);

// // Filter Favorites
// favFilterByAppetizer.addEventListener('click', () => {
//   filterByFavSelection(tags.appetizers)
// });
// favFilterByBreakfast.addEventListener('click', () => {
//   filterByFavSelection(tags.breakfast)
// });
// favFilterByLunch.addEventListener('click', () => {
//   filterByFavSelection(tags.lunch)
// });
// favFilterByDinner.addEventListener('click', () => {
//   filterByFavSelection(tags.dinner)
// });
// favFilterBySides.addEventListener('click', () => {
//   filterByFavSelection(tags.sides)
// });
// favFilterByCondiments.addEventListener('click', () => {
//   filterByFavSelection(tags.condiments)
// });
// favFilterBySnacks.addEventListener('click', () => {
//   filterByFavSelection(tags.snacks)
// });
// favShowAllButton.addEventListener('click', displayFavorites);

// // Filter recipes
// filterByAppetizer.addEventListener('click', () => {
//   filterBySelection(tags.appetizers)
// });
// filterByBreakfast.addEventListener('click', () => {
//   filterBySelection(tags.breakfast)
// });
// filterByLunch.addEventListener('click', () => {
//   filterBySelection(tags.lunch)
// });
// filterByDinner.addEventListener('click', () => {
//   filterBySelection(tags.dinner)
// });
// filterBySides.addEventListener('click', () => {
//   filterBySelection(tags.sides)
// });
// filterByCondiments.addEventListener('click', () => {
//   filterBySelection(tags.condiments)
// });
// filterBySnacks.addEventListener('click', () => {
//   filterBySelection(tags.snacks)
// });
// showAllButton.addEventListener('click', displayAllRecipes);

              /*********** HELPER FUNCTIONS ***********/
// let domUpdates = {
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
  show(filterIcons);
  hide(favoriteFilterIcons);
  hide(favoriteSearch);
  show(allSearch);
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

// function checkInput() {
//   let userInput = searchInput.value;
//   if (userInput.value !== null) {
//     searchByName.disabled = false;
//     searchByIngredient.disabled = false;
//   } else {
//     searchByName.disabled = true;
//     searchByIngredient.disabled = true;
//     console.log('please enter something');
//   }
// }

// function favCheckInput() {
//   let userInput = favSearchInput.value;
//   if (userInput.value !== null) {
//     favSearchByName.disabled = false;
//     favSearchByIngredient.disabled = false;
//   } else {
//     favSearchByName.disabled = true;
//     favSearchByIngredient.disabled = true;
//     console.log('please enter something');
//   }
// }

// function resetSearch() {
//   searchInput.value = null;
//   searchByName.disabled = true;
//   searchByIngredient.disabled = true;
// }

function toggleDropDown() {
  dropDownSearch.classList.toggle('show');
  searchIcon.classList.toggle('fa-rotate-180');
  favDropDownSearch.classList.toggle('show');
  favSearchIcon.classList.toggle('fa-rotate-180');
}

// function getRandomIndex(array) {
//   return Math.floor(Math.random() * array.length);
// }

              /*********** HOME PAGE FUNCTIONS ***********/

// async function fetchAllData() {
//   const response = await Promise.all([fetchUsersData(), fetchIngredientsData(), fetchRecipesData()])

//   return response
// }

// function getUser() {
//   let userIndex = getRandomIndex(usersData);
//   currentUser = new User(usersData[userIndex]);
//   currentUserName = currentUser.name;
//   currentUserId = currentUser.id;
//   return currentUser;
// }

// function getRecipes() {
//   recipeRepo = new RecipeRepository(recipeData);
//   recipeClasses = recipeData.map(recipeData => new Recipe(recipeData));
//   console.log("here??? <>>>>>", recipeData)
// }

function domUpdates(recipeClasses) {
    displayAllRecipes(recipeClasses)
    // displayRecipeCard()
    // getRecipes()
    showRecipeCardSection()
}



// function loadPage() {
//     fetchAllData().then(data => {
//         usersData = data[0].usersData
//         ingredientsData = data[1].ingredientsData
//         recipeData = data[2].recipeData
//         getUser();
//         getRecipes();
//         displayAllRecipes();
//         userMessage.innerHTML =
//         `<h2>Lookin' Good ${currentUserName}!<br>Let's Get Cookin'!</h2>`;
//     })
// }

function displayAllRecipes(recipeCollection) {
//    showRecipeCardSection();
//    show(filterIcons);
//    hide(favoriteFilterIcons);
//    hide(favoriteSearch);
//    show(allSearch);
   recipeCardSection.innerHTML = '';
   recipeCollection.forEach(recipe => {
       return recipeCardSection.innerHTML +=
       `<article class="card" id="${recipe.id}">
       <h3>${recipe.name}</h3>
       <img class="thumbnail-image" src=${recipe.image}>
       </article>`;
   });
}

 

function displayRecipeCard() {
//   const recipeId = Number(event.target.parentNode.id);
//   myCurrentRecipeId = recipeId;
  show(individualCardView);
  hide(recipeCardSection);
  hide(noRecipes);
  hide(favInstructions);
  displayNameAndImage();
  displayIngredients();
  displayDirections();
  displayRecipeCost();
}

function displayNameAndImage() {
  recipeImageName.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  recipeClasses.forEach((recipe, index) => {
    if (recipe.id === recipeId) {
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
  foundRecipe.ingredients.forEach((step, index) => {
      return recipeIngredients.innerHTML +=
      `<article class="full-recipe">
        <ul>
          <li class="ingredient-bullet">
          ${step.quantity.amount} ${step.quantity.unit} ${foundRecipe.logIngredients(ingredientsData)[index]}
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
  foundRecipe.instructions.forEach((step, index) => {
      return recipeDirections.innerHTML +=
      `<article class="full-recipe">
        <ol>
          <li>
            <span class="step-number">${step.number}.</span> ${step.instruction}
          </li>
        </ol>
      </article>`;
    });
}

function displayRecipeCost() {
  recipeCost.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === recipeId);
  return recipeCost.innerHTML +=
    `<article class="full-recipe">
      <h4>Total Cost $${foundRecipe.logRecipeCost(ingredientsData)}</h4>
    </article>`;
}

function searchByIngredients() {
  recipeCardSection.innerHTML = '';
  let userInput = searchInput.value;
  let filteredRecipes = recipeRepo.filterByIngredients(userInput, ingredientsData);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
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
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showRecipeCardSection();
  hide(noRecipes);
  hide(favInstructions);
}

function filterBySelection(selectedTag) {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let filteredRecipes = recipeRepo.filterByTag(selectedTag);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}
          /*********** FAVORITE PAGE FUNCTIONS ***********/

// function saveToFavorites() {
//   const foundRecipe = recipeClasses.find(recipe => recipe.id === myCurrentRecipeId);
//   currentUser.addToFavorites(foundRecipe);
//   displayFavorites();
// }

// function removeFromFavorites() {
//   const clickedRecipeId = Number(event.target.parentNode.id);
//   const foundRecipe = recipeClasses.find(recipe => recipe.id === clickedRecipeId);
//   currentUser.removeFromFavorites(foundRecipe);
//   displayFavorites();
// }

function displayFavorites() {
  favoritesSection.innerHTML = '';
  const favoriteRecipes = currentUser.favorites;
  favoriteRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  showFavoritesSection();
  displayDeleteFavMessage();
  show(favoriteFilterIcons);
  show(favoriteSearch);
  hide(allSearch);
  hide(filterIcons);
}

function displayDeleteFavMessage() {
  if (currentUser.favorites.length === 0) {
    show(noRecipes);
    hide(favInstructions);
  } else {
    show(favInstructions);
    hide(noRecipes);
  }
}

function filterByFavSelection(selectedTag) {
  favoritesSection.innerHTML = '';
  showFavoritesSection();
  let filteredRecipes = currentUser.filterByTag(selectedTag);
  filteredRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
}

function favSearchByRecipeName() {
  favoritesSection.innerHTML = '';
  let userInput = favSearchInput.value;
  let filteredRecipes = currentUser.filterByNameFav(userInput);
  filteredRecipes.forEach(recipe => {
    console.log("recipe name", recipe.name);
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showFavoritesSection();
}

function favSearchByIngredients() {
  favoritesSection.innerHTML = '';
  let userInput = favSearchInput.value;
  let filteredRecipes = currentUser.filterByIngredients(userInput, ingredientsData);
  filteredRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showFavoritesSection();
}

          /*********** TO COOK PAGE FUNCTIONS ***********/

// function addToCookList() {
//   const foundRecipe = recipeClasses.find(recipe => recipe.id === myCurrentRecipeId);
//   currentUser.addToCook(foundRecipe);
//   showToCookSection();
//   displayToCook();
// }

function displayToCook() {
  toCookSection.innerHTML = '';
  const toCookRecipes = currentUser.toCook;
  toCookRecipes.forEach(recipe => {
    return toCookSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`;
  });
  showToCookSection();
  displayToCookMessage();
  hide(favoritesSection);
  hide(filterIcons);
  hide(favoriteFilterIcons);
  hide(favoriteSearch);
  hide(allSearch);
}

function displayToCookMessage() {
  if (currentUser.toCook.length === 0) {
    show(noRecipes);
    hide(favInstructions);
  } else {
    hide(noRecipes);
    hide(favInstructions);
  }
}

// let domUpdates = {
//     loadPage(),
//     // displayAllRecipes(),
//     // displayRecipeCard(),
//     // displayNameAndImage()
// }
export default  domUpdates;