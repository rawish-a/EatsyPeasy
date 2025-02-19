export default function MainPage() {
    const ingredients = ["Chicken", "Oregano", "Tomatoes"]
    
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    //to prevent a page from automatically refreshing, we can grab the event that is passed to handleSubmit function and calling event.preventDefault()
    //this way our form doesnt refresh and it doesnt change the url
    function handleSubmit(event) {
        event.preventDefault()
        //to grab the ingredient that was submitted using the form through form data:
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient") //ingredient is the name of the input from the form
        ingredients.push(newIngredient)
        console.log(ingredients)
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <ul>
                {ingredientsListItems}
            </ul>
 
        </main>

    )
}