/* jshint ignore:start */
define(['jquery', 'core/log'], function ($, log) {

    "use strict"; // ... jshint ;_;.

    log.debug('MoEYS AMD');

    return {
        init: function () {
            const MoEYS = {
                theme: M.cfg.theme,
                basedir: '',
                request: null,
                data: {
                    default: {
                        province_id: '',
                        district_id: '',
                        school_id: '',
                    },
                    options: {
                        provinces: [],
                        districts: [],
                        school_types: [],
                        schools: [],
                    },
                    selectors: {
                        province: $('#id_profile_field_school_province_id'),
                        district: $('#id_profile_field_school_district_id'),
                        school: $('#id_profile_field_school_id'),
                    }
                },
                init: function () {
                    this.createInstance();
                    this.setupFormWatcher();

                    console.log('MoEYS Script init');
                },
                ajax: function (url, params) {
                    params = params || {};
                    return this.request(url, params);
                },
                createInstance: function () {
                    this.basedir = "/theme/jquery.php/theme_" + this.theme + "/moeys/json/";

                    this.request = axios.create({
                        baseURL: this.basedir,
                    });
                },
                setupFormWatcher: function () {
                    var self = this;

                    this.data.default.province_id = this.data.selectors.province.val();
                    this.data.default.district_id = this.data.selectors.district.val();
                    this.data.default.school_id = this.data.selectors.school.val();

                    this.createProvinceSelect();

                    // Register change event
                    this.data.selectors.province.on('change', function (event) {
                        self.onProvinceChangeHandler.call(self, event)
                    });

                    // Register change event
                    this.data.selectors.district.on('change', function (event) {
                        self.onDistrictChangeHandler.call(self, event)
                    });

                    console.group('MoEYS')
                    log.debug(this.data.default.province_id, 'default_province_id');
                    log.debug(this.data.default.district_id, 'default_district_id');
                    log.debug(this.data.default.school_id, 'default_school_id');
                    console.groupEnd();
                },
                createSelectOptions: function (arr) {
                    var list = [$("<option>").val("").text("Choose an option")];

                    arr.forEach(function (item) {
                        var opt = $("<option>").val(item.id).text(item.name_km);

                        list.push(opt);
                    });

                    return list;
                },
                createProvinceSelect: function () {
                    if (this.data.selectors.province.length === 0) {
                        return;
                    }

                    var self = this;

                    this.ajax('provinces.json')
                        .then(function (res) {
                            self.data.options.provinces = res.data;
                            var options = self.createSelectOptions(res.data)
                            self.data.selectors.province[0].options.length = 0;
                            self.data.selectors.province.append(options);

                            self.data.selectors.province
                                .val(self.data.default.province_id)
                                .trigger("change");
                        });

                    this.ajax('districts.json')
                        .then(function (res) {
                            self.data.options.districts = res.data;
                        });
                },
                onProvinceChangeHandler: function (event) {
                    var province_id = $(event.target).val();
                    this.data.selectors.district.val('');
                    this.data.selectors.school.val('');

                    this.createDistrictSelect(province_id);

                    this.data.selectors.district
                        .val(this.data.default.district_id)
                        .trigger("change");

                    log.debug(province_id, 'onProvinceChangeHandler');
                },
                createDistrictSelect: function (province_id) {
                    if (this.data.selectors.district.length === 0) {
                        return;
                    }

                    var list = this.data.options.districts.filter(function (item) {
                        return item.province_id == province_id;
                    });

                    var options = this.createSelectOptions(list);
                    this.data.selectors.district[0].options.length = 0;
                    this.data.selectors.district.append(options);
                },
                onDistrictChangeHandler: function (event) {
                    var district_id = $(event.target).val();
                    this.data.selectors.school.val('');

                    this.createSchoolSelect(district_id);

                    this.data.selectors.school.val(this.data.default.school_id)

                    log.debug(district_id, 'onDistrictChangeHandler');
                },
                createSchoolSelect: function (district_id) {
                    if (this.data.selectors.school.length === 0) {
                        return;
                    }

                    var self = this;
                    this.ajax("district/" + district_id + ".json").then(function (res) {
                        self.data.options.schools = res.data;

                        var options = self.createSelectOptions(res.data.schools);
                        self.data.selectors.school[0].options.length = 0;
                        self.data.selectors.school.append(options);
                    })
                },
            };

            function onMoEYSReady() {
                log.debug('MoEYS AMD init');
                window['MoEYS'] = MoEYS;
                MoEYS.init();
                log.debug(MoEYS);
            }

            // Ready scripts
            $(document).ready(onMoEYSReady);
        }
    }
})
