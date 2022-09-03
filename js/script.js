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
    const blogContainer = document.getElementById('blog-content');
    blogContainer.innerHTML = ``
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
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``
    const blogContainer = document.getElementById('blog-content');
    blogContainer.innerHTML = `
        <div class="mx-auto w-50">
            <div>
                <p class="fw-semibold">Q: What is differance between var let const ?</p>
                <p>A: <span>var  - </span><span>We can change the var variable at any time in any way, and we can access wherever the var is. And var is relese before ES6</span>
                <br>
                <span>let : </span><span> let variable is introduced in ES6. It is also like var but not full of like var . its declaration and assignment are similar to var . we can update the value but not access all of time in anywhere </span>
                <br>
                <span>const : </span><span>I think const varible is to much secure for variable. we can not modify the const variable but const allows to modify the values of array with some conditions</span>
                </p>
            </div>
            <div>
                <p class="fw-semibold">Q: What is differance between Arrow function and Regular function ?</p>
                <p>A: Arrow function is new way to write anonymous function , and are similar to some other programming languages, such as phythone.<br>
                Regular function created using function are constructible and callable.Regular function are construtible, they can be called using the new keyword.
                </p>
            </div>
            <div>
                <p class="fw-semibold">Q: Why using template string ?</p>
                <p>A: ES< introduced us with template string. Template sting to much powerful from any other strings.We can make dynamic anything using template string</p>
            </div>
        </div>
    `
})
loadNews(8)
loadCategories()