class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
  }

  compareIngredients(recipe) {
    // checking to see what's in the pantry (ingredients)
    // checking to see what ingredients are in the recipe
    // checking to see if the pantry ingredients are enough for the recipe

    const matchingIngredients = recipe.ingredients.every(recipeIngredient => {
      let inPantry = this.pantry.some(pantryIngredient => {
        pantryIngredient === recipeIngredient.id
      });
      let enoughIngredients;

    const foundIngredient = this.pantry.find(pantryIngredient => {
      ingredient.id === this.pantry.ingredient
    })

    
      //I want this one to find a match - ingredient.id === this.pantry.ingredient
    //   ingredient.quantity.amount >= this.pantry.
    })
    return result;
    // const result = this.pantry.find((pantryIngredient) => {
    //   pantryIngredient.ingredient === ingredient.id
    //   // recipeData[0].ingredients.id === myPantry.pantry.ingredient
    // })
    // for each ingredient in recipe
    // find ingredient in this.pantry
    // if it exists and the quantity is enough - good
    
  }
}

// if it exists and the quantity is too low - show error
// if it doesn't exist - show error



export default Pantry