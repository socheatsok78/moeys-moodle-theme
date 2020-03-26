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
                ajax: function (param) {
                    //
                },
                createInstance: function () {
                    this.basedir = "/theme/jquery.php/theme_" + this.theme + "/moeys/json/";

                    this.request = axios.create({
                        baseURL: this.basedir,
                    });
                }
            };

            function onMoEYSReady() {
                log.debug('MoEYS AMD init');

                MoEYS.init();

                window['MoEYS'] = MoEYS;

                console.group('MoEYS');
                console.log('currentpage', currentpage);
                console.log('MoEYS', MoEYS);
                console.groupEnd();
            }

            // Ready scripts
            $(document).ready(onMoEYSReady);
        }
    }
})
