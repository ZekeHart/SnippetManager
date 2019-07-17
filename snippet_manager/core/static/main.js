let results
let searchTerm
let cleanSearch

const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')

function displayResults (key) {
    const resultsDiv = document.createElement('div')
    resultsDiv.classList.add('individualResult')
    resultsDiv.innerHTML = `
    <p><strong>${key.title}</strong> | added on: ${key.date}</p>
    <pre class='line-numbers'><code class="language-${key.language.code }"><strong>### ${key.language.name } ###</strong>
    `
    return resultsDiv
}

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
            for (let key of data) {
                results.appendChild(displayResults(key))
            }
        })
})