const apikey = "bdd381e03dcc43d59272a06222a16d58";
const blogContainer = document.getElementById("blog-container");
const searchField =  document.getElementById('search-input');
const searchButton =  document.getElementById('search-btn');
searchButton.addEventListener("click",async () => {
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const arti = await fetchNewsQuery(query);
            // const artiData = await arti.json();
            // console.log(artiData, " This is the fetchNewsQuery called");
            displayBlogs(arti);
        }catch(error){
            console.log("Error fetching news By query",error);
        }
    }
});
async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q= ${query}&sortBy=publishedAt&apiKey=bdd381e03dcc43d59272a06222a16d58`;
         const response = await fetch(apiUrl);
         const data = await response.json();
         console.log(data, "fetchNewsQuery is called");
         return data.articles;
    }catch(error){
        console.error("Error fetching random news",error);
        return[];
    }

};
async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-06-24&sortBy=publishedAt&apiKey=bdd381e03dcc43d59272a06222a16d58`;
         const response = await fetch(apiUrl);
         const data = await response.json();
         console.log(data);
         return data.articles;
    }catch(error){
        console.error("Error fetching random news",error)
        return[]
    }
}
function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage == null ? "https://s03.s3c.es/imag/_v0/7952x4340/8/6/b/1200x655_ferrari-bloomberg.jpg" : article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h3");
        const trunTitle = article.title.length > 50 ? article.title.slice(0,50) + "..." : article.title;
        title.textContent = trunTitle; //article.title.slice(0,50) + "...";
        const description = document.createElement("p");
        const descrp = article.description.length > 120 ? article.description.slice(0,120) + "..." : article.description;
        description.textContent = descrp;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",() =>{ window.open(article.url, "_blank")});
        blogContainer.appendChild(blogCard); 
    });
}
(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.log("Error fetching random news",error);
    }
})();