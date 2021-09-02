// Configuration

// Books Show 
// const maxBookShowCount = 25; 

// variables declaration  

const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')
const searchResultContainer = document.getElementById('search-result-container')
const searchSpinner = document.getElementById('search-spinner')        
const resultCount = document.getElementById('result-count')
const alertMsg = document.getElementById('alert')
const searchHistory = document.getElementById('search-history')

// init
searchSpinner.style.display = 'none'
alertMsg.style.display = 'none';






searchInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        getDataFromOpenLibrary(searchInput.value);
    }
}); 
btnSearch.addEventListener('click',()=>getDataFromOpenLibrary(searchInput.value));

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
    searchHistory.innerText =  !searchHistory.innerText ?   searchInput.value :  searchHistory.innerText + ', '+ searchInput.value
    searchInput.value ='';

    if (booksFound === 0){
        alertMsg.style.display = 'block';
        console.log('No books found')

    }
    else{
        

        let i=0;
        booksList.forEach(book => {
            i++;
            if(i>24){
                // break;
                return;
            }
            console.log(i, book.text[2], book.first_publish_year ?  book.first_publish_year : 'Published year not found')
            const bookName = book.text.length<10 ? book.text[1] : book.text[2];                                                                               // Book Name 
            const authorName =  checkArray(book.author_name ?  book.author_name : 'Author  not found');                                                           // Author Name
            const publisher =  checkArray(book.publisher ?  book.publisher : 'Publisher not found');                                                             // Publisher
            const publishingDate = checkArray(book.first_publish_year ?  book.first_publish_year : 'Published year not found');                                               // publishing date
            const bookDetails = `https://openlibrary.org/${book.key}` ;                                                                          
            const coverImage =  book.cover_i ?  `https://covers.openlibrary.org/w/id/${book.cover_i}-M.jpg` : 'https://dummyimage.com/180x290/000000/fff&text=BOOK+ARCHIVE'

            //https://dummyimage.com/180x290/000000/fff&text=BOOK+ARCHIVE
            
            // console.log([bookName, authorName, publisher,  publishingDate, book.cover_i])
            
    
            const bookDiv  = document.createElement('div')
            bookDiv.classList.add('col-md-4')
            bookDiv.classList.add('p-3')
            
            bookDiv.innerHTML = 
            `
        
            <div class="row  shadow-lg rounded">
                <div class="col-md-6 p-2 d-flex justify-content-center align-items-center">
                    <img class="border rounded" src="${coverImage}" alt="image not found" width="180px" height="290px">
                    
                </div>
                <div class="col-md-6 d-flex flex-column justify-content-center">
                    <p> <b>Book Name :</b>  ${bookName} </p>
                    <ul>
                        <li> <b>Author :</b>  ${authorName} </li>
                        <li> <b>Publisher :</b>   ${publisher}</li>
                        <li> <b>First Published :</b>   ${publishingDate}</li>
                    </ul>
                    <a class="btn btn-secondary btn-sm" href="${bookDetails}" target="_blank">DETAILS</a>
                </div>
            </div>
        
            `;
            searchResultContainer.appendChild(bookDiv) ;
            resultCount.innerText = `(Showing ${i} result of  ${booksFound} )`
        });
    }
    
    searchSpinner.style.display = 'none' 
}
