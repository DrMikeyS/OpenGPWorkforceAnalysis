if (validateODS(ods)) {
    $('#spinner-container').show()
    fetch('https://us-central1-opengpworkforcedata.cloudfunctions.net/practice?page=' + page + '&ods=' + ods + '&comparitor=' + comparitor)
        .then(function (resp) {
            resp.json().then(function (json) {
                $('#spinner-container').hide()
                data = json[comparitor]
                trenddata = json['trends']
                if (page == 'gp') {
                    //Reformat salaried and partner
                    data.forEach(practice => {
                        practice['TOTAL_GP_PTNR'] = parseFloat(practice['TOTAL_GP_PTNR_PROV_FTE']) + parseFloat(practice['TOTAL_GP_SEN_PTNR_FTE'])
                        practice['TOTAL_GP_SAL'] = parseFloat(practice['TOTAL_GP_SAL_BY_OTH_FTE']) + parseFloat(practice['TOTAL_GP_SAL_BY_PRAC_FTE'])
                    });

                    trenddata.forEach(practice => {
                        practice['TOTAL_GP_PTNR'] = parseFloat(practice['TOTAL_GP_PTNR_PROV_FTE']) + parseFloat(practice['TOTAL_GP_SEN_PTNR_FTE'])
                        practice['TOTAL_GP_SAL'] = parseFloat(practice['TOTAL_GP_SAL_BY_OTH_FTE']) + parseFloat(practice['TOTAL_GP_SAL_BY_PRAC_FTE'])
                    });
                }

                //Set practice name
                practice = data.find(o => o.PRAC_CODE === ods);
                $('#practice-name').html(practice['PRAC_NAME'].toLowerCase())

                setAxes()

                if (page == 'index') {
                    //Create Cards
                    generateCard('FTE GPs (inc. F2, SpR & Locum)',
                        denominatorDesc,
                        'GPFTE',
                        'TOTAL_GP_FTE',
                        ods,
                        1,
                        "gp",
                        denominator)

                    generateCard('FTE Nurses',
                        denominatorDesc,
                        'NSEFTE1',
                        'TOTAL_NURSES_FTE',
                        ods,
                        2,
                        "nurse",
                        denominator)

                    generateCard('FTE Other Clinical',
                        denominatorDesc,
                        'CLINEFTE1',
                        'TOTAL_DPC_FTE',
                        ods,
                        3,
                        "other",
                        denominator)

                    generateCard('FTE Admin',
                        denominatorDesc,
                        'ADMFTE1',
                        'TOTAL_ADMIN_FTE',
                        ods,
                        4,
                        "admin",
                        denominator)
                } else if (page == 'gp') {
                    categories = [{
                            'code': 'TOTAL_GP_FTE',
                            'desc': 'FTE GPs'
                        },
                        {
                            'code': 'TOTAL_GP_PTNR',
                            'desc': 'FTE GP Partners'
                        },
                        {
                            'code': 'TOTAL_GP_SAL',
                            'desc': 'FTE Salaried GPs'
                        },
                        {
                            'code': 'TOTAL_GP_EXRL_FTE',
                            'desc': 'FTE GPs (excl locums + trainees)'
                        },
                        {
                            'code': 'TOTAL_GP_EXR_FTE',
                            'desc': 'FTE GPs (excl trainees)'
                        },
                        {
                            'code': 'TOTAL_GP_EXL_FTE',
                            'desc': 'FTE GPs (excl locums)'
                        },
                        {
                            'code': 'TOTAL_GP_REG_ST1_4_FTE',
                            'desc': 'FTP GP SpR'
                        },
                        {
                            'code': 'TOTAL_GP_REG_F1_2_FTE',
                            'desc': 'FTE F1/F2'
                        },
                        {
                            'code': 'TOTAL_GP_RET_FTE',
                            'desc': 'FTE GP Retainer'
                        },
                        {
                            'code': 'TOTAL_GP_LOCUM_VAC_FTE',
                            'desc': 'FTE Locum Covering Vaccines'
                        },
                        {
                            'code': 'TOTAL_GP_LOCUM_ABS_FTE',
                            'desc': 'FTE Locum Covering Sickness/Maternity'
                        },
                        {
                            'code': 'TOTAL_GP_LOCUM_OTH_FTE',
                            'desc': 'FTE Locum Other'
                        },
                        {
                            'code': 'TOTAL_GP_LOCUM_INF_FTE',
                            'desc': 'FTE Locum Infrequent'
                        }
                    ]

                    generateCardSet(categories, ods, denominatorDesc, denominator, 'gp')

                } else if (page == 'nurse') {
                    categories = [{
                        'code': 'TOTAL_NURSES_FTE',
                        'desc': 'FTE Nurses'
                    }, {
                        'code': 'TOTAL_N_PRAC_NURSE_FTE',
                        'desc': 'FTE Practice Nurses'
                    }, {
                        'code': 'TOTAL_N_ADV_NURSE_PRAC_FTE',
                        'desc': 'FTE ANPs'
                    }, {
                        'code': 'TOTAL_N_NURSE_SPEC_FTE',
                        'desc': 'FTE Nurse Specialists'
                    }, {
                        'code': 'TOTAL_N_EXT_ROLE_NURSE_FTE',
                        'desc': 'FTE Extended Role Practice Nurses'
                    }, {
                        'code': 'TOTAL_N_TRAINEE_NURSE_FTE',
                        'desc': 'FTE Trainee Nurses'
                    }, {
                        'code': 'TOTAL_N_DISTRICT_NURSE_FTE',
                        'desc': 'FTE District Nurses'
                    }, {
                        'code': 'TOTAL_N_NURSE_DISP_FTE',
                        'desc': 'FTE Nurse Dispensers'
                    }, {
                        'code': 'TOTAL_N_NURSE_PTNR_FTE',
                        'desc': 'FTE Nurse Partners'
                    }, ]

                    generateCardSet(categories, ods, denominatorDesc, denominator, 'nurse')

                } else if (page == 'admin') {
                    categories = [{
                        'code': 'TOTAL_ADMIN_FTE',
                        'desc': 'FTE Admin'
                    }, {
                        'code': 'TOTAL_ADMIN_MANAGER_FTE',
                        'desc': 'FTE Manager'
                    }, {
                        'code': 'TOTAL_ADMIN_MANAGE_PTNR_FTE',
                        'desc': 'FTE Manager (partner)'
                    }, {
                        'code': 'TOTAL_ADMIN_MED_SECRETARY_FTE',
                        'desc': 'FTE Medical Secretary'
                    }, {
                        'code': 'TOTAL_ADMIN_RECEPT_FTE',
                        'desc': 'FTE Receptionist'
                    }, {
                        'code': 'TOTAL_ADMIN_TELEPH_FTE',
                        'desc': 'FTE Telephonist'
                    }, {
                        'code': 'TOTAL_ADMIN_ESTATES_ANC_FTE',
                        'desc': 'FTE Estates'
                    }, {
                        'code': 'TOTAL_ADMIN_OTH_FTE',
                        'desc': 'FTE Other'
                    }, {
                        'code': 'TOTAL_ADMIN_APP_FTE',
                        'desc': 'FTE Apprentice'
                    }]

                    generateCardSet(categories, ods, denominatorDesc, denominator, 'admin')

                } else if (page == 'other') {
                    categories = [{
                        'code': 'TOTAL_DPC_FTE',
                        'desc': 'FTE Other Direct Care'
                    }, {
                        'code': 'TOTAL_DPC_DISPENSER_FTE',
                        'desc': 'FTE Dispenser'
                    }, {
                        'code': 'TOTAL_DPC_HCA_FTE',
                        'desc': 'FTE HCA'
                    }, {
                        'code': 'TOTAL_DPC_PHLEB_FTE',
                        'desc': 'FTE Phlebotomist'
                    }, {
                        'code': 'TOTAL_DPC_PHARMA_FTE',
                        'desc': 'FTE Pharmacist'
                    }, {
                        'code': 'TOTAL_DPC_PHYSIO_FTE',
                        'desc': 'FTE Physio'
                    }, {
                        'code': 'TOTAL_DPC_THERA_COU_FTE',
                        'desc': 'FTE Counsellor'
                    }, {
                        'code': 'TOTAL_DPC_NURSE_ASSOC_FTE',
                        'desc': 'FTE Nurse Associates'
                    }, {
                        'code': 'TOTAL_DPC_PARAMED_FTE',
                        'desc': 'FTE Paramedics'
                    }, {
                        'code': 'TOTAL_DPC_PHARMT_FTE',
                        'desc': 'FTE Pharmacy Technicians'
                    }, {
                        'code': 'TOTAL_DPC_SPLW_FTE',
                        'desc': 'FTE SPLW'
                    }]

                    generateCardSet(categories, ods, denominatorDesc, denominator, 'other')

                }
            })
        })
        .catch(function (error) {
            console.log(error)
        });
} else {

}