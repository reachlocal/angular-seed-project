angular.module('rl.daterange', [])

    .directive('rlDateRange', function () {
        var directive = {
            restrict      : 'E',
            replace       : true,
            controller    : 'rlDateRangeCtrl',
            scope         : {
                model     : '=ngModel',
                optionsIn : '=options'
            }
        };

        directive.template = '\
  <fieldset class="rl-daterange">\
    <input type="checkbox" id="{{ id }}">\
    <label for="{{ id }}">\
      <span>{{ model.from }}</span><span>{{ model.to }}</span>\
    </label>\
    <ul>\
      <li ng:repeat="range in options.ranges | toArray">\
        <input id="{{ id }}-predef.{{ $index }}" type="radio" ng:model="$parent.range" ng:value="range">\
        <label for="{{ id }}-predef.{{ $index }}" translate>{{ range.label }}</label>\
      </li>\
      <li>\
        <input id="{{ custom }}-{{ id }}" type="radio" ng:model="range" value="{{ custom }}">\
        <label for="{{ custom }}-{{ id }}" translate>{{ options.customLabel }}</label>\
        <input type="date" ng:change="range=custom" ng:model="model.from" max="{{ model.to }}">\
        <input type="date" ng:change="range=custom" ng:model="model.to" min="{{ model.from }}" max="{{ options.maxToDate }}">\
      </li>\
    </ul>\
  </fieldset>';

        return directive;
    })

    .controller('rlDateRangeCtrl', function ($window, $scope, DateRangeOptions) {
        $scope.options = DateRangeOptions.build().asHash();
        $scope.id = 'daterange-' + $window.Date.now();
        $scope.custom = '-custom-';
        if (!!$scope.optionsIn) {
            var options;
            if (!!$scope.optionsIn.asHash) {
                options = $scope.optionsIn.asHash();
            } else {
                options = $scope.optionsIn;
            }
            $scope.options = angular.extend($scope.options, options);
        }
        $scope.model.from = $scope.model.from || $scope.options.defaultRange.from;
        $scope.model.to   = $scope.model.to   || $scope.options.defaultRange.to;

        function setModel(value) {
            if (!value) return;
            if (!isCustom(value)) {
                $scope.model.from = value.from;
                $scope.model.to = value.to;
            }
        }

        function isCustom(value) {
            return value === $scope.custom;
        }

        $scope.$watch('range', setModel, true);
        $scope.range = $scope.custom;
        setModel($scope.options.value);
    })

    .filter('toArray', function () {
        return function (obj) {
            if (!(obj instanceof Object)) {
                return obj;
            }
            return Object.keys(obj).map(function (key) {
                return obj[key];
            });
        };
    })

    .factory('Moment', function ($window) {
        return {
            build: function () {
                return $window.moment.apply({}, arguments);
            }
        };
    })

    .factory('DateRangeOptions', function (Moment) {
        var moment = Moment.build;

        function DateRangeOptions() {
            var today = moment();
            /**
             * Default options for the date range directive
             * @type Object
             */
            var options = {
                customLabel: 'Custom',
                labelPrefix: '', // Placed in front of all labels - useful for name-spaced translations
                format: 'YYYY-MM-DD',
                anchorDate: today,
                maxDate: moment(today),
                defaultRange: 'Last 30 Days'
            };

            /**
             * Validate input date and convert to moment object
             * @param date      Object or string
             * @return moment   object
             * @throws Error if your date can't be parsed by moment
             */
            function inputDateFilter(date) {
                var dateObj = moment(date);
                if (!dateObj.isValid()) {
                    throw new Error("Date is invalid");
                }
                return dateObj;
            }

            /**
             * Format a moment object using the options.format
             * @param date
             * @returns string
             */
            function outputDateFilter(date) {
                return date.format(options.format);
            }

            /**
             * If the value is non-null, set it to the specified option name
             * If there is a transformer function, run it through that first
             * ex: getOrSet("format")  -  returns "YYYY-MM-DD"
             * ex: getOrSet("format", "YYYY")  -  sets options.format and returns this (chainable)
             * ex: getOrSet("format", "YYYY", myFunc)  -  runs "YYYY" through myFunc, then sets it and returns this
             **/
            function _getOrSet(optionName, value, inputTransformer, outputTransformer) {
                if (value !== undefined) {
                    if (angular.isFunction(inputTransformer)) {
                        value = inputTransformer(value);
                    }
                    options[optionName] = value;
                    return this;
                } else {
                    var output = options[optionName];
                    if (angular.isFunction(outputTransformer)) {
                        output = outputTransformer(output);
                    }
                    return output;
                }
            }

            /**
             * Build a getOrSet for the specified option name and optional validator
             */
            function getOrSet(context, optionName, inputTransformer, outputTransformer) {
                return function (value) {
                    return _getOrSet.apply(context, [optionName, value, inputTransformer, outputTransformer]);
                };
            }

            // Getter/setters for every option
            this.format = getOrSet(this, 'format');
            this.anchorDate = getOrSet(this, 'anchorDate', inputDateFilter, outputDateFilter);
            this.maxDate = getOrSet(this, 'maxDate', inputDateFilter, outputDateFilter);
            this.customLabel = getOrSet(this, 'customLabel');
            this.labelPrefix = getOrSet(this, 'labelPrefix');
            this.ranges = function getRanges() {
                return buildPrefabRanges();
            };
            this.defaultRange = function defaultRange(rangeKey) {
                if (!!rangeKey) {
                    if (!this.ranges()[rangeKey]) {
                        throw new Error("The default range you are trying to set isn't in the range list.");
                    }
                    options.defaultRange = rangeKey;
                }
                return this.ranges()[options.defaultRange];
            };
            this.asHash = function asHash() {
                return {
                    format:      this.format(),
                    anchorDate:  this.anchorDate(),
                    maxDate:     this.maxDate(),
                    customLabel: this.customLabel(),
                    labelPrefix: this.labelPrefix(),
                    ranges:      this.ranges(),
                    defaultRange:this.defaultRange()
                };
            };

            /**
             * Builder to generate prefabricated ranges
             * It's not yet extensible by the user, but it's better than making them start
             * from scratch.
             * @returns Object    Indexed by Label. { 'Label': from: {{STRING}}, to: {{STRING}} }
             */
            function buildPrefabRanges() {
                var anchorDate = options.anchorDate;
                var format = options.format;

                // Subtract some amount from the anchorDate to generate a range
                function less(anchorDate, amount, granularity) {
                    return { from: subtract(anchorDate, amount, granularity), to: anchorDate };
                }

                // Subtract some amount from the input and return a new moment object
                // Use this as a shorthand for: moment(today).subtract(...);
                function subtract(anchorDate, amount, granularity) {
                    return moment(anchorDate).subtract(amount, granularity);
                }

                // Return { from: [first day of specified month], to: [last day of specified month] }
                function monthRange(anchorDate) {
                    var daysInMonth = anchorDate.daysInMonth();
                    var firstDay = moment(anchorDate).date(1);
                    var lastDay = moment(anchorDate).date(daysInMonth);
                    return { from: firstDay, to: lastDay };
                }

                var ranges = {
                    'Last 30 Days': less(anchorDate, 30, "days"),
                    'Last 60 Days': less(anchorDate, 60, "days"),
                    'Last 90 Days': less(anchorDate, 90, "days"),
                    'All Time':     { from: null, to: null },
                    'Yesterday':    { from: subtract(anchorDate, 1, "days"), to: subtract(anchorDate, 1, "days") },
                    'Last 7 Days':  less(anchorDate, 7, "days"),
                    'This Month':   monthRange(anchorDate),
                    'Last Month':   monthRange(subtract(anchorDate, 1, "months"))
                };
                var formattedRanges = {};
                angular.forEach(ranges, function formatRanges(value, key) {
                    var range = {
                        label: options.labelPrefix + key,
                        from:  value.from ? value.from.format(format) : '',
                        to:    value.to? value.to.format(format) : ''
                    };
                    formattedRanges[key] = range;
                });
                return formattedRanges;
            }
        }

        return {
            // Build a configurable options object - optionally specify starting date
            build: function build(anchorDate) {
                var options = new DateRangeOptions();
                if (!!anchorDate) {
                    options.anchorDate(anchorDate);
                    options.maxDate(anchorDate);
                }
                return options;
            }
        };
    });
