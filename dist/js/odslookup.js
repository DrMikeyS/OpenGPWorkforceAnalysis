$(document).ready(function () {
    $('#autoSuggest').autocomplete({
        source: practiceODSCode,
        minLength: 2
    })

});