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

denominators = [{
        'value': "index.html?page=" + page + "&ods=" + ods + "&comparitor=" + comparitor + "&denominator=needIndex",
        'desc': 'Weighted Population',
        'code': 'needIndex'
    },
    {
        'value': "index.html?page=" + page + "&ods=" + ods + "&comparitor=" + comparitor + "&denominator=TOTAL_PATIENTS",
        'desc': 'Raw Population',
        'code': 'TOTAL_PATIENTS'
    },
    {
        'value': "index.html?page=" + page + "&ods=" + ods + "&comparitor=" + comparitor + "&denominator=raw",
        'desc': 'None (i.e. raw numbers)',
        'code': 'raw'
    }
]

var $denominator = $("#denominator");
$.each(denominators, function () {
    $denominator.append($("<option />").val(this.value).text(this.desc));
});
$denominator.val(denominators.filter(function (el) {
    return el.code == denominator;
})[0].value)

$('#denominator').on('change', function () {
    var url = $(this).val();
    if (url) {
        window.location = url;
    }
    return false;
});

pages = [{
        'code': 'index',
        'desc': 'Pracitce Summary',
        'value': "index.html?page=index&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator
    },
    {
        'code': 'gp',
        'desc': 'GP Detailed Breakdown',
        'value': "index.html?page=gp&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator
    },
    {
        'code': 'nurse',
        'desc': 'Nurse Detailed Breakdown',
        'value': "index.html?page=nurse&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator
    },
    {
        'code': 'other',
        'desc': 'Other Clinical Detailed Breakdown',
        'value': "index.html?page=other&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator
    },
    {
        'code': 'admin',
        'desc': 'Admin Detailed Breakdown',
        'value': "index.html?page=admin&ods=" + ods + "&comparitor=" + comparitor + "&denominator=" + denominator
    }
]

var $view = $("#view");
$.each(pages, function () {
    $view.append($("<option />").val(this.value).text(this.desc));
});
$view.val(pages.filter(function (el) {
    return el.code == page;
})[0].value)

$('#view').on('change', function () {
    var url = $(this).val();
    if (url) {
        window.location = url;
    }
    return false;
});


//Set type
$('#ccg').attr("href", "index.html?page=" + page + "&ods=" + ods + "&comparitor=ccg&denominator=" + denominator)
$('#nearest-neighbour').attr("href", "index.html?page=" + page + "&ods=" + ods + "&comparitor=nearestNeighbour&denominator=" + denominator)

if (comparitor == 'ccg') {
    $('#ccg').removeClass("btn-outline-primary").addClass('btn-primary')
} else {
    $('#nearest-neighbour').removeClass("btn-outline-primary").addClass('btn-primary')
}