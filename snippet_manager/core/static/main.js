let results
let searchTerm
let cleanSearch

const searchAttr = document.querySelector('#searchTerm')
const Prism = require('./prism.js')
const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')
if (document.querySelector('#loggedIn')) {
    let copyUser = document.querySelector('#loggedIn').dataset['username']
}

function displayResults(key) {
    const resultsDiv = document.createElement('div')
    resultsDiv.classList.add('snippet')
    resultsDiv.innerHTML = `
    <p><strong>${key.title}</strong> | added on: ${key.date}</p>
    <div class='code-toolbar'>	
		<pre class='line-numbers language-${key.language}'><code class="language-${key.language}"><strong>### ${key.language} ###</strong>
	
		${key.code}</code></pre>
    </div>`
    if (document.querySelector('#loggedIn')) {
        resultsDiv.innerHTML += `
    <button class="copyButton" data-pk="${key.pk}" data-title="${key.title}" data-language="${key.language}" data-description="${key.description}" data-code="${key.code}">Copy</button>
    `
    }
    return resultsDiv
}

searchButton.addEventListener('click', function () {
    searchBox.querySelector('input').focus()
    searchTerm = searchBox.querySelector('input').value
    cleanSearch = encodeURIComponent(searchTerm)
    results = document.querySelector('#searchResults')
    fetch(`http://localhost:8000/${searchAttr.value}/?search=${cleanSearch}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            results.innerHTML = ''
            for (let key of data) {
                results.appendChild(displayResults(key))
            }
            Prism.highlightAll()
        })
})
document.querySelector("#searchInput").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    document.querySelector("#searchButton").click()
    event.preventDefault()
});



let editorLangSelect = document.querySelector("#id_language");
if (editorLangSelect) {
    editorLangSelect.addEventListener("change", function () {
        code_codemirror.setOption("mode", editorLangSelect.value.toLowerCase())
    })
}



let copyTitle
let copyLanguage
let copyCode
let copyOriginal
let copyDescription
let copyDict

const copyButton = document.querySelector('#copyButton')

document.querySelector('#searchResults').addEventListener('click', function (event) {
    if (event.target && event.target.matches('.copyButton')) {
        copyTitle = event.target.dataset['title']
        copyLanguage = event.target.dataset['language']
        copyCode = event.target.dataset['code']
        copyOriginal = event.target.dataset['pk']
        copyDescription = event.target.dataset['description']
        let copyDate = getDate()

        copyDict = {
            "language": copyLanguage,
            "title": copyTitle,
            "code": copyCode,
            "user": copyUser,
            "original": copyOriginal,
            "description": copyDescription,
            "date": copyDate
        }
        // console.log(copyDict)
        console.log(JSON.stringify(copyDict))
        fetch('http://localhost:8000/snippets/', {
            method: 'POST',
            body: JSON.stringify(copyDict),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));

    }
})


function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
}
