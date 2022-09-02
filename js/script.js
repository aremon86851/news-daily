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
        const createList = document.createElement('li')
        let types = `${item.category_id}`
        let parses = parseFloat(types)
        createList.classList.add('list-unstyled', 'border-primary', 'rounded-5', 'border-2', 'border-end', 'border-primary', 'rounded-5', 'border-2', 'border-start')
        createList.innerHTML = `
                    <a onclick='loadNews(${parses})' class="mx-3 my-2 text-decoration-none text-dark" href="#">${item.category_name}</a>
        `
        categoryContainer.appendChild(createList)
    };
}
// News Post area
const loadNews = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data))
}

function showNews(newses) {
    const newsContainer = document.getElementById('news-container');
    const resultLengthContainer = document.getElementById('result-length')
    resultLengthContainer.innerText = `${newses.length} items found for category Entertainment`
    newsContainer.innerHTML = ``;
    for (const news of newses) {

        const createDiv = document.createElement('div');
        createDiv.classList.add('card', 'mb-3')
        createDiv.innerHTML = `
        <div class="row g-0 p-2 rounded-lg">
            <div class="col-md-2">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">Title</h5>
                    <p class="card-text">News Descriptions</p>
                </div>
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex">
                    <div>
                        <img src="#" alt="">
                    </div>
                    <div>
                        <p class="">Authore Name</p>
                    </div>
                </div>
                <div class="d-flex fw-semibold align-items-center">
                    <div>
                        <i class="fw-bold me-2 fa-regular fa-eye"></i>
                    </div>
                    <div>
                        1.5 M
                    </div>
                </div>
                <div>
                    <a class="btn"><i class=" text-primary fa-solid fa-arrow-right-long"></i></a>
                </div>
            </div>
            </div>
        </div>
    `
        newsContainer.appendChild(createDiv);
    }


}
// loadNews()
loadCategories()