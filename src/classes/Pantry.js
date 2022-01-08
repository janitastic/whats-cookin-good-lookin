class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
    this.hasAllIngredients = false;
    this.hasEnoughIngredients = true;
    this.ingredientAmount = 0;
    this.amountAvailable = 0;
    this.amountToBuy = 0;
    // this.foundInPantry = [];
    this.neededIngredients = [];
  }

  checkPantry(recipe) {
    let recipeIngredients = recipe.ingredients;
    let pantryItems = this.pantry;


    this.hasAllIngredients = recipeIngredients.every(ingredient => {
      this.ingredientAmount = ingredient.quantity.amount;//recipe amount

      this.foundInPantry = pantryItems.find(pantryItem => ingredient.id === pantryItem.ingredient);

      if (this.foundInPantry) {
        this.hasAllIngredients = true;
        if (this.ingredientAmount > this.amountAvailable) {
            this.hasEnoughIngredients = false;
            this.amountToBuy = this.ingredientAmount - this.foundInPantry.amount;
          } else {
            this.hasEnoughIngredients = true;
          }
      } else if (!this.foundInPantry) {
        this.hasAllIngredients = false;
        this.neededIngredients.push(ingredient);
        console.log(this.neededIngredients)
      }
      // console.log(this.neededIngredients)





      // this.amountAvailable = this.foundInPantry.amount;//pantry amount

      // if (this.ingredientAmount > this.amountAvailable) {
        //   this.hasEnoughIngredients = false;
        //   this.amountToBuy = this.ingredientAmount - this.amountAvailable;
        // } else {
          //   this.hasEnoughIngredients = true;
          // }
      // else if (!this.foundInPantry) {
      //   console.log(ingredient)
      //   this.hasEnoughIngredients = false;
      //   return ingredient;
      // }

      // if (!this.foundInPantry) {
      //   console.log(ingredient)
      //   return ingredient;
      // }
      // return this.hasEnoughIngredients;
      // console.log(this.foundInPantry);
      return this.foundInPantry;//this needs to stay here! returns each ingredient that is found
    });
    return this.hasAllIngredients;//returns true or false
  }

  // findMissingIngredients(recipe) {
  //   let recipeIngredients = recipe.ingredients;
  //   let pantryItems = this.pantry;
  //
  //
  //   this.hasAllIngredients = recipeIngredients.every(ingredient => {
  //     this.ingredientAmount = ingredient.quantity.amount;
  //     this.notFoundInPantry = pantryItems.find(pantryItem => ingredient.id !== pantryItem.ingredient);
  //     // if (this.notFoundInPantry) {
  //     //   this.amountAvailable = this.notFoundInPantry.amount;
  //     //   if (this.ingredientAmount > this.amountAvailable) {
  //     //     this.hasEnoughIngredients = false;
  //     //     this.amountToBuy = this.ingredientAmount - this.amountAvailable;
  //     //   } else {
  //     //     this.hasEnoughIngredients = true;
  //     //   }
  //     // }
  //     // console.log(this.notFoundInPantry);
  //     return this.notFoundInPantry;
  //   });
  //   // return this.hasAllIngredients;//returns true or false
  // }
}

export default Pantry
