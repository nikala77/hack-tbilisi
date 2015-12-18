angular.module('app').factory('zAppointmentUtil', function($modal, $q, zProfileImgGet, zClient, zResource, zAppointment) {
    return {
        dateOptions: {
            formatYear: 'yy',
            startingDate: 1
        },
        tpOptions: {
            mstep: 10,
            hstep: 1,
            ismeridian: true
        },
        colorpickerOpts: {
            showPalette: true,
            palette: ['rgb(255, 0, 0)',     'rgb(0, 255, 0)',     'rgb(0, 0, 255)',
                      'rgb(176, 255, 119)', 'rgb(198, 180, 247)', 'rgb(112, 244, 220)',
                      'rgb(196, 246, 255)', 'rgb(115, 123, 244)', 'rgb(252, 176, 230)',
                      'rgb(249, 127, 137)', 'rgb(249, 201, 152)', 'rgb(252, 190, 35)',
                      'rgb(102, 198, 131)', 'rgb(255, 0, 255)'
            ]
        },
        
        // TODO: muliti-select start
        loadCollections: function() {
            var self = this;
            return $q(function(resolve, reject) {
                async.parallel([
                    function(cb) {
                        zResource.query(function(resources) {
                            cb(null, resources);
                        });
                    },
                    function(cb) {
                        zClient.query(function(clients) {
                            cb(null, clients);
                        });
                    }
                ], function(err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        var resources = results[0];
                        var clients = results[1];
                        self.downloadItemPics(resources, 'resource');
                        self.downloadItemPics(clients, 'client');
                        resolve({
                            resources: resources,
                            clients: clients
                        });
                    }
                });
            });
        },
        
        selectItems: function(srcItemIds, dstItems) {
            _(dstItems)
                .filter(function(item) {
                    return _.indexOf(srcItemIds, item._id) !== -1;
                })
                .each(function(item) {
                    item.selected = true;
                })
                .value();
        },
        
        downloadItemPics: function(items, itemType) {
            _.each(items, function(item) {
                var opts = { type: itemType, size: 'small', cssClass: 'profile-small' };
                zProfileImgGet.getPicElement(item, opts, function(imgElement) {
                    item.picElem = imgElement;
                });
            });
        },
        // TODO: muliti-select end
        
        prepareAppointmentTemplates: function(templates) {
            _.each(templates, function(at) {
                at.resourceNames = _.pluck(at.resources, 'name').join(', ');
            });
            return templates;
        },
        
        prepareResources: function(resources) {
            return _.pluck(resources, '_id');
        },
        
        prepareClients: function(clients) {
            return _.pluck(clients, '_id');
        },
        
        prepareAppointment: function(appointment) {
            appointment.id = appointment._id;
            appointment.title = appointment.appointmentTypeName;
            _.each(appointment.clients, function(client) {
                client.name = zClient.getName(client);
            });
            return appointment;
        },
        
        prepareAppointmentForSave: function(orgiAppointment) {
            /* jshint newcap: false */
            var appointment = new zAppointment(orgiAppointment);
            if (appointment.appointmentTemplate) {
                appointment.appointmentTemplate = appointment.appointmentTemplate._id;
            }
            appointment.resources = _.pluck(orgiAppointment.selectedResources, '_id');
            appointment.clients = _.pluck(orgiAppointment.selectedClients, '_id');
            return appointment;
        },
        
        prepareAppointmentForSaveDates: function(orgiAppointment) {
            /* jshint newcap: false */
            var appointment = new zAppointment(orgiAppointment);
            if (!appointment.end) {
                appointment.end = moment(appointment.start).add(appointment.duration, 'minutes');
            }
            appointment.start = appointment.start.local();
            appointment.end = appointment.end.local();
            return appointment;
        },
        
        applyAppointmentTemplate: function(appointment, resources, template) {
            appointment.appointmentTypeName = template.name;
            appointment.color = template.color;
            appointment.textColor = template.textColor;
            appointment.duration = template.duration;
            this.selectItems(_.pluck(template.resources, '_id'), resources);
        },
        
        createClient: function() {
            return $modal.open({
                templateUrl: 'views/dashboard/clients/client-new-dialog.html',
                controller: 'zClientNewDialogCtrl'
            })
            .result;
        }
    };
});
