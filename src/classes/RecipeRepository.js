import Recipe from '../data/recipes';
import Ingredients from '../data/ingredients';

class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData
  }

  filterByTag(tags) {
    const filteredRecipes = this.recipes.reduce((taggedRecipes, recipe) => {
      tags.forEach(tag => {
        if (recipe.tags.includes(tag) && !taggedRecipes.includes(recipe)) {
          taggedRecipes.push(recipe)
        }
      });
      return taggedRecipes;
    }, [])
    return filteredRecipes;
  }

  filterByName(userInput) {
    const filteredRecipes = this.recipes.reduce((recipeNames, recipe) => {
        if (recipe.name.toLowerCase().includes(userInput.toLowerCase())) {
          recipeNames.push(recipe)
        }
      return recipeNames;
    }, [])
    return filteredRecipes;
  }

  filterByIngredients(userInput) {
    const ingObj = Ingredients.find(ingredient => ingredient.name.toLowerCase().includes(userInput.toLowerCase()))
    const ingId = ingObj.id

    const filteredRecipes = this.recipes.filter(recipe => {
      return recipe.ingredients.some(ingredient =>
      ingredient.id === ingId)
    })
    return filteredRecipes
  }
}

export default RecipeRepository;
