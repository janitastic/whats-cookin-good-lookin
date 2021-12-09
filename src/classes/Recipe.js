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
    const ingredientNameArr = this.ingredients.map(ing => {
      const ingResponse = ingredientsData.find(ingObj => ingObj.id === ing.id)
      return ingResponse.name
    })
    return ingredientNameArr
  }
}

export default Recipe;