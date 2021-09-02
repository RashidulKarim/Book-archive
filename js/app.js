const noOfResult = document.getElementById('noOfResultFound');
const booksContainer = document.getElementById("books-container");
const searchField = document.getElementById("search-field");
noOfResult.style.color = "gray"

// looding spinner 
    const spinner = (spinnerStatus, containerStatus) => {
        document.getElementById('spinner').style.display= spinnerStatus;
        booksContainer.style.display = containerStatus;
    }


const getInputValue = () => {
    //capture search data
    const searchText = searchField.value;
    booksContainer.textContent = "";
    noOfResult.textContent = "";
    if(searchText.length){
         // show the spinner 
    spinner("block", "none")
        // call api with search data
    getData(searchText) 
    }
    else{
        noOfResult.innerText = `Search box can't be empty. Please write something.`;
    }
    
}

const getData = async(searchText) =>{
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    const res = await fetch(url);
    const data = await res.json()


    if(data.docs.length){
         //call displayData for showing the result.
         spinner("none", "grid")
    displayData(data.docs)    
    const filterBook = data.docs.filter(book => book.title && book.cover_i && book.author_name && book.first_publish_year && book.publisher)
    
    //show No Of Result Found
    noOfResult.innerHTML = `${data?.numFound} results for <span class='font-bold'>"${searchText}"</span>.Showing ${filterBook.length} of ${data?.numFound} .`
    searchField.value = '';
    }
    else{
        noOfResult.innerHTML = `No Result Found For <span class='font-bold'>"${searchText}"</span>`
            // show the spinner 
    spinner("none", "grid")
    }
   

}

const displayData = (data) =>{
    data.forEach(book=> {
        
        if(book.title && book.cover_i && book.author_name && book.first_publish_year && book.publisher){
            const bookContainer = document.createElement('div');
            bookContainer.classList.add("p-4","rounded-lg","border-2","border-red-500")
            bookContainer.innerHTML = `
            <div id= "book-cover">
            <img style="width:120%; height: 350px;" src ="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"/>
            </div>
            <div id= "book-description">
            <h2 class="text-3xl text-purple-700 font-bold mt-2">${book.title.slice(0,15)}</h2>
            <p class="text-gray-500">By ${book.author_name[0]}</p>
            <p>First Publish Year: ${book.first_publish_year}</p>
            <p>Publisher: ${book.publisher[0].slice(0,20)}</p>
            </div>
            `   
            booksContainer.appendChild(bookContainer);
            }})
            
        }
  
