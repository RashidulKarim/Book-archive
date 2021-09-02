//capture search field
const searchField = document.getElementById("search-field");
//capture search result peragraph
const noOfResult = document.getElementById('noOfResultFound');
//capture book container div
const booksContainer = document.getElementById("books-container");

//  conditionally show and hide spinner 
    const spinner = (spinnerStatus, containerStatus) => {
        document.getElementById('spinner').style.display= spinnerStatus;
        booksContainer.style.display = containerStatus;
    }

//get search data from user
const getInputValue = () => {
    const searchText = searchField.value;
    booksContainer.textContent = "";
    noOfResult.textContent = "";
    if(searchText.length){
    spinner("block", "none")
    getData(searchText) 
    }
    else{
        noOfResult.innerText = `Search box can't be empty. Please write something.`;
    }
}
// load data from api 
const getData = async(searchText) =>{
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    const res = await fetch(url);
    const data = await res.json()
    const filterBook = data.docs.filter(book => book.title && book.cover_i && book.author_name && book.first_publish_year && book.publisher)
    if(filterBook.length){
    spinner("none", "grid") 
    displayData(filterBook)    
    //show Number Of Result Found
    noOfResult.innerHTML = `${data?.numFound} results for <span class='font-bold'>"${searchText}"</span>.Showing ${filterBook.length} of ${data?.numFound} .`
    searchField.value = '';
    }
    else{
        noOfResult.innerHTML = `No Result Found For <span class='font-bold'>"${searchText}"</span>`
        spinner("none", "grid")
    }
}
    // show books on ui
const displayData = (data) =>{
    data.forEach(book=> {
            const bookContainer = document.createElement('div');
            bookContainer.classList.add("p-4","rounded-lg","border-2","border-red-500")
            bookContainer.innerHTML = `
            <div id= "book-cover">
            <img style="width:120%; height: 350px;" src ="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"/>
            </div>
            <div id= "book-description">
            <h2 class="text-3xl text-purple-700 font-bold mt-2 mb-1">${book.title.slice(0,15)}</h2>
            <p class="text-gray-500 font-bold">By ${book.author_name[0]}</p>
            <p>First Publish: <span class="font-bold">${book.first_publish_year}</span></p>
            <p>Publisher: <span class="font-bold">${book.publisher[0].slice(0,18)}</span></p>
            </div>
            `   
            booksContainer.appendChild(bookContainer);
            }) 
        }
  
