(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
