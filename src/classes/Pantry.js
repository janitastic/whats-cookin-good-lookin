class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
    this.hasAllIngredients = false;
    this.hasEnoughIngredients = true;
    this.recipeIngAmount = 0;
    this.pantryAmountAvailable = 0;
    this.missingAmount = 0;
    this.ingredientsFoundInPantry = [];
    this.neededIngredients = [];
  }

  checkPantry(recipe) {
    let recipeIngredients = recipe.ingredients;
    let pantryItems = this.pantry;

    this.hasAllIngredients = recipeIngredients.forEach(ingredient => {
      this.recipeIngAmount = ingredient.quantity.amount;//recipe amount

      this.foundIngredient = pantryItems.find(pantryItem => ingredient.id === pantryItem.ingredient);

      if (this.foundIngredient) {
        this.hasAllIngredients = true;
        this.pantryAmountAvailable = this.foundIngredient.amount;
        if (this.recipeIngAmount > this.pantryAmountAvailable) {
            this.hasEnoughIngredients = false;
            this.missingAmount = this.recipeIngAmount - this.pantryAmountAvailable;
            // console.log('amountTobuy', this.missingAmount)
          }
      } else if (!this.foundIngredient) {
            this.hasAllIngredients = false;
            // console.log('missing ingredient', ingredient)
            this.neededIngredients.push(ingredient);
            // console.log('needed if in pantry', this.neededIngredients)
      }
      // console.log('items that are found in pantry', this.foundIngredient)
      this.ingredientsFoundInPantry.push(this.foundIngredient);
      console.log('ingredientsFoundInPantry', this.ingredientsFoundInPantry)
      return this.foundIngredient;//this needs to stay here! returns each ingredient that is found
    });
    // console.log('needed on Every Ingredient', this.neededIngredients)
    // this.neededIngredients.push(ingredient);
    return this.hasAllIngredients;//returns true or false
  }
}

export default Pantry
