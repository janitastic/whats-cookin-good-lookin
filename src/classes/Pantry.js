class Pantry  {
  constructor(currentUser) {
    this.user = currentUser;
    this.pantry = currentUser.pantry
    // this.hasAllIngredients = true;
    // this.hasEnoughIngredients = true;
  }

  checkPantry(recipe) {
    // console.log(recipe.ingredients)
    // console.log(this.pantry)

    let recipeIngredients = recipe.ingredients;
    let pantryItems = this.pantry;

    //step 1: Do I have all the ingredients in my pantry? True/False
    const hasAllIngredients = recipeIngredients.every(ingredient => {

      //step 2: Find the amount needed for every ingredient.
      const amountNeeded = ingredient.quantity.amount;
      // console.log('each ingredient amount', amountNeeded);

      //step 3: Check the pantry for ingredients needed.
      const foundInPantry = pantryItems.find(pantryItem => ingredient.id === pantryItem.ingredient); //when find only tests one condition we do not need {}
      // console.log('ingredient avaialble in pantry', foundInPantry);

      //step 4: If the ingredient is found in the pantry, find the amount available of each foundInPantry item. If it's not found, it's "undefined"
      let amountAvailable;
      //step 5: Check to see if found in pantry. If it is, check to see if the amountAvailable is enough for the amountNeeded
      let hasEnough;

      if (foundInPantry) {
        amountAvailable = foundInPantry.amount;
        // console.log('pantry amount available', amountAvailable)
        if (amountNeeded > amountAvailable) {
          hasEnough = false;
          amountNeeded - amountAvailable
        } else {
          hasEnough = true;
        }
      }
      console.log('is there enough of that ingredient in the pantry?', hasEnough);



      return foundInPantry;//returns all ingredients that are in the pantry that match the recipe ingredients
    });
    return hasAllIngredients;//returns true or false
  }

  checkIngredientAmounts(recipe) {
    // console.log(this.compareIngredients(recipe))

  }

  findMissingIngredients(recipe) {

    // Grace's Code
    // if(item.ingredient === ingredient.id) {
    //     if(ingredient.quantity.amount > item.amount) {
    //       this.needsIngredients = true;
    //       item.amountToBuy = ingredient.quantity.amount - item.amount;
    //       this.missingIngredients.push(item);
    //     }
    //   }

    // Ali's Code
  //   checkPantry(recipe) {
  //   let hasAllIngredients = true;
  //
  //   recipe.ingredients.forEach(recipeIng => {
  //     const matchedId = this.ingredients.find(pantryIng => {
  //       return recipeIng.id === pantryIng.ingredient;
  //     })
  //
  //     if ((matchedId && (matchedId.amount < recipeIng.quantity.amount)) || !matchedId) {
  //       hasAllIngredients = false;
  //     }
  //   })
  //
  //   return hasAllIngredients;
  // }
  }
}


export default Pantry
