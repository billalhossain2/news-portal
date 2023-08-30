//API load functions 
const loadCategories = async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const categories = data.data.news_category;
    displayCategories(categories)
}

const loadAllNews = async(todaysPick)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/08`)
    const data = await res.json();
    const allNews = data.data;
    displayAllNews(allNews, todaysPick)
}

const loadCategoryNews = async(categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    const categoryNews = data.data;
    displayAllNews(categoryNews)
}

//UI display functions
const displayCategories = (categories)=>{
    const categoryUl = document.getElementById("category-list-container");
    categories.forEach(category => categoryUl.innerHTML += `<li onclick={loadCategoryNews('${category.category_id}')} class="cursor-pointer">${category.category_name}</li>`)
}

const displayAllNews = (allNews, status)=>{
    let categoryNews = document.getElementById("category-news-container")
    let totalFoundElem = document.getElementById("total-found")
    totalFoundElem.innerText = `Total found news: ${allNews.length}`;
    categoryNews.innerHTML = "";
    if(status === "trending"){
        allNews = allNews.filter(news => news.others_info.is_trending)
    }else if(status === "todays_pick"){
        allNews = allNews.filter(news => news.others_info.is_todays_pick)
    }

    const showAllBtn = document.getElementById("show-all-btn")
    //show limited news
    if(allNews.length > 5 && !status){
        allNews = allNews.slice(0, 5)
        showAllBtn.classList.remove('hidden')
    }else{
        showAllBtn.classList.add('hidden')
    }
    allNews.forEach(newsItem => {
        let {_id:id, image_url, title, details, author, total_view, rating} = newsItem;
        
        //show each news
        categoryNews.innerHTML += `
        <div class="flex lg:flex-row flex-col items-center gap-8 my-10">
                    <div class="lg:min-w-[300px] w-[100%] h-[300px]"><img class="w-[100%] h-[100%] rounded-lg" src="${image_url}" alt="News Image"></div>
                    <div>
                        <h1 class="font-bold text-2xl mb-3">${title}</h1>
                        <p class="text-justify">${details.length > 250 ? `<span>${details.slice(0, 250)} <button class="text-yellow-600">Read More...</button></span>` : details}</p>
                        <div class="flex lg:flex-row flex-col gap-5 justify-between mt-5 items-center">
                            <div class="flex items-center gap-3">
                                <img class="w-[40px] h-[40px] rounded-full" src="${author.img}" alt="author image">
                                <div>
                                    <b>${author.name || "Not found!"}</b>
                                    <p>${author.published_date || "Not found!"}</p>
                                </div>
                            </div>
                            <div>
                                <i class="fa-regular fa-eye"></i>
                                <span>${total_view || "Not Found"}</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <span>${rating.number}</span>
                            </div>
                            <p onclick="handleNewsDetails('${id}')">
                            <i class="fa-solid fa-arrow-right text-[#5D5FEF] text-2xl cursor-pointer"></i>
                            </p>
                        </div>
                    </div>
        </div>
        `;
    })
}


//news details
const handleNewsDetails = (newsId) =>{
    location.replace(`../pages/newsDetails.html?newsId=${newsId}`);
}

//handle show all news
function handleShowAllNews(){
    loadAllNews(true)
}

//filter function
function getTodaysPick(){
    loadAllNews('todays_pick');
}

function getTrending(){
    loadAllNews("trending");
}

loadCategories()
loadAllNews()