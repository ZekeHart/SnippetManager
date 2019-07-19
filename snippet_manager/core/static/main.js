let results
let searchTerm
let cleanSearch
var ifOwn = ''
var dropDownChoice

const snip0Button = document.querySelector('#snip0Button')
const snip1Button = document.querySelector('#snip1Button')
const snip2Button = document.querySelector('#snip2Button')
const snip0 = document.querySelector('#snip0')
const snip1 = document.querySelector('#snip1')
const snip2 = document.querySelector('#snip2')
const searchAttr = document.querySelector('#searchTerm')
dropDownChoice = searchAttr.value
const Prism = require('./prism.js')
const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')
const searchInput = document.querySelector('#searchInput')
const resultArea = document.querySelector('#searchResults')

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
if (document.querySelector('#loggedIn')) {
    var copyUser = document.querySelector('#loggedIn').dataset['username']
    var copyUsername = document.querySelector('#loggedIn').dataset['userstring']
}

function displayResults(key) {
    const resultsDiv = document.createElement('div')
    resultsDiv.classList.add('snippet')
    resultsDiv.innerHTML = `
    <p><strong>${key.title}</strong> | added on: ${key.date}</p>
    <div class='code-toolbar'>	
        <pre class='line-numbers language-${key.language.toLowerCase()}'><code class='language-${key.language.toLowerCase()}'><strong>### ${key.language} ###</strong>

${escapeHtml(key.code)}</code></pre>
    </div>`
    if (document.querySelector('#loggedIn')) {
        resultsDiv.innerHTML += `<div id="copySuccess${key.pk}"></div>
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
    dropDownChoice = searchAttr.value
    if (dropDownChoice === 'own') {
        ifOwn = copyUsername
    } else if (dropDownChoice === 'snippet') {
        ifOwn = ''
    }
    console.log('ahhhhh')
    fetch(`http://localhost:8000/${searchAttr.value}/?search=${cleanSearch}%20${ifOwn}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            results.innerHTML = ''
            for (let key of data) {
                results.appendChild(displayResults(key))
            }
            Prism.highlightAllUnder(results)
            ifOwn = ''
        })
})
document.querySelector("#searchInput").addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    document.querySelector("#searchButton").click()
    event.preventDefault()
});

searchInput.addEventListener('input', function () {
    if (!searchInput.value) {
        resultArea.innerHTML = ''
        return;
    }
    document.querySelector('#searchButton').click()
})



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
        copyDate = new Date()

        copyDict = {
            "language": copyLanguage,
            "title": copyTitle,
            "code": copyCode,
            "user": copyUser,
            "original": copyOriginal,
            "description": copyDescription,
            "date": getDate()
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
        let copySuccess = '#copySuccess' + copyOriginal
        document.querySelector(copySuccess).innerHTML = '<p>You made a copy to your profile!</p>'

    }
})

function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
}

snip0Button.addEventListener('click', function () {
    snip0.classList.toggle('hideSnip')
})
snip1Button.addEventListener('click', function () {
    snip1.classList.toggle('hideSnip')
})
snip2Button.addEventListener('click', function () {
    snip2.classList.toggle('hideSnip')
})
