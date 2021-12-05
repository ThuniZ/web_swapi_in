console.log("hej")

//arry to fil with movies
let starMovies = [];

//fetch all the movies
//maps out all the movies
//and set the title and release date
//"index" is to give every "star-cards" div an index
const starFetch = async () => {
    try {
        const res = await fetch(`https://swapi.dev/api/films`);
        const data = await res.json();
        starMovies = data;
        console.log(starMovies)
        document.querySelector("#main-wrapper").innerHTML = starMovies.results.map((star, index) => {
            return `<div class="star-cards" onclick="openModal(${index})"><h3>${star.title}</h3></br><p>${star.release_date}</p></div>`
        }).join("");
    }catch(error){
        alert(error)
    }; 
};

const starChar = (index) => {
    const people = starMovies.results[index].characters.map((url) => {
        fetch(url).then((res) => res.json())
    
       
    });
    
    return people;
    
};
//console.log(people)


const openModal = (index) => {
    Promise.all(starChar(index))
    //.then((res) => res.json());
    document.getElementById("modal-wrapper").style.display = "flex";
    document.getElementById("star-header").innerHTML = `<h2>${starMovies.results[index].title}</h2>`
    //document.getElementById("star-content").innerHTML = `<p>${starChar(index)}</p>`
    //console.log(starChar(index))
    //console.log(people)
    
};

window.addEventListener("load", () => {
    starFetch();
})

