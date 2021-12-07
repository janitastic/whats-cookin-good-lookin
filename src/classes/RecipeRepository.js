import Recipe from '../data/recipes';

class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
  }

  buildRecipe() {
    this.recipes = this.recipes.map(recipe => {
      recipeData.id, recipeData.image, recipeData.ingredients, recipeData.instructions, recipeData.name, recipeData.tags
    });
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

  filterByName() {

  }

  filterByIngredient() {

  }
}

export default RecipeRepository;
