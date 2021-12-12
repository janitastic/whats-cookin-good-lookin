import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe('Recipe', () => {
  let myRecipe;

  beforeEach(() => {
    myRecipe = new Recipe(recipeData[0]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe ', () => {
    expect(myRecipe).to.be.an.instanceof(Recipe);
  })

  it('should return the names of ingredients in a recipe', () => {
    const expected = [
      'wheat flour',
      'bicarbonate of soda',
      'eggs',
      'sucrose',
      'instant vanilla pudding',
      'brown sugar',
      'salt',
      'fine sea salt',
      'semi sweet chips',
      'unsalted butter',
      'vanilla'
    ]

    const actual = myRecipe.logIngredients()

    expect(actual).to.deep.equal(expected)
  })

  it('should return recipe instructions', () => {
    console.log(myRecipe.logRecipeCost())
    expect(myRecipe.logRecipeDirections()).to.deep.equal([
      {
        instruction: 'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        number: 1
      },
      {
        instruction: 'Add egg and vanilla and mix until combined.',
        number: 2
      },
      {
        instruction: 'Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.',
        number: 3
      },
      {
        instruction: 'Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.',
        number: 4
      },
      {
        instruction: 'Bake for 9 to 10 minutes, or until you see the edges start to brown.',
        number: 5
      },
      {
        instruction: 'Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.',
        number: 6
      }
    ])
  })
  it('should calculate recipe cost', () => {
    expect(myRecipe.logRecipeCost()).to.deep.equal('177.76')
   })
});
