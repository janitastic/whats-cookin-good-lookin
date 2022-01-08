class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
    this.hasAllIngredients = false;
    this.hasEnoughIngredients = true;
    this.recipeIngAmount = 0;
    this.pantryAmountAvailable = 0;
    this.missingAmount = 0;
    this.neededIngredients = [];
  }

  checkPantry(recipe) {
    let recipeIngredients = recipe.ingredients;
    let pantryItems = this.pantry;

    this.hasAllIngredients = recipeIngredients.every(ingredient => {
      this.recipeIngAmount = ingredient.quantity.amount;//recipe amount

      this.foundInPantry = pantryItems.find(pantryItem => ingredient.id === pantryItem.ingredient);

      if (this.foundInPantry) {
        this.hasAllIngredients = true;
        this.pantryAmountAvailable = this.foundInPantry.amount;//pantry amount
        if (this.recipeIngAmount > this.pantryAmountAvailable) {
            this.hasEnoughIngredients = false;
            this.missingAmount = this.recipeIngAmount - this.pantryAmountAvailable;
            console.log('amountTobuy', this.missingAmount)
          } else {
            this.hasEnoughIngredients = true;
          }
          // console.log(this.neededIngredients)
      return this.foundInPantry;//this needs to stay here! returns each ingredient that is found
      } else if (!this.foundInPantry) {
        this.hasAllIngredients = false;
        this.neededIngredients.push(ingredient);
        console.log(this.neededIngredients)
      }


    });
    return this.hasAllIngredients;//returns true or false
  }
}

export default Pantry
