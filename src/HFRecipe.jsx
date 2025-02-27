import Markdown from 'react-markdown'

export default function HFRecipe(props) {
    return ( //polite will ensure when the recipe is rendered for the first time, it will be announced and read through assistive technologies
    <section className="suggested-recipe-container" aria-live="polite"> 
        <h2>Recommended Recipe:</h2>
        <Markdown>{props.recipe}</Markdown>
        
    </section>
    )
}