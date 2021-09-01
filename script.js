// variables declration 

const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')


btnSearch.addEventListener('click',function(){
    if(searchInput.value){
        getDataFromOpenLibrary(searchInput.value);
    }
    
})


// api handle 


const getDataFromOpenLibrary = (searchValue) => {
    
    const url = `https://openlibrary.org/search.json?q=${searchValue}`
    fetch(url)   
    .then(res => res.json())
    .then(data => displayData(data))
   
}



const displayData = (data) => {
    console.log(data);
    // console.log(2,data.docs);


    // booksList 
    const booksList = data.docs;
    booksList.forEach(book => {
        // Book Name 
        const bookName = book.text[2]; 
        // Author Name
        const authorName = book.author_name[0];
        const publisher = book.publisher;
        const publishingDate = book.first_publish_year;
        const coverId = book.cover_i
        // Publisher
        // publishing date
        console.log([bookName, authorName, publisher,  publishingDate, book.cover_i])
        // console.log([bookName, authorName, ...publisher,  publishingDate])
        // book.key;
        // console.log(book.text[2])


        // generate elements for displaying result 
        const searchResultContainer = document.getElementById('search-result-container')
        // console.log(searchResultContainer);

        const bookDiv  = document.createElement('div')
        bookDiv.classList.add('col-4')
        bookDiv.classList.add('p-3')
        // bookDiv.classList.add('bg-info')
        
        // bookDiv.classList.add('shadow-lg')
        // bookDiv.classList.add('rounded')
        
        //  bg-info p-3  shadow-lg  rounded
        bookDiv.innerHTML = 
        `
    
        <div class="row bg-info shadow-lg rounded">
            <div class="col-md-6 p-2">
                <img class="rounded" src="https://covers.openlibrary.org/w/id/${coverId}-M.jpg" alt="" width="180px" height="290px">
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
    // const bookLoop = booksList =>booksList.forEach(element => {
        
    // });

   

}

// getDataFromOpenLibrary();


// const test = ['one','two']

// console.log(...test)