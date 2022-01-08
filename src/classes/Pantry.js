class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
    this.hasIngredients = true;
  }

  compareIngredients(recipe) {
    // console.log(recipe.ingredients)
    // console.log(this.pantry)
    // checking to see what's in the pantry (ingredients)
    // checking to see what ingredients are in the recipe
    // checking to see if the pantry ingredients are enough for the recipe

     this.hasIngredients = recipe.ingredients.forEach(recipeIngredient => {
      // console.log(recipeIngredient.id)
     let foundIngredient = this.pantry.find((pantryItem) => {
        pantryItem.ingredient === recipeIngredient.id
     })
    // console.log(foundIngredient)
      return foundIngredient
    } 
    )
    console.log(hasIngredients)
    return hasIngredients
    
    // if undefined (ie pantry does not have ingredient) then return false, else return true
  }
}

  // Does my pantry have all of the ingredients I need in the recipe?
// If true - then find each ingredient
// Then check the pantry.ingredient.amount to see if it’s >= the recipe.ingredient.amount
    //   let inPantry = this.pantry.some(pantryIngredient => {
    //     pantryIngredient === recipeIngredient.id
    //   });
    //   let enoughIngredients;

    // const foundIngredient = this.pantry.find(pantryIngredient => {
    //   ingredient.id === this.pantry.ingredient
    // })

    
      //I want this one to find a match - ingredient.id === this.pantry.ingredient
    //   ingredient.quantity.amount >= this.pantry.
    // const result = this.pantry.find((pantryIngredient) => {
    //   pantryIngredient.ingredient === ingredient.id
    //   // recipeData[0].ingredients.id === myPantry.pantry.ingredient
    // })
    // for each ingredient in recipe
    // find ingredient in this.pantry
    // if it exists and the quantity is enough - good
// if it exists and the quantity is too low - show error
// if it doesn't exist - show error



export default Pantry