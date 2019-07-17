/* globals fetch */

const $ = require('jquery')

$(function() {

    $('#searchInput').keyup(function() {

        $.ajax({
            type: "GET",
            url: "index",
            data: {
                'search_text' : $('#searchInput').val(),
                'csrfmiddlewaretoken' : $("input[name=csrfmiddlewaretoken]").val()
            },
            success: searchSuccess,
            dataType: 'html'
        })
    })
})

function searchSuccess(data, textStatus, jqXHR)
{
    $('#searchResults').html(data)
}