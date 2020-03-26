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
    init() {
        this.createInstance();

        console.log('MoEYS Script init');
    },
    ajax(param) {
        //
    },
    createInstance() {
        this.basedir = "/theme/jquery.php/theme_" + this.theme + "/moeys/json/";

        this.request = axios.create({
            baseURL: this.basedir,
        });
    }
};

function onMoEYSReady() {
    MoEYS.init();

    window['MoEYS'] = MoEYS;
}

// Ready scripts
$(document).ready(onMoEYSReady);
