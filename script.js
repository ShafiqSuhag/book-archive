// variables declaration  

const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')
const searchResultContainer = document.getElementById('search-result-container')
const searchSpinner = document.getElementById('search-spinner')        
const resultCount = document.getElementById('result-count')
// init
searchSpinner.style.display = 'none'


// Event Handler 
searchInput.addEventListener('keyup',function(event){
    if(event.key === 'Enter'){
        getDataFromOpenLibrary(searchInput.value);
    }
})

btnSearch.addEventListener('click',function(){
    getDataFromOpenLibrary(searchInput.value);
})


// api call
const getDataFromOpenLibrary = (searchValue) => {

    if(searchValue){
        // Clear old results 
        searchResultContainer.innerText='';
        resultCount.innerText = '';
        searchSpinner.style.display = 'block'

        
        const url = `https://openlibrary.org/search.json?q=${searchValue}`
        fetch(url)   
        .then(res => res.json())
        .then(data => displayData(data))
    }
    else{
        console.log('Type book name to search ');
    }

    
   
}

const checkArray = (value) => Array.isArray(value) === true ?  value[0] : value;


const displayData = (data) => {
    console.log(data);
    
    // booksList 
    const booksList = data.docs;
    const booksFound = data.numFound; 
    
    resultCount.innerText = `(Result Match : ${booksFound} )`

    booksList.forEach(book => {
        
        const bookName = book.text[2];                                                                               // Book Name 
        const authorName =  checkArray(book.author_name);                                                           // Author Name
        const publisher =  checkArray(book.publisher);                                                             // Publisher
        const publishingDate = checkArray(book.first_publish_year);                                               // publishing date
        const coverId = book.cover_i                                                                             // book cover image
        
        
        // console.log([bookName, authorName, publisher,  publishingDate, book.cover_i])
        

        const bookDiv  = document.createElement('div')
        bookDiv.classList.add('col-md-4')
        bookDiv.classList.add('p-3')
        
        bookDiv.innerHTML = 
        `
    
        <div class="row  shadow-lg rounded">
            <div class="col-md-6 p-2 d-flex justify-content-center align-items-center">
                <img class="border rounded" src="https://covers.openlibrary.org/w/id/${coverId}-M.jpg" alt="image not found" width="180px" height="290px">
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center">
                <p> <b>Book Name :</b>  ${bookName} </p>
                <ul>
                    <li> <b>Author :</b>  ${authorName} </li>
                    <li> <b>Publisher :</b>   ${publisher}</li>
                    <li> <b>First Published :</b>   ${publishingDate}</li>
                </ul>
            </div>
        </div>
    
        `;
        searchResultContainer.appendChild(bookDiv) ;
    });
    searchSpinner.style.display = 'none' 
}
