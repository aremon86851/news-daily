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
    // console.log(newses)
    const newsContainer = document.getElementById('news-container');
    const resultLengthContainer = document.getElementById('result-length')
    resultLengthContainer.innerText = `${newses.length} items found for category ${newses[0]}`


    newsContainer.innerHTML = ``;
    for (const news of newses) {
        console.log(news)
        const createDiv = document.createElement('div');
        if (news.author.name === null || news.total_view === null) {
            news.author.name = 'Not Available Name';
            news.total_view = "Not Available View"
        }
        createDiv.classList.add('card', 'mb-3')
        createDiv.innerHTML = `
        <div class="row g-0 p-2 pt-3 pb-0 rounded-lg">
            <div class="col-md-2">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title fs-2 fw-semibold pb-4">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 500)}<span> ....</span></p>
                    <div class="d-flex align-items-center  mt-2">
                        <div class="col-4">
                            <p><img class="img-size me-3" src="${news.author.img}" alt=""><span class="fw-semibold">${news.author.name}</span></p>
                        </div>
                        <div class="d-flex justify-content-center fw-semibold align-items-center col-4">
                            <p><span><i class="fw-bold me-2 fa-regular fa-eye"></i></span><span>
                            ${news.total_view}</span></p>
                        </div>
                        <div class="col-4 d-flex justify-content-end">
                            <a onclick="loadNewsForModal('${news._id}')" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fs-4 text-primary fa-solid fa-arrow-right-long"></i></a>
                        </div>
                </div>
                </div>
            
            </div>
        </div>
    `
        newsContainer.appendChild(createDiv);
    }
}
// For Modal
const loadNewsForModal = (idForModal) => {
    const url = `https://openapi.programming-hero.com/api/news/${idForModal}`
    fetch(url)
        .then(res => res.json())
        .then(modalData => newsForModal(modalData.data[0]))
}
const newsForModal = (modalDatas) => {
    console.log(modalDatas)
    if (modalDatas.author.name === null) {
        news.author.name = 'Not Available Name';
    }
    const modalContainer = document.getElementById('modal-body');
    modalContainer.innerHTML = `
    <div>
        <p><img class="img-fluid" src="${modalDatas.image_url}" alt=""></p>
        <p>${modalDatas.title}</p>
        <p>${modalDatas.details}</p>
        <p class="d-flex justify-content-between"><span class="fw-semibold">Authore Name: ${modalDatas.author.name}</span><span class="fw-semibold">Publish Date: ${modalDatas.author.published_date}</span></p>
        <div class="d-flex justify-content-center">
            <p class="fw-semibold">Rating: <span>${modalDatas.rating.number} </span></span>${modalDatas.rating.badge}</span></p>
        </div>
    </div>
    `
}
loadNews(02)
loadCategories()