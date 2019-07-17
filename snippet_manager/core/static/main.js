let results
let searchTerm
let cleanSearch

const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')

searchButton.addEventListener('click', function () {
    searchBox.querySelector('input').focus()
    searchTerm = searchBox.querySelector('input').value
    cleanSearch = encodeURIComponent(searchTerm)
    results = document.querySelector('#searchResults')
    fetch(`http://localhost:8000/snippets/`)
        .then(function (response) {
            return response.json()
    })
        .then(function (data) {
            results.innerHTML = ''
            for (let key of data.results) {
                results.appendChild(displayResults(key))
            }
        })
})