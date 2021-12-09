import Recipe from '../src/classes/RecipeRepository';
import recipeData from '../src/data/recipes';

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
  }
  findMatchingIngredients() {
   //find the array of ids inside of the recipe
   //using the above id array, find the names array
   const idArray = this.ingredients.map((elem) => elem.id)
   console.log(idArray)
    }

  determineIngredientNames() {
    //if I have a recipe, tell me what the ingredients are in that recipe
    //input - a recipe
    //output- all ingredients needed for recipe
    const ingredientId = this.recipe.ingredients.map((ingredient) => ingredient.id)
    console.log('>>>>>', ingredientId)
    const ingredientName = ingredientId.map((ingredient) => ingredient.name)
    console.log(ingredientName)
    return ingredientName;
  }
}






export default Recipe;