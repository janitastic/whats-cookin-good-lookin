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
    this.shoppingList = [];
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
            this.foundIngredient.amount = this.missingAmount;
            this.shoppingList.push(this.foundIngredient);
            // console.log('needs more amount', this.shoppingList);
        }
      } else if (!this.foundIngredient) {
            this.hasAllIngredients = false;
            console.log('missing ingredient', ingredient)

            let missingIngredient = {ingredient: 0, amount: 0};
            missingIngredient.ingredient = ingredient.id;
            missingIngredient.amount = ingredient.quantity.amount;

            this.shoppingList.push(missingIngredient);
            // console.log('needed ingredients', this.shoppingList)
      }
      // console.log('items that are found in pantry', this.foundIngredient)
      this.ingredientsFoundInPantry.push(this.foundIngredient);
      // console.log('ingredientsFoundInPantry', this.ingredientsFoundInPantry)
      return this.foundIngredient;//this needs to stay here! returns each ingredient that is found
    });
    console.log('needed on Every Ingredient', this.shoppingList)
    // this.shoppingList.push(ingredient);
    return this.hasAllIngredients;//returns true or false
  }
}

export default Pantry
