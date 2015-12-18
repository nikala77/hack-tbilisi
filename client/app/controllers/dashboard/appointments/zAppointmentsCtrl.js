angular.module('app').controller('zAppointmentsCtrl', function(
    $scope, $http, $routeParams, $location, $interval, $modal, zProfileImgGet,
    uiCalendarConfig, zAppointmentUtil, zNotifier, zClient, zResource, zAppointment) {
    /* jshint maxstatements: false */
    
    var _lastQuery;
    var _lastLoadedEvents;
    var _currentScrolY;
    var _preselectedResources;
    var _preselectedClients;
    
    var states = {
        ready: 0,
        loading: 1,
        error: 2
    };
    $scope.currentState = states.loading;
    $scope.clients = [];
    $scope.resources = [];
    $scope.filter = {
        clients: [],
        resources: []
    };
    $scope.uiConfig = {
        calendar: {
            header: {
                left: 'month,agendaWeek,agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            editable: true,
            eventLimit: true,
            slotDuration: '00:30:00',
            slotEventOverlap: false,
            eventRender: _eventRender,
            eventClick: _previewAppointment,
            dayClick: _createAppointment,
            eventDrop: function(event, delta, revertFunc) {
                _saveEdit(event, revertFunc);
            },
            eventResize: function(event, delta, revertFunc) {
                _saveEdit(event, revertFunc);
            }
        }
    };
    
    $scope.changeResourcesFilter = function() {
        setTimeout(function() {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');
        }, 0);
    };
    
    $scope.changeClientsFilter = function() {
        setTimeout(function() {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');
        }, 0);
    };
    
    $scope.saveAsDefault = function() {
        $modal.open({
            templateUrl: 'views/common/confirmation-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function() {
                    return {
                        title: 'Save as default',
                        message: 'Save current appointments settings as default?'
                    };
                }
            }
        })
        .result
        .then(function() {
            _saveFilters();
        });
    };
    
    function _loadCollections() {
        zAppointmentUtil
            .loadCollections()
            .then(function(data) {
                $scope.resources = data.resources;
                $scope.clients = data.clients;
                _initFiltersCollection(data.resources, _preselectedResources);
                _initFiltersCollection(data.clients, _preselectedClients);
                setTimeout(function() {
                    $scope.currentState = states.ready;
                    uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');
                }, 0);
            });
            // TODO: error
    }
    
    var eventsF = function(start, end, timezone, callback) {
        console.log('AAA', $scope.currentState)
        if ($scope.currentState !== states.ready) {
            return;
        }
        
        var query = {
            start: start.toISOString(),
            end: end.toISOString()
        };
        if ($scope.filter.resources.length > 0) {
            query['resources[]'] = _.pluck($scope.filter.resources, '_id');
        }
        if ($scope.filter.clients.length > 0) {
            query['clients[]'] = _.pluck($scope.filter.clients, '_id');
        }
        // TODO: why?
        query['includes[]'] = ['resources'];
        
        if (_.isEqual(query, _lastQuery)) {
            return callback(_lastLoadedEvents);
        }
        _lastQuery = query;
        
        $scope.currentState = states.loading;
        zAppointment
            .query(query)
            .$promise
            .then(function(appointments) {
                _lastLoadedEvents = _.map(appointments, zAppointmentUtil.prepareAppointment);
                return appointments;
            })
            .then(function(appointments) {
                /*var minDuration = _getMinResourceAppointmentInterval(appointments);
                if (minDuration >= 10) {
                    // TODO: improve
                    var currentView = _getCurrentView();
                    $scope.uiConfig.calendar.slotDuration = moment.duration(minDuration, 'm');
                    setTimeout(function() {
                        _setCurrentView(currentView);
                    }, 0);
                }*/
                return appointments;
            })
            .then(function() {
                callback(_lastLoadedEvents);
                $scope.currentState = states.ready;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load appointments: ' + err.data.reason);
                // TODO $scope.states.isReady = false;
                $scope.currentState = states.error;
            });
    };
    $scope.eventSources = [eventsF];
    
    function _eventRender(event, element) {
        // TODO: use $scope.clients.pics
        function downloadClientPic(clientId, cb) {
            var client = _.find($scope.clients, { _id: clientId });
            client = client || { name: 'unknown' };
            
            var opts = { type: 'client', size: 'small', cssClass: 'profile-small' };
            zProfileImgGet.getPicElement(client, opts, function(imgElement) {
                cb(client, imgElement);
            });
        }
        
        function showAllClients() {
            _.each(event.clients, function(clientId) {
                downloadClientPic(clientId, function(foundClinet, imgElement) {
                    element.find('.fc-content').append(imgElement + '<span>' + foundClinet.name + '</span>');
                });
            });
        }
        
        function showFirstClient() {
            var eventHtml = '<div class="pic" /><div class="title" />';
            var $eventEl = element.find('.fc-content').html(eventHtml);
            $eventEl.find('.title').html('<p><span class="time">' + event.start.format('h:mm a') + ' <span>' + event.title + '</span></p>');
            
            var firstClientId = event.clients[0];
            if (firstClientId) {
                downloadClientPic(firstClientId, function(foundClinet, imgElement) {
                    var clientHtml = foundClinet.name;
                    var otherClientsCount = event.clients.length - 1;
                    if (otherClientsCount === 1) {
                        clientHtml += ' + ' + otherClientsCount + ' other';
                    } else if (otherClientsCount > 1) {
                        clientHtml += ' + ' + otherClientsCount + ' others';
                    }
                    $eventEl.find('.pic').append(imgElement);
                    $eventEl.find('.title').append('<p>' + clientHtml + '</p>');
                });
            }
        }
        
        if (_getCurrentView() === 'agendaDay') {
            showAllClients();
        } else {
            showFirstClient();
        }
    }
    
    function _getCurrentView() {
        return uiCalendarConfig.calendars.myCalendar.fullCalendar('getView').name;
    }
    
    function _setCurrentView(viewName) {
        uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView', viewName);
    }
    
    function _rememberScrollYPos() {
        _currentScrolY = $(window).scrollTop();
    }
    
    function _restoreScrollYPos() {
        $(window).scrollTop(_currentScrolY);
    }
    
    function _getMinResourceAppointmentInterval(appointments) {
        return _(appointments).pluck('resources').flatten().pluck('appointmentInterval').min();
    }
    
    function _initFiltersCollection(collection, preselected) {
        _(collection)
            .filter(function(obj) {
                return _.indexOf(preselected, obj._id) !== -1;
            })
            .each(function(obj) {
                obj.selected = true;
            })
            .value();
    }
    
    function _loadFilters() {
        if ($routeParams.clientId) {
            _preselectedClients = [$routeParams.clientId];
        }
        
        var appointments = $.cookie('appointments');
        if (appointments) {
            if (appointments.filters) {
                _preselectedResources = appointments.filters.resources;
                _preselectedClients = appointments.filters.clients;
            }
            if (appointments.currentView) {
                setTimeout(function() {
                    _setCurrentView(appointments.currentView);
                }, 0);
            }
        }
    }
    
    function _saveFilters() {
        var appointments = {
            filters: {
                resources: _.pluck($scope.filter.resources, '_id'),
                clients: _.pluck($scope.filter.clients, '_id')
            },
            currentView: uiCalendarConfig.calendars.myCalendar.fullCalendar('getView').name
        };
        $.cookie('appointments', appointments, { expires: 365, path: '/' });
    }
    
    function _downloadNewClients(clients) {
        var newClients = _.difference($scope.clients, clients);
        //if (newClients.length === 0) { TODO
            return;
        //}
        
        return zClient
            .query({ 'in[]': newClients }).$promise
            .then(function(clients) {
                $scope.clients = $scope.clients.concat(clients);
            });
    }
    
    function _previewAppointment(appointment) {
        _rememberScrollYPos();
        
        $modal.open({
            templateUrl: 'views/dashboard/appointments/appointment-details-dialog.html',
            controller: 'zAppointmentDetailsDialogCtrl',
            resolve: {
                params: function() {
                    return appointment;
                }
            }
        })
        .result
        .then(function(ret) {
            if (ret && ret.filter) {
                if (ret.filter.resource) {
                    $scope.filter.resources = [ret.filter.resource._id];
                }
                if (ret.filter.client) {
                    $scope.filter.clients = [ret.filter.client._id];
                }
            } else {
                return _editAppointment(appointment);
            }
        })
        .finally(_restoreScrollYPos);
    }
    
    function _createAppointment(date) {
        _rememberScrollYPos();
        
        var createdAppointment;
        $modal.open({
            templateUrl: 'views/dashboard/appointments/appointment-new-dialog.html',
            controller: 'zAppointmentNewDialogCtrl',
            resolve: {
                params: function() {
                    return {
                        startDate: date,
                        resources: $scope.filter.resources,
                        clients: $scope.filter.clients
                    };
                }
            }
        })
        .result
        .then(function(app) {
            createdAppointment = app;
            return _downloadNewClients(createdAppointment.clients);
        })
        .then(function() {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('renderEvent', createdAppointment);
        })
        .finally(_restoreScrollYPos);
    }
    
    function _editAppointment(appointment) {
        var updatedAppointment;
        return $modal.open({
            templateUrl: 'views/dashboard/appointments/appointment-edit-dialog.html',
            controller: 'zAppointmentEditDialogCtrl',
            resolve: {
                params: function() {
                    return appointment;
                }
            }
        })
        .result
        .then(function(app) {
            updatedAppointment = app;
            return _downloadNewClients(updatedAppointment.clients);
        })
        .then(function() {
            appointment.title = updatedAppointment.title;
            appointment.start = moment(updatedAppointment.start);
            appointment.end = moment(updatedAppointment.end);
            appointment.color = updatedAppointment.color;
            appointment.clients = updatedAppointment.clients;
            appointment.resources = updatedAppointment.resources;
            uiCalendarConfig.calendars.myCalendar.fullCalendar('updateEvent', appointment);
        });
    }
    
    function _saveEdit(appointment, revertFunc) {
        var appointmentForSave = zAppointmentUtil.prepareAppointmentForSaveDates(appointment);
        appointmentForSave
            .$updateDates()
            .then(function() {
                zNotifier.notify('Appointment record updated');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save appointment: ' + err.data.reason);
                revertFunc();
            });
    }
    
    _loadCollections();
    _loadFilters();
});
