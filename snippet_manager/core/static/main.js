let results
let searchTerm
let cleanSearch

const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')

function displayResults (key) {
    const resultsDiv = document.createElement('div')
    resultsDiv.classList.add('snippet')
    resultsDiv.innerHTML = `
    <p><strong>${key.title}</strong> | added on: ${key.date}</p>
    <div class='code-toolbar'>	
		<pre class='line-numbers language-${key.language}'><code class="language-${key.language}"><strong>### ${key.language} ###</strong>
	
		${key.code}</code></pre>
	</div>
    `
    return resultsDiv
}

searchButton.addEventListener('click', function () {
    searchBox.querySelector('input').focus()
    searchTerm = searchBox.querySelector('input').value
    cleanSearch = encodeURIComponent(searchTerm)
    results = document.querySelector('#searchResults')
    fetch(`http://localhost:8000/snippets/?search=${cleanSearch}`)
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
document.querySelector("#searchInput").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#searchButton").click()
    event.preventDefault()
});