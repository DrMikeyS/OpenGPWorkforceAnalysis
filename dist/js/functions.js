function getQuery() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams
}

//Generate background colour to highlight ODS code of interest
function backgroundColourGenerator(dataArray, PRAC_CODE) {
    backgroundColorArray = [];
    dataArray.forEach(element => {
        if (element.PRAC_CODE == PRAC_CODE) {
            backgroundColorArray.push('rgb(0, 94, 184,0.6)')
        } else {
            backgroundColorArray.push('rgb(100, 100, 100,0.6)')
        }
    });
    return backgroundColorArray
}

function generateRelativeNumbers(yAxisKey, denominator) {
    multiplier = 1
    //Muliplier to make numbers nicer
    if (denominator == 'needIndex') {
        multiplier = 1000000
    } else if (denominator == 'TOTAL_PATIENTS') {
        multiplier = 10000
    }

    data.forEach(element => {
        element[yAxisKey + 'by' + denominator] = (parseFloat(element[yAxisKey]) / element[denominator]) * multiplier
    })
    trenddata.forEach(element => {
        element[yAxisKey + 'by' + denominator] = (parseFloat(element[yAxisKey]) / element[denominator]) * multiplier
    })

}

//Generate a line chart based on a variable
function generateLineChart(yAxisKey, elementID, denominator = 'needIndex') {
    if (denominator != 'raw') {
        generateRelativeNumbers(yAxisKey, denominator)
        yAxisKey = yAxisKey + 'by' + denominator
    }
    tdata = trenddata.filter(x =>
        !isNaN(x[yAxisKey])
    );
    tdata.sort(function (a, b) {
        return new Date(a.x) - new Date(b.x);
    });

    config = {
        type: 'line',
        data: {
            datasets: [{
                label: yAxisKey,
                data: tdata,
                parsing: {
                    yAxisKey: yAxisKey
                },
                borderColor: 'rgb(0, 94, 184,0.6)',
                tension: 0.1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    return new Chart(

        document.getElementById(elementID + '-line'),
        config
    );
}

//Generate a bar chart based on a variable
function generateBarChart(yAxisKey, PRAC_CODE, elementID, denominator) {
    if (denominator != 'raw') {
        generateRelativeNumbers(yAxisKey, denominator)
        yAxisKey = yAxisKey + 'by' + denominator
    }
    tdata = data.filter(x =>
        !isNaN(x[yAxisKey])
    );
    //Sort by the yAxisKey to make chart readable
    tdata.sort(function (a, b) {
        return Number(a[yAxisKey]) - Number(b[yAxisKey]);
    });

    backgroundColorArray = backgroundColourGenerator(tdata, PRAC_CODE);
    config = {
        type: 'bar',
        data: {
            datasets: [{
                label: yAxisKey,
                data: tdata,
                backgroundColor: backgroundColorArray,
                parsing: {
                    yAxisKey: yAxisKey
                }
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                }
            }
        }
    };

    return new Chart(
        document.getElementById(elementID + '-bar'),
        config
    );
}

function generateCard(title, subtitle, chartelementid, yAxisKey, PRAC_CODE, column, style, denominator = 'needIndex') {
    html = `<!-- Start Card-->
    <div class="card card-primary card-outline ` + style + `-card">
        <div class="card-header">
            <h5 class="m-0">` + title + `</h5>
            <h7 style="color:grey;">` + subtitle + `</h7><br>
            <small style="color:grey;"><a href="#" data-toggle="modal" data-target="#exampleModal">Change Denominator</a></small>
        </div>
        <div class="card-body">
        <h7>Comparison to other practices</h7>
            <div class="row">
                <div class="col">
               
                    <div class="chart-container" style="position: relative; height:100%;">
                        <canvas id="` + chartelementid + `-bar"></canvas>
                    </div>
                </div>
            </div>
            <h7>Trend over time</h7>
            <div class="row">
                <div class="col">
                    <div class="chart-container" style="position: relative; height:100%;">
                        <canvas id="` + chartelementid + `-line"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Card-->`
    $('#col-' + column).append(html)
    setTimeout(function () {
        generateBarChart(yAxisKey, PRAC_CODE, chartelementid, denominator);
        generateLineChart(yAxisKey, chartelementid, denominator);
    }, 10);
}

function setAxes() {
    //Set X-axis to be practice ODS code for bars
    data.forEach(element => {
        element.x = element.PRAC_NAME;
    });

    //Set X-axis to be Date for trend
    trenddata.forEach(element => {
        element.x = element.Date;
    });
}

function generateCardSet(categories, ods, denominatorDesc, denominator, style) {
    i = -1;
    col = 1;
    categories.forEach(category => {
        i++;
        generateCard(category['desc'],
            denominatorDesc,
            'colum' + i,
            category['code'],
            ods,
            col,
            style,
            denominator)

        if (col < 4) {
            col++
        } else {
            col = 1;
        }
    });
}

function validateODS(ods){
    if(ods!= null && ods.length==6){
        return true
    }else{
    return false
    }
    }