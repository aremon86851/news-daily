// Categories 
const loadCategories = () => {
    const uri = `https://openapi.programming-hero.com/api/news/categories`
    fetch(uri)
        .then(res => res.json())
        .then(categori => items(categori.data.news_category))
}

const items = items => {
    const categoryContainer = document.getElementById('categories-container');
    for (const item of items) {
        // console.log(item)
        const createList = document.createElement('li')
        createList.classList.add('list-unstyled', 'border-primary', 'rounded-5', 'border-2', 'border-end', 'border-primary', 'rounded-5', 'border-2', 'border-start')
        createList.innerHTML = `
                    <a class="mx-3 my-2 text-decoration-none text-dark" href="#">${item.category_name}</a>
        `
        categoryContainer.appendChild(createList)
    };
}
