import Pantry from '../src/classes/Pantry'
import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import usersData from '../src/data/users';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';

describe('Pantry', () => {
  let user, myPantry, recipe1, recipe2, recipe3, recipe4, fakeRecipe;

  beforeEach(()=> {
    user = new User(usersData[0]);
    myPantry = new Pantry(user);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[2]);
    recipe4 = new Recipe(recipeData[3]);
    fakeRecipe = new Recipe({
      "id": 97979797,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        { id: 20081, quantity: { amount: 1.5, unit: 'c' } },
        { id: 18372, quantity: { amount: 0.5, unit: 'tsp' } },
        { id: 1123, quantity: { amount: 1, unit: 'large' } },
        { id: 19335, quantity: { amount: 0.5, unit: 'c' } },
        { id: 19206, quantity: { amount: 3, unit: 'Tbsp' } },//short 1 amount
        { id: 19334, quantity: { amount: 0.5, unit: 'c' } },//not in pantry
        { id: 2047, quantity: { amount: 0.5, unit: 'tsp' } },
        { id: 1012047, quantity: { amount: 24, unit: 'servings' } },//not in pantry
      ],
      "instructions": [
        {
          "instruction": "Pour into a bowl",
          "number": 1
        },
        {
          "instruction": "Stick into oven",
          "number": 2
        },
        {
          "instruction": "Serve hot.",
          "number": 3
        }
      ],
      "name": "Fake recipe",
      "tags": [
        "fake tag"
      ]
    })

  })

  it('should instantiate a new pantry', () => {
    expect(Pantry).to.be.a('function');
  })

  it('should be an instance of Pantry', () => {
    expect(myPantry).to.be.an.instanceof(Pantry);
  });

  it('should have the correct amount of pantry items', () => {
    expect(myPantry.pantry.length).to.equal(35);
  })

  it('should check to see if there is enough of an ingredient a recipe needs in the pantry', () => {
    myPantry.checkPantry(fakeRecipe);
    expect(myPantry.missingAmount).to.equal(1);
  })

  it('should be able to create a shopping list with all the missing ingredients and amounts', () => {
    myPantry.checkPantry(fakeRecipe);
    expect(myPantry.shoppingList.length).to.equal(3);
  })

  it('should return the names of ingredients in a recipe', () => {
    const expected = ['flat leaf parsley leaves',
  'kosher salt', 'wheat flour', 'whole garlic clove','salt', 'eggs','onions', 'chicken stock', 'basil',
  'vanilla',
  'dried red chili',
  'roasted chicken',
  'cream cheese',
  'baking powder',
  'butter',
  'canned chipotle chilies in adobo',
  'buttermilk',
  'lemon juice',
  'white onions',
  'almondmilk',
  'white wine',
  'full-fat milk',
  'bar b que sauce',
  'egg albumen',
  'canned tomato',
  's&p',
  'instant vanilla pudding',
  'unsalted butter',
  'black pepper',
  'whole almonds',
  'sucrose',
  'jumbo shrimp',
  'apple',
  'bicarbonate of soda',
  'oregano'
];
    const actual = myPantry.logPantryIngredients(ingredientsData);
    expect(actual).to.deep.equal(expected);
  });
});
