/* jshint ignore:start */
define(['jquery', 'core/log'], function ($, log) {

    "use strict"; // ... jshint ;_;.

    log.debug('MoEYS AMD');

    return {
        init: function (currentpage, tabpersistencetime) {
            const MoEYS = {
                theme: M.cfg.theme,
                basedir: '',
                request: null,
                data: {
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
                createSelectOptions: function (arr) {
                    var list = [$("<option>").val("").text("Choose an option")];

                    arr.forEach(function (item) {
                        var opt = $("<option>").val(item.id).text(item.name_km);

                        list.push(opt);
                    });

                    return list;
                },
                createProvinceSelect: function () {
                    if (self.data.selectors.province.length === 0) {
                        return;
                    }

                    var self = this;
                    this.ajax('provinces.json')
                        .then(function (res) {
                            var options = self.createSelectOptions(res.data)
                            self.data.selectors.province[0].options.length = 0;
                            self.data.selectors.province.append(options);
                        });
                }
            };

            function onMoEYSReady() {
                log.debug('MoEYS AMD init');

                MoEYS.init();

                window['MoEYS'] = MoEYS;

                log.debug(currentpage);
                log.debug(MoEYS);
            }

            // Ready scripts
            $(document).ready(onMoEYSReady);
        }
    }
})
