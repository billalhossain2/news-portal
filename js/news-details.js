const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get('newsId');

const loadNewsDetails = async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    const newsDetails = data.data[0];
    displayNewsDetails(newsDetails)
}


const displayNewsDetails = (newsDetails)=>{
    console.log("news details=====> ", newsDetails)
    const {image_url, title, details} = newsDetails;
    const titleH1 = document.getElementById("title")
    titleH1.innerText = title;
    const imgElem = document.getElementById("img")
    imgElem.setAttribute('src', image_url)
    const detailsP = document.getElementById("details")
    detailsP.innerText = details;
}

loadNewsDetails()

