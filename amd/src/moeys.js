/* jshint ignore:start */
const logger = window.console.log;

define(['jquery', 'core/log'], function ($, log) {

    "use strict"; // ... jshint ;_;.

    log.debug('MoEYS AMD');

    function SetupMoEYSInstance() {
        log.debug('MoEYS AMD init');

        const request = axios.create({
            baseURL: "/theme/jquery.php/theme_" + M.cfg.theme + "/moeys/json/"
        });

        return {
            request: request,
            data: {
                provinces: [],
                districts: [],
                schools: [],
            },
            log: logger
        };
    }

    function createSelectOptions(arr) {
        var list = [$("<option>").val("").text("Choose an option")];

        arr.forEach(function (item) {
            var opt = $("<option>").val(item.id).text(item.name);

            list.push(opt);
        });

        return list;
    }

    return {
        init: function () {
            function onMoEYSReady() {
                const MoEYS = SetupMoEYSInstance();
                window['MoEYS'] = MoEYS;

                // Variables
                const PROVINCE_INPUT_ID = '#id_profile_field_school_province_id';
                const DISTRICT_INPUT_ID = '#id_profile_field_school_district_id';
                const SCHOOL_INPUT_ID = '#id_profile_field_school_id';

                // Check if Province select option on the page
                if ($(PROVINCE_INPUT_ID).length === 0) {
                    MoEYS.log('MoEYS', 'Failed to initialized');
                    return;
                }

                // Save the default input value
                const default_province_id = $(PROVINCE_INPUT_ID).val();
                const default_district_id = $(DISTRICT_INPUT_ID).val();
                const default_school_id = $(SCHOOL_INPUT_ID).val();

                MoEYS.log('MoEYS User School', {
                    province_id: default_province_id,
                    district_id: default_district_id,
                    school_id: default_school_id
                })

                // Emptying Select Options
                const options = createSelectOptions([]);

                $(SCHOOL_INPUT_ID)[0].options.length = 0;
                $(SCHOOL_INPUT_ID).append(options);

                $(DISTRICT_INPUT_ID)[0].options.length = 0;
                $(DISTRICT_INPUT_ID).append(options);

                $(SCHOOL_INPUT_ID)[0].options.length = 0;
                $(SCHOOL_INPUT_ID).append(options);


                // Add change event listener
                $(PROVINCE_INPUT_ID).on('change', function (event) {
                    MoEYS.log('MoEYS', {
                        type: 'PROVINCE_INPUT_ID',
                        event: event
                    });

                    const province_id = $(event.target).val();

                    const districtList = MoEYS.data.districts.filter(function (item) {
                        return item.province_id == province_id;
                    });

                    const options = createSelectOptions(districtList);
                    $(DISTRICT_INPUT_ID)[0].options.length = 0;
                    $(DISTRICT_INPUT_ID).append(options);
                });

                $(DISTRICT_INPUT_ID).on('change', function (event) {
                    MoEYS.log('MoEYS', {
                        type: 'DISTRICT_INPUT_ID',
                        event: event
                    });

                    const district_id = $(event.target).val();

                    MoEYS.request
                        .get('/district/' + district_id + '.json')
                        .then(function (res) {
                            MoEYS.data.schools = res.data;

                            const options = createSelectOptions(res.data.schools);
                            $(SCHOOL_INPUT_ID)[0].options.length = 0;
                            $(SCHOOL_INPUT_ID).append(options);

                            return options;
                        })
                        .then(function () {
                            if (default_school_id) {
                                $(SCHOOL_INPUT_ID).val(default_school_id)
                            }
                        });
                });

                // Get the province data
                MoEYS.request
                    .get('provinces.json')
                    .then(function (res) {
                        MoEYS.log('MoEYS', 'Getting provinces data');
                        MoEYS.data.provinces = res.data;

                        const options = createSelectOptions(res.data);
                        $(PROVINCE_INPUT_ID)[0].options.length = 0;
                        $(PROVINCE_INPUT_ID).append(options);

                        return true;
                    }).then(function () {
                        // Get the district data
                        return MoEYS.request
                            .get('districts.json')
                            .then(function (res) {
                                MoEYS.log('MoEYS', 'Getting districts data');

                                MoEYS.data.districts = res.data;
                            });
                    })
                    .then(function () {
                        MoEYS.log('MoEYS', 'Set default school data');

                        if (default_province_id) {
                            $(PROVINCE_INPUT_ID)
                                .val(default_province_id)
                                .trigger('change');
                        }

                        if (default_district_id) {
                            $(DISTRICT_INPUT_ID)
                                .val(default_district_id)
                                .trigger('change');
                        }
                    });
            }

            // Ready scripts
            $(document).ready(onMoEYSReady);
        }
    }
})
