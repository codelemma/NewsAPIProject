const apikey = "bdd381e03dcc43d59272a06222a16d58";
const blogContainer = document.getElementById("blog-container");
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
        img.src = article.urlToImage == null ? "https://images.bild.de/669fd22cd87c335ff8660694/f6c31d089ea2ecb53364fda30ae554d4,bb1bc705?w=1280" : article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        // const trunTitle = article.title.length >30 ? article.title.slice(0,30) + "..." : article.title;
        title.textContent = article.title.slice(0,50) + "...";
        const desccription = document.createElement("p");
        desccription.textContent = article.desccription;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desccription);
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