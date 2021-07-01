//Globals
var trenddata = []

//Data from url
ods = getQuery().get('ods')
comparitor = getQuery().get('comparitor')
denominator = getQuery().get('denominator')
page = getQuery().get('page')

if (comparitor != 'ccg' && comparitor != 'nearestNeighbour') {
    comparitor = 'nearestNeighbour'
}

if (denominator != 'needIndex' && denominator != 'TOTAL_PATIENTS' && denominator != 'raw') {
    denominator = 'needIndex'
}

if (page != 'gp' && page != 'nurse' && page != 'admin' && page != 'other') {
    page = 'index'
}

//Change add nicer denominator descriptions
switch (denominator) {
    case 'needIndex':
        denominatorDesc = "Relative to weighted population"
        break;
    case 'TOTAL_PATIENTS':
        denominatorDesc = "Relative to total population"
        break;
    case 'raw':
        denominatorDesc = "Raw FTE numbers"
        break;
}

//Population dynamic modal links
$('#need-index-link').attr("href", "index.html?page=" + page + "&ods=" + ods + "&comparitor=" + comparitor + "&denominator=needIndex")
$('#total-population-link').attr("href", "index.html?page=" + page + "&ods=" + ods + "&comparitor=" + comparitor + "&denominator=TOTAL_PATIENTS")
$('#raw-link').attr("href", "index.html?page=" + page + "&ods=" + ods + "&comparitor=" + comparitor + "&denominator=raw")

//Populate nav links
$('#index-button').attr("href", "index.html?page=index&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator)
$('#gp-button').attr("href", "index.html?page=gp&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator)
$('#nurse-button').attr("href", "index.html?page=nurse&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator)
$('#other-button').attr("href", "index.html?page=other&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator)
$('#admin-button').attr("href", "index.html?page=admin&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator)

//Set type
if (comparitor == 'ccg') {
    $('#comparison-type').html('CCG mode')
    $('#change-comparison').html('Switch to Nearest Neighbour Mode')
    $('#change-comparison').attr("href", "index.html?page=" + page + "&ods=" + ods + "&comparitor=nearestNeighbour&denominator=" + denominator)
} else {
    $('#comparison-type').html('Nearest Neighbour mode')
    $('#change-comparison').html('Switch to CCG Mode')
    $('#change-comparison').attr("href", "index.html?page=" + page + "&ods=" + ods + "&comparitor=ccg&denominator=" + denominator)
}