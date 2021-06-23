//Globals
var trenddata = []

//Data from url
ods = getQuery().get('ods')
type = getQuery().get('type')

fetch('https://durhamstudenthealth.co.uk/api/practice?page=index&ods=' + ods)
    .then(function (resp) {
        resp.json().then(function (json) {
            data = json[type]
            trenddata = json['trends']

            //Set practice name
            practice = data.find(o => o.PRAC_CODE === ods);
            $('#practice-name').html(practice['PRAC_NAME'])

            //Set type
            if (type == 'ccg') {
                $('#comparison-type').html('CCG mode')
            } else {
                $('#comparison-type').html('Nearest Neighboour mode')
            }

            //Set X-axis to be practice ODS code for bars
            data.forEach(element => {
                element.x = element.PRAC_NAME;
            });

            //Set X-axis to be Date for trend
            trenddata.forEach(element => {
                element.x = element.Date;
            });

            //Create Cards
            generateCard('GPs',
                'Relative to weighted population',
                'GPFTE',
                'TOTAL_GP_FTE',
                ods,
                1)

            generateCard('Nurses',
                'Relative to weighted population',
                'NSEFTE1',
                'TOTAL_NURSES_FTE',
                ods,
                2)

            generateCard('Other Clinical',
                'Relative to weighted population',
                'CLINEFTE1',
                'TOTAL_DPC_FTE',
                ods,
                3)

            generateCard('Admin',
                'Relative to weighted population',
                'ADMFTE1',
                'TOTAL_ADMIN_FTE',
                ods,
                4)


        })
    })
    .catch(function (error) {

    });