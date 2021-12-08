
//arry to fil with movies
let starMovies = [];

//fetch all the movies
//maps out all the movies
//and set the title and release date
//"index" gives every "star-cards" div an index
const starFetch = async () => {
    try {
        //fetch the movies
        const res = await fetch(`https://swapi.dev/api/films`);
        const data = await res.json();
        //adds the results to the starMovies array
        starMovies = data.results;
        //maps out all the movies with title and release date, and gives an index
        document.querySelector("#main-wrapper").innerHTML = starMovies.map((star, index) => {
            return `<div class="star-cards" onclick="openModal(${index})"><h3>${star.title}</h3></br><p>${star.release_date}</p></div>`
        }).join("");
        
    
    }catch(error){
        //logs error is it fails
        console.log(error)
    }; 
};

//characters comes in url format
//this fetches all the urls
const starChar = (index) => {
    const people = starMovies[index].characters.map((url) => {
        return fetch(url).then(res => res.json())
    });
    return people;
};

//when you click a modal this function runs
//with the given index to get the right movie
const openModal = async (index) => {
   
   //when you click a modal, it sets the div to display flex to be shown
   document.getElementById("modal-wrapper").style.display = "flex";
   
    //this runs the fetch for all the urls
    const poepleArray = starChar(index)
    const charactersArray = await Promise.all(poepleArray).catch((err) => alert(err))
    console.log(charactersArray)

    //renders out the movie title of the card you clicked on
    document.getElementById("star-header").innerHTML = `<h2>${starMovies[index].title}</h2> 
    <span><i class="fa fa-window-close" aria-hidden="true" onclick="closeStar()"></i></span>`
    //this maps out all the names of the characters in that movie
    document.querySelector("#star-content").innerHTML = charactersArray.map((test) => {
        return `<p>${test.name}</p>`
        //then sorts by first letter and removes the ","
    }).sort().join("")
    
};

//when you press the x on the card it changes to display none to be hidden
const closeStar = () => {
    document.getElementById("modal-wrapper").style.display = "none";
    document.getElementById("star-content").innerHTML = `<div class="star-loader-content"></div>`
    document.getElementById("star-header").innerHTML = `<h2>Loading</h2>`
}

//runs starFetchs on load to map out the movies
window.addEventListener("load", () => {
    starFetch();
})

