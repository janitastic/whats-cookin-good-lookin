import Recipe from '../data/recipes'
class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
  }

  buildRecipe() {
    this.recipes = this.recipes.map(recipe => {
      recipeData.id, recipeData.image, recipeData.ingredients, recipeData.instructions, recipeData.name, recipeData.tags
    });
  }

  filterByTag() {

  }

  filterByName() {

  }

  filterByIngredient() {

  }
}

export default RecipeRepository;
