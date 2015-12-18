angular.module('app').factory('zAppointmentTemplateUtil', function() {
    return {
        colorpickerOpts: {
            showPalette: true,
            palette: ['rgb(255, 0, 0)',     'rgb(0, 255, 0)',     'rgb(0, 0, 255)',
                      'rgb(176, 255, 119)', 'rgb(198, 180, 247)', 'rgb(112, 244, 220)',
                      'rgb(196, 246, 255)', 'rgb(115, 123, 244)', 'rgb(252, 176, 230)',
                      'rgb(249, 127, 137)', 'rgb(249, 201, 152)', 'rgb(252, 190, 35)',
                      'rgb(102, 198, 131)', 'rgb(255, 0, 255)'
            ]
        }
    };
});
