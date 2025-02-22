import React from 'react'

export default function MainPage() {
    const [ingredients, setIngredients] = React.useState(["potatoes","pasta","main spices","quinoa"])
    //The useState hook initializes an empty array ([]) to store the list of ingredients.
    //ingredients holds the current list of ingredients
    //setIngredients is the function used to update this list

    const [recipeShown, setRecipeShown] = React.useState(false)
    
    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
    }

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    //This function extracts the ingredient name from the form’s formData.
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient") //ingredient is the name of the input in the form
        setIngredients(prevIngredient => [...prevIngredient, newIngredient]) //it is crucial for properly updating the ingredients state
    }
    //setIngredients(prevIngredient => [...prevIngredient, newIngredient]) updates the state by adding the new ingredient to the existing list.

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {ingredients.length > 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a reciepe from your list of ingredients</p>
                    </div>
                    <button onClick={toggleRecipeShown}>Get a recipe</button>
                </div>}
            </section>}


            {recipeShown && <section>
                    <h2>Instructions:</h2>
                    <p>    Sauté Aromatics: Heat olive oil in a pot over medium heat. Add minced garlic and grated ginger, stirring for 1-2 minutes until fragrant.
                    Cook Tomatoes: Add chopped tomatoes and cook for 3-4 minutes until they break down and become saucy.
                    Add Potatoes: Stir in diced potatoes, paprika, black pepper, and salt. Mix well to coat the potatoes in the tomato mixture.
                    Simmer: Pour in the vegetable broth, bring to a boil, then reduce heat and let it simmer for 15-20 minutes until the potatoes are tender.
                    Toast Bread: While the stew simmers, toast the sourdough bread until golden brown.
                    Serve: Ladle the stew into bowls and serve with the toasted sourdough on the side.</p>
                </section>}


        </main>

    )
}