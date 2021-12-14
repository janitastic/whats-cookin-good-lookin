// import usersData from '../data/users';
import Ingredients from '../data/ingredients'
// import usersData from './apiCalls';

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.favorites = [];
    this.toCook = [];
  }

  addToFavorites(selectedRecipe) {
    this.favorites.push(selectedRecipe);
  }

  removeFromFavorites(selectedRecipe) {
    this.favorites = this.favorites.filter(favorite => favorite.id !== selectedRecipe.id);
  }

  addToCook(selectedRecipe) {
    this.toCook.push(selectedRecipe);
  }

  filterByTag(tags) {
    const filteredRecipes = this.favorites.reduce((taggedRecipes, favorite) => {
      tags.forEach(tag => {
        if (favorite.tags.includes(tag) && !taggedRecipes.includes(favorite)) {
          taggedRecipes.push(favorite);
        }
      });
      return taggedRecipes;
    }, []);
    return filteredRecipes;
  }

  filterByNameFav(userInput) {
    const filteredRecipes = this.favorites.reduce((recipeNames, recipe) => {
        if (recipe.name.toLowerCase().includes(userInput.toLowerCase())) {
          recipeNames.push(recipe);
        } return recipeNames;
      }, []);
    return filteredRecipes;
  }

  filterByIngredients(userInput) {
    const foundIngredient = Ingredients.find(ingredient => ingredient.name.toLowerCase().includes(userInput.toLowerCase()));
    const foundId = foundIngredient.id;
    const filteredRecipes = this.favorites.filter(recipe => {
      return recipe.ingredients.some(ingredient =>
      ingredient.id === foundId);
    });
    return filteredRecipes;
  }
}

export default User;
