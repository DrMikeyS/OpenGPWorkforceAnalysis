if (validateODS(ods)) {
    $('#spinner-container').show()
    fetch('https://storage.googleapis.com/opengpworkforcedata.appspot.com/files/' + ods + '.json')
        .then(function (resp) {
            resp.json().then(function (json) {
                $('#spinner-container').hide()
                data = json['ICSPCNs']
                trenddata = json['trends']

                //Set PCN name
                $('#practice-name').html(json['details']['Name'].toLowerCase())

                setAxes(true)
                categories = [{
                        'code': 'Total PCN Staff',
                        'desc': 'Total PCN Staff'
                    }, {
                        'code': 'Pharmacists',
                        'desc': 'Pharmacists'
                    }, {
                        'code': 'Social Prescribing Link Workers',
                        'desc': 'Social Prescribing Link Workers'
                    }, {
                        'code': 'Medical Clinical Director (GP)',
                        'desc': 'Medical Clinical Director (GP)'
                    }, {
                        'code': 'Care Coordinators',
                        'desc': 'Care Coordinators'
                    },
                    {
                        'code': 'Managers',
                        'desc': 'Managers'
                    }, {
                        'code': 'Health and Wellbeing Coaches',
                        'desc': 'Health and Wellbeing Coaches'
                    }, {
                        'code': 'Pharmacy Technicians',
                        'desc': 'Pharmacy Technicians'
                    }, {
                        'code': 'Physiotherapists',
                        'desc': 'Physiotherapists'
                    }, {
                        'code': 'Other Admin/Non-Clinical',
                        'desc': 'Other Admin/Non-Clinical'
                    },
                    {
                        'code': 'Clinical Director (Nurse)',
                        'desc': 'Clinical Director (Nurse)'
                    }, {
                        'code': 'Clinical Director (Direct Patient Care)',
                        'desc': 'Clinical Director (Direct Patient Care)'
                    }, {
                        'code': 'Dietician',
                        'desc': 'Dietician'
                    }, {
                        'code': 'Health Support Workers',
                        'desc': 'Health Support Workers'
                    }, {
                        'code': 'Non-clinical Director',
                        'desc': 'Non-clinical Director'
                    }, {
                        'code': 'Nursing Associates',
                        'desc': 'Nursing Associates'
                    }, {
                        'code': 'Occupational Therapists',
                        'desc': 'Occupational Therapists'
                    }, {
                        'code': 'Paramedics',
                        'desc': 'Paramedics'
                    }, {
                        'code': 'Physician Associates',
                        'desc': 'Physician Associates'
                    }, {
                        'code': 'Podiatrist',
                        'desc': 'Podiatrist'
                    }, {
                        'code': 'Therapists',
                        'desc': 'Therapists'
                    }, {
                        'code': 'Trainee Nursing Associates',
                        'desc': 'Trainee Nursing Associates'
                    }

                ]

                generateCardSet(categories, ods, denominatorDesc, denominator, 'gp', 3)
            })
        })
        .catch(function (error) {
            console.log(error)
        });
} else {

}