
class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
  }

  filterByTag(tags) {
    const filteredRecipes = this.recipes.reduce((taggedRecipes, recipe) => {
      tags.forEach(tag => {
        if (recipe.tags.includes(tag) && !taggedRecipes.includes(recipe)) {
          taggedRecipes.push(recipe);
        }
      });
      return taggedRecipes;
    }, []);
    return filteredRecipes;
  }

  filterByName(userInput) {
    //we need to add some error handling for when a name doesn't exist
    const filteredRecipes = this.recipes.reduce((recipeNames, recipe) => {
        if (recipe.name.toLowerCase().includes(userInput.toLowerCase())) {
          recipeNames.push(recipe);
        } return recipeNames;
      }, []);
    return filteredRecipes;
  }

  filterByIngredients(userInput, ingredientsData) {
    const foundIngredient = ingredientsData.find(ingredient => ingredient.name.toLowerCase().includes(userInput.toLowerCase()));
    const foundId = foundIngredient.id;

    const filteredRecipes = this.recipes.filter(recipe => {
      return recipe.ingredients.some(ingredient =>
      ingredient.id === foundId);
    });
    return filteredRecipes;
  }
}

export default RecipeRepository;
