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
            this.foundIngredient.amount = this.missingAmount;
            this.shoppingList.push(this.foundIngredient);
        }
      } else if (!this.foundIngredient) {
            this.hasAllIngredients = false;
            
            let missingIngredient = {ingredient: 0, amount: 0};
            missingIngredient.ingredient = ingredient.id;
            missingIngredient.amount = ingredient.quantity.amount;

            this.shoppingList.push(missingIngredient);
      }
      this.ingredientsFoundInPantry.push(this.foundIngredient);
      return this.foundIngredient;
    });
    return this.hasAllIngredients;
  }

  logPantryIngredients(ingredientsData) {
    const ingredientNameArr = this.pantry.map(ingredient => {
      const ingredientList = ingredientsData.find(ingredientObj => 
        ingredientObj.id === ingredient.ingredient)
      return ingredientList.name;
    });
    return ingredientNameArr;
  }
}

export default Pantry;
