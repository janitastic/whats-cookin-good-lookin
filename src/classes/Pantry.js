class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
    this.hasAllIngredients = true;
    this.hasEnoughIngredients = false;
    this.ingredientAmount = 0;
    this.amountAvailable = 0;
    this.amountToBuy = 0;
    this.foundInPantry = [];
  }

  checkPantry(recipe) {
    // console.log(recipe.ingredients)
    // console.log(this.pantry)

    let recipeIngredients = recipe.ingredients;
    let pantryItems = this.pantry;


    this.hasAllIngredients = recipeIngredients.every(ingredient => {
      this.ingredientAmount = ingredient.quantity.amount;
      // console.log('each ingredient amount', ingredientAmount);
      this.foundInPantry = pantryItems.find(pantryItem => ingredient.id === pantryItem.ingredient);
      // console.log('ingredient avaialble in pantry', foundInPantry);
      if (this.foundInPantry) {
        this.amountAvailable = this.foundInPantry.amount;
        // console.log('pantry amount available', amountAvailable)
        if (this.ingredientAmount > this.amountAvailable) {
          this.hasEnoughIngredients = false;
          this.amountToBuy = this.ingredientAmount - this.amountAvailable;
        } else {
          this.hasEnoughIngredients = true;
        }
      }
      // console.log('is there enough of that ingredient in the pantry?', hasEnoughIngredients);
      // console.log('how much of each ingredient does the user need to buy?', amountToBuy)
console.log(this.foundInPantry)
      return this.foundInPantry;

    });
    return this.hasAllIngredients;//returns true or false
  }

  findMissingIngredients(recipe) {
    console.log('foundInPantry', this.foundPantry)
    // Grace's Code
    // if(item.ingredient === ingredient.id) {
    //     if(ingredient.quantity.amount > item.amount) {
    //       this.needsIngredients = true;
    //       item.amountToBuy = ingredient.quantity.amount - item.amount;
    //       this.missingIngredients.push(item);
    //     }
    //   }
  }
}


export default Pantry
