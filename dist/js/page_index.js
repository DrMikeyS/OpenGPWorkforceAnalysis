fetch('https://durhamstudenthealth.co.uk/api/practice?page=index&ods=' + ods)
    .then(function (resp) {
        resp.json().then(function (json) {
            data = json[comparitor]
            trenddata = json['trends']

            //Set practice name
            practice = data.find(o => o.PRAC_CODE === ods);
            $('#practice-name').html(practice['PRAC_NAME'])

            setAxes()

            //Create Cards
            generateCard('GPs',
                denominatorDesc,
                'GPFTE',
                'TOTAL_GP_FTE',
                ods,
                1,
                "gp",
                denominator)

            generateCard('Nurses',
                denominatorDesc,
                'NSEFTE1',
                'TOTAL_NURSES_FTE',
                ods,
                2,
                "nurse",
                denominator)

            generateCard('Other Clinical',
                denominatorDesc,
                'CLINEFTE1',
                'TOTAL_DPC_FTE',
                ods,
                3,
                "other",
                denominator)

            generateCard('Admin',
                denominatorDesc,
                'ADMFTE1',
                'TOTAL_ADMIN_FTE',
                ods,
                4,
                "admin",
                denominator)
        })
    })
    .catch(function (error) {

    });