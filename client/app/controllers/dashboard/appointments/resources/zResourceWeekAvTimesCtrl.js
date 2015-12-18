angular.module('app').controller('zResourceWeekAvTimesCtrl', function(
    $scope, $routeParams, $location, $modal, zNotifier, zIdentity, zResource, zAppointmentTemplate, zResourceWeekAvTimes) {
    /* jshint maxstatements: false */
    
    var defaultDate = '2000-01-01';
    
    // TODO $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    $scope.isLoading = true;
    $scope.yearsFilter = _.range(2015, 2021);
    $scope.weeksFilter = _.range(1, 52);
    $scope.hoursFromFilter = _.range(0, 24);
    $scope.hoursToFilter = _.range(1, 25);
    $scope.year = 2015;
    $scope.weeknumber = 1;
    $scope.hourFrom = 0;
    $scope.hourTo = 24;
    $scope.colorpickerOpts = {
        showPalette: true,
        palette: ['rgb(255, 0, 0)',     'rgb(0, 255, 0)',     'rgb(0, 0, 255)',
                  'rgb(176, 255, 119)', 'rgb(198, 180, 247)', 'rgb(112, 244, 220)',
                  'rgb(196, 246, 255)', 'rgb(115, 123, 244)', 'rgb(252, 176, 230)',
                  'rgb(249, 127, 137)', 'rgb(249, 201, 152)', 'rgb(252, 190, 35)',
                  'rgb(102, 198, 131)', 'rgb(255, 0, 255)'
        ]
    };
    var weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var defaultRegions = [
        { id: 0, name: 'Avaliable', bgColor: 'rgb(0, 255, 0)', appointmentTemplates: [] },
        { id: 1, name: 'Not avaliable', bgColor: 'rgb(255, 0, 0)', appointmentTemplates: [] }
    ];
    
    $scope.isProcessing = function() {
        return $scope.isLoading || $scope.isSaving;
    };
    
    $scope.setCellRegion = function(selectedWeekday, selectedCell) {
        if (!$scope.currentRegion || $scope.isProcessing()) {
            return;
        }
        
        var cellColor = $scope.currentRegion.bgColor;
        var newBlocks = [];
        var currentBlock;
        var cellCount = (24 * 60) / $scope.resource.appointmentInterval;
        _.each(_.range(0, cellCount), function(i) {
            var cellTime = _addInterval(0, i);
            var isSelectedCell = cellTime === selectedCell.time;
            
            var foundBlock = _.find(selectedWeekday.blocks, function(block) {
                return cellTime >= block.start && cellTime < block.end;
            });
            
            if (foundBlock || isSelectedCell) {
                var newBlockRegionId = isSelectedCell ? $scope.currentRegion.id : foundBlock.regionId;
                if (isSelectedCell && foundBlock && foundBlock.regionId === newBlockRegionId) {
                    // Deselect already selected cell with the same block
                    currentBlock = null;
                    cellColor = 'white';
                } else if (currentBlock && currentBlock.regionId === newBlockRegionId) {
                    // Extend current block to one interval
                    currentBlock.end = _addInterval(cellTime, 1);
                } else {
                    // Create a new block
                    currentBlock = {
                        weekday: selectedWeekday.weekday,
                        regionId: newBlockRegionId,
                        start: cellTime,
                        end: _addInterval(cellTime, 1)
                    };
                    newBlocks.push(currentBlock);
                }
            } else if (currentBlock) {
                currentBlock = null;
            }
        });
        
        selectedCell.bgColor = cellColor;
        selectedWeekday.blocks = newBlocks;
    };
    
    $scope.changeYear = function() {
        _initWeeksFilter('first');
        _saveFiltersAndReloadData();
    };
    
    $scope.changeWeek = function() {
        _saveFiltersAndReloadData();
    };
    
    $scope.changeHour = function() {
        if ($scope.hourTo - $scope.hourFrom <= 0) {
            $scope.hourTo = $scope.hourFrom + 1;
        }
        _saveFiltersAndRefreshTable();
    };
    
    $scope.selectPrevWeek = function() {
        var weeknumber = $scope.weeknumber - 1;
        if (weeknumber >= 1) {
            $scope.weeknumber = weeknumber;
            _saveFiltersAndReloadData();
        } else if ($scope.year > 2015) {
            $scope.year--;
            _initWeeksFilter('last');
            _saveFiltersAndReloadData();
        }
    };
    
    $scope.selectNextWeek = function() {
        var weeknumber = $scope.weeknumber + 1;
        if (weeknumber <= $scope.weeksFilter[$scope.weeksFilter.length - 1].value) {
            $scope.weeknumber = weeknumber;
            _saveFiltersAndReloadData();
        } else if ($scope.year < 2020) {
            $scope.year++;
            _initWeeksFilter('first');
            _saveFiltersAndReloadData();
        }
    };
    
    $scope.selectCurrentWeek = function() {
        $scope.year = moment().year();
        _initWeeksFilter('current');
        _saveFiltersAndReloadData();
    };
    
    $scope.disablePrevWeek = function() {
        return ($scope.weeknumber === 1 && $scope.year === 2015);
    };
    
    $scope.disableNextWeek = function() {
        return ($scope.weeknumber === $scope.weeksFilter[$scope.weeksFilter.length - 1].value && $scope.year === 2020);
    };
    
    $scope.disableCurrentWeek = function() {
        var now = moment();
        return ($scope.year === now.year() && $scope.weeknumber === now.week());
    };
    
    $scope.addRegion = function() {
        var usedBgColors = _.pluck($scope.regions, 'bgColor');
        var avaliableBgColors = _.difference($scope.colorpickerOpts.palette, usedBgColors);
        var newId = _($scope.regions)
            .pluck('id')
            .max() + 1;
        var ats = _.clone($scope.appointmentTemplates, true);
        
        var newRegion = {
            isNew: true,
            id: newId,
            name: 'New Region' + newId,
            bgColor: avaliableBgColors[0] || 'rgb(255, 0, 0)',
            appointmentTemplates: ats
        };
        $scope.editRegion(newRegion);
    };
    
    $scope.editRegion = function(region) {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/appointments/resources/resource-edit-region-dialog.html',
            controller: 'zResourceEditRegionDialogCtrl',
            resolve: {
                region: function() {
                    return _.clone(region, true);
                },
                colorpickerOpts: function() {
                    return $scope.colorpickerOpts;
                }
            }
        });
        
        modalInstance.result
            .then(function(editedRegion) {
                if (editedRegion.isDeleted) {
                    _deleteRegion(region);
                } else {
                    region.name = editedRegion.name;
                    region.bgColor = editedRegion.bgColor;
                    region.appointmentTemplates = editedRegion.appointmentTemplates;
                    if (region.isNew) {
                        region.isNew = false;
                        $scope.regions.push(region);
                        $scope.currentRegion = region;
                    }
                }
                _refreshTable();
            });
    };
    
    $scope.save = function(skipNotify) {
        _updateResourceRegions();
        _updateResourceWeekAvTimesBlocks();
        
        $scope.isSaving = true;
        return $scope.resource
            .$updateRegions()
            .then(function() {
                return $scope.resourceWeekAvTimes.$save();
            })
            .then(function () {
                if (!skipNotify) {
                    zNotifier.notify('Resource saved');
                }
            })
            .catch(function (err) {
                if (!skipNotify) {
                    zNotifier.error('Unable to save: ' + err.data.reason);
                }
            })
            .finally(function() {
                if (!skipNotify) {
                    $scope.isSaving = false;
                }
            });
    };
    
    $scope.clone = function() {
        $modal.open({
            templateUrl: 'views/common/confirmation-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function() {
                    return {
                        title: 'Apply Availability to following weeks',
                        message: 'This will apply this availability pattern to all subsequent weeks for ' + 
                                 $scope.resource.name +
                                 '\nAny existing availability patterns will be overwritten'
                    };
                }
            }
        })
        .result
        .then(function() {
            $scope.isSaving = true;
            return $scope.save(true);
        })
        .then(function() {
            /* jshint newcap: false */
            var resourceWeekAvTimes = new zResourceWeekAvTimes({
                resource: $scope.resource._id,
                year: $scope.year,
                weeknumber: $scope.weeknumber
            });
            return resourceWeekAvTimes.$clone();
        })
        .then(function() {
            zNotifier.notify('Availability pattern copied to all subsequent weeks');
        })
        .catch(function (err) {
            if (err !== 'cancel') {
                zNotifier.error('Unable to copy availability pattern: ' + err.data.reason);
            }
        })
        .finally(function() {
            $scope.isSaving = false;
        });
    };
    
    function _loadData() {
        zAppointmentTemplate
            .query()
            .$promise
            .then(function(ats) {
                $scope.appointmentTemplates = ats;
                return zResource.get({ id : $routeParams.id }).$promise;
            })
            .then(function(resource) {
                if (!resource.regions || resource.regions.length === 0) {
                    resource.regions = _.clone(defaultRegions, true);
                }
                var regions = [];
                _.each(resource.regions, function(region) {
                    var ats = _.clone($scope.appointmentTemplates, true);
                    _.each(ats, function(at) {
                        at.isSelected = _.indexOf(region.appointmentTemplates, at._id) !== -1;
                    });
                    var newRegion = _.clone(region, true);
                    newRegion.appointmentTemplates = ats;
                    regions.push(newRegion);
                });
                
                $scope.resource = resource;
                $scope.regions = regions;
                $scope.currentRegion = $scope.regions[0];
            })
            .then(function() {
                return _loadResourceWeekAvTimes(true);
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/appointments/settings/resources');
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    }
    
    function _loadResourceWeekAvTimes(skipNotify) {
        $scope.isLoading = true;
        return zResourceWeekAvTimes
            .get({
                resource: $scope.resource._id,
                year: $scope.year,
                weeknumber: $scope.weeknumber
            })
            .$promise
            .then(function(resourceWeekAvTimes) {
                var blocks = [];
                var regionIds = _.pluck($scope.regions, 'id');
                for (var i = 0; i < 7; i++) {
                    /* jshint -W083 */
                    var dayBlocks = _.filter(resourceWeekAvTimes.blocks, function(block) {
                        return _.includes(regionIds, block.regionId) && block.weekday === i;
                    });
                    blocks.push({
                        weekday: i,
                        weekdayName: weekdayNames[i],
                        blocks: dayBlocks
                    });
                }
                
                $scope.resourceWeekAvTimes = resourceWeekAvTimes;
                if (!$scope.resourceWeekAvTimes.resource) {
                    /* jshint newcap: false */
                    $scope.resourceWeekAvTimes = new zResourceWeekAvTimes({
                        resource: $scope.resource._id,
                        year: $scope.year,
                        weeknumber: $scope.weeknumber
                    });
                }
                $scope.blocks = blocks;
                
                _refreshTable();
            })
            .catch(function(err) {
                if (!skipNotify) {
                    zNotifier.error('Unable to load record: ' + err.data.reason);
                }
            })
            .finally(function() {
                if (!skipNotify) {
                    $scope.isLoading = false;
                }
            });
    }
    
    function _applyFilters() {
        var resourceWeekAvTimes = $.cookie('resourceWeekAvTimes');
        if (resourceWeekAvTimes && resourceWeekAvTimes.filters) {
            var filters = resourceWeekAvTimes.filters;
            if (filters.hours) {
                $scope.hourFrom = filters.hours.from;
                $scope.hourTo = filters.hours.to;
            }
            if (filters.yearweek) {
                $scope.year = filters.yearweek.year;
                $scope.weeknumber = filters.yearweek.weeknumber;
            }
        } else {
            $scope.year = moment().year();
            $scope.weeknumber = moment().week();
        }
    }
    
    function _saveFilters() {
        var resourceWeekAvTimes = {
            filters: {
                hours: {
                    from: $scope.hourFrom,
                    to: $scope.hourTo
                },
                yearweek: {
                    year: $scope.year,
                    weeknumber: $scope.weeknumber
                }
            }
        };
        $.cookie('resourceWeekAvTimes', resourceWeekAvTimes, { expires: 365, path: '/' });
    }
    
    function _initWeeksFilter(selectWeek) {
        var startOfYear = moment($scope.year, 'YYYY').startOf('isoWeek');
        if (startOfYear.year() !== $scope.year) {
            startOfYear.add(1, 'week');
        }
        var weeks = [];
        var i = 0;
        while (true) {
            var startOfWeek = moment(startOfYear).add(i, 'week');
            var endOfWeek = moment(startOfYear).add(i + 1, 'week');
            if (startOfWeek.year() > $scope.year) {
                break;
            }
            var week = {
                value: i + 1,
                text: 'week ' + (i + 1) + ', (' + startOfWeek.format('MMM, DD') + ' - ' + endOfWeek.format('MMM, DD') + ')'
            };
            weeks.push(week);
            i++;
        }
        
        $scope.weeksFilter = weeks;
        switch (selectWeek) {
            case 'first':
                $scope.weeknumber = 1;
                break;
            case 'last':
                $scope.weeknumber = weeks[weeks.length - 1].value;
                break;
            case 'current':
                $scope.weeknumber = moment().week();
                break;
            default:
                if ($scope.weeknumber > weeks[weeks.length - 1].value) {
                    $scope.weeknumber = 1;
                }
                break;
        }
    }
    
    function _saveFiltersAndReloadData() {
        _saveFilters();
        _loadResourceWeekAvTimes();
    }
    
    function _saveFiltersAndRefreshTable() {
        _saveFilters();
        _refreshTable();
    }
    
    function _deleteRegion(region) {
        _.remove($scope.regions, region);
        _.each($scope.blocks, function(db) {
            _.remove(db.blocks, { regionId: region.id });
        });
        
        if ($scope.currentRegion === region) {
            if ($scope.regions.length > 0) {
                $scope.currentRegion = $scope.regions[0];
            } else {
                $scope.currentRegion = null;
            }
        }
        
        _refreshTable();
    }
    
    function _updateResourceRegions() {
        var allRegions = [];
        _.each($scope.regions, function(region) {
            var newRegion = _.clone(region, true);
            newRegion.appointmentTemplates = _(region.appointmentTemplates)
                .filter({ isSelected: true })
                .pluck('_id')
                .value();
            allRegions.push(newRegion);
        });
        $scope.resource.regions = allRegions;
    }
    
    function _updateResourceWeekAvTimesBlocks() {
        var allBlocks = [];
        _.each($scope.blocks, function(dayBlocks) {
            var newBlocks = _.clone(dayBlocks.blocks, true);
            allBlocks = allBlocks.concat(newBlocks);
        });
        $scope.resourceWeekAvTimes.blocks = allBlocks;
    }
    
    function _addInterval(start, index) {
        return start + index * $scope.resource.appointmentInterval;
    }
    
    function _createDateObj(mins) {
        return moment(defaultDate).add(mins, 'minute').toDate();
    }
    
    function _refreshTable() {
        if ($scope.invalidFilter) {
            return;
        }
        
        var interval = $scope.hourTo - $scope.hourFrom;
        $scope.cellCount = (interval * 60) / $scope.resource.appointmentInterval;
        
        $scope.timeCells = [];
        var timeCellCount;
        for (var i = 4; i < 10; i++) {
            if ($scope.cellCount % i === 0) {
                timeCellCount = i;
                break;
            }
        }
        var timeCellStep = interval * 60 / timeCellCount;
        for (i = 0; i < timeCellCount; i++) {
            var timeCell = {
                colspan: $scope.cellCount / timeCellCount,
                dt: _createDateObj($scope.hourFrom * 60 + timeCellStep * i)
            };
            $scope.timeCells.push(timeCell);
        }
        
        _.each($scope.blocks, function(db) {
            db.cells = [];
            _.each(_.range(0, $scope.cellCount), function(i) {
                var time = _addInterval($scope.hourFrom * 60, i);
                var cell = {
                    time: time,
                    dt: _createDateObj(time)
                };
                db.cells.push(cell);
                
                // TODO: ask Richard
                /*
                if (dayIndex >= 5) {
                    cell.bgColor = $scope.regions[1].bgColor;
                    return;
                }*/
                
                _.each(db.blocks, function(block) {
                    var isBeetwen = time >= block.start && time < block.end;
                    if (isBeetwen) {
                        var region = _.find($scope.regions, { id: block.regionId });
                        cell.bgColor = region.bgColor;
                        return false;
                    }
                });
            });
        });
    }
    
    _applyFilters();
    _initWeeksFilter();
    _loadData();
});
