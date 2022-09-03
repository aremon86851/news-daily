// Categories 
const loadCategories = () => {
    const uri = `https://openapi.programming-hero.com/api/news/categories`
    fetch(uri)
        .then(res => res.json())
        .then(categori => takCategoris(categori.data.news_category))
}

const takCategoris = catgories => {

    const categoryContainer = document.getElementById('categories-container');
    catgories.forEach(item => {
        const createList = document.createElement('li')
        let types = `${item.category_id}`
        let parses = parseFloat(types)
        createList.classList.add('list-unstyled', 'nav-item')
        createList.innerHTML = `
                    <a onclick='loadNews(${parses})' class="nav-link mx-3 my-2 text-decoration-none text-dark fs-5" href="#">${item.category_name}</a>
        `
        categoryContainer.appendChild(createList)
    })
}





// News Post area
const loadNews = (id) => {

    toggleSpiner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data))
}

function showNews(newses) {

    // console.log(newses[0])
    const newsContainer = document.getElementById('news-container');
    const resultLengthContainer = document.getElementById('result-length')
    resultLengthContainer.innerText = `${newses.length} News Found On This Category`
    if (newses.length === 0) {
        resultLengthContainer.innerText = "No Result Found"
    }

    const viewsArray = []
    // console.log(viewsArray)

    toggleSpiner(false)
    // console.log(sorting).         
    newsContainer.innerHTML = ``;

    newses.forEach(news => {
        // console.log(news)
        const createDiv = document.createElement('div');

        const addViewsOnArray = `${news.total_view}`;
        viewsArray.push(addViewsOnArray);

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
                                <a onclick="loadNewsForModal('${news._id}')" href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fs-4 text-primary fa-solid fa-arrow-right-long"></i></a>
                            </div>
                    </div>
                    </div>
                
                </div>
            </div>
`
        newsContainer.appendChild(createDiv);
    })

    toggleSpiner(false)

    // console.log(viewsArray)
    viewsArray.sort((a, b) => {
        return b - a;
    })
}
// Spiner
const toggleSpiner = isloading => {
    const spiner = document.getElementById('loader')
    if (isloading) {
        spiner.classList.remove('d-none')
    }
    else {
        spiner.classList.add('d-none')
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
// Blogs Content
document.getElementById('blog-btn').addEventListener('click', function () {
    const blogContainer = document.getElementById('blog-content');
    blogContainer.innerHTML = `
    <h1>Hi my name is emon</h1>
    `
})
loadNews(8)
loadCategories()