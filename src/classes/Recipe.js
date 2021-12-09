import ingredientsData from '../data/ingredients';

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
  }

  logIngredients() {
    const ingredientNameArr = this.ingredients.map(ingredient => {
      const ingredientList = ingredientsData.find(ingredientObj => ingredientObj.id === ingredient.id)
      return ingredientList.name
    })
    return ingredientNameArr
  }
  logRecipeDirections() {
    return this.instructions;
  }
}

export default Recipe;