(function (angular) {
    var Core_Service = function ($rootScope, Core_HttpRequest, Base64, $state, $cookieStore, $sessionStorage, $http, $q, $timeout) {
        var service = this;

        service.login = function (data) {
            var deferred = $q.defer();
            var user = {};
            user.username = data.username;
            user.password = data.password;
            Core_HttpRequest.post("api/login", user)
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);

                        }
                    }, function (response) {
                        response.data = false;
                        deferred.reject(response.data);
                    });
            return deferred.promise;
        };
        service.getCurrentUser = function () {
            var deferred = $q.defer();
            var user = {};
            Core_HttpRequest.get("api/getCurrentUser")
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);

                        }
                    }, function (response) {
                        response.data = false;
                        deferred.reject(response.data);
                    });
            return deferred.promise;
        };
        service.createUser = function (employee) {
            var deferred = $q.defer();
            var user = {};
            Core_HttpRequest.post("/api/user/saveUser",employee)
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);

                        }
                    }, function (response) {
                        response.data = false;
                        deferred.reject(response.data);
                    });
            return deferred.promise;
        };
        service.isAuthenticated = function (item, data) {
            var isUserNameOk, isPasswordOk;
            for (var i = 0; i < data.length; i++) {
                isUserNameOk = false;
                isPasswordOk = false;
                for (var key in data[i]) {
                    if (item[key] == data[i][key]) {
                        if (key == "username")
                            isUserNameOk = true;
                        else if (key == "password")
                            isPasswordOk = true;
                    }
                }
                if (isUserNameOk && isPasswordOk) {
                    return true;
                }
            }
            return false;
        };

        service.calculateSidebarHeight = function (time) {
            time = time ? time : 200;
            $timeout(function () {
                var height = angular.element(".page-content-div").height();
                if (height < 500) {
                    height = 500;
                }
                angular.element("#sidebar-wrapper").height(height);
            }, time);
        };

        service.sendPassword = function (data) {
            var deferred = $q.defer();
            var url = "/forgotPassword";
            Core_HttpRequest.post(url, data).then(function (res) {
                if (res.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        
        service.changePassword = function (data) {
            var deferred = $q.defer();
            var url = "/resetPassword";
            Core_HttpRequest.post(url, data).then(function (res) {
                if (res.data.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        
        service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            $sessionStorage.auth = username;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            var deferred = $q.defer();
            $rootScope.globals = {};
            Core_HttpRequest.post("/logout")
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                    }, function (response) {
                        response.data = false;
                        deferred.reject(response.data);
                    });
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        service.getAllLookupValues = function (url) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        }

        service.processDateObjects = function (keys, data) {
            for (var i = 0; i < keys.length; i++) {
                data[keys[i]] = new Date(data[keys[i]]);
            }
            return  data;
        }
        service.candidateRegisterImpl = function (url, postData) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, postData)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        /*employee Register-start*/
        service.registerImpl = function (url, postData) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, postData)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };
        /*employee register-end*/


        service.candidateDeleteImpl = function (url, data) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, data)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        service.getCandidateImpl = function (url, data) {
            var obj = {};
            obj.id = data;
            var deferred = $q.defer();
            Core_HttpRequest.post(url, obj)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        service.getSalaryGradesUrl = function (url) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        service.defaultApiByIdAndUrlImpl = function (url, data) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, data)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        service.sweetAlert = function (congrats, message, type, redirectState) {
            swal({
                title: congrats,
                text: message,
                type: type,
                showCancelButton: false,
                confirmButtonColor: "#CC2727",
                confirmButtonText: "OK",
                closeOnConfirm: true},
                    function () {
                        if (redirectState)
                            $state.go(redirectState);
//                        $state.go("coreuser.candidate");
                    });
        };
        service.swaservicelService= function (congrats, message, type, callback) {
            swal({
                title: congrats,
                text: message,
                type: type,
                confirmButtonColor: "#CC2727",
                confirmButtonText: "OK",
                closeOnConfirm: true},
                callback
                );
        };
        service.sweetAlertWithConfirm = function (congrats, message, type, callback) {
            swal({
                title: congrats,
                text: message,
                type: type,
                showCancelButton: true,
                confirmButtonColor: "#CC2727",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: true},
                callback
                );
        };

        service.getUserName = function () {
            Core_HttpRequest.post('api/getUserName')
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    });
        };

        service.getRoleTabs = function () {
            Core_HttpRequest.post('api/getRoleTabs')
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    });
        };

//        service.tab.dashboard = {name:"dashboard",label: "Dashboard", icon: "fa-dashboard",state:"coreuser.dashboard"}
//        service.tab.candidate = {name:"candidate",label: "Candidate Management", icon: "fa-briefcase",state:"coreuser.candidate"}
//        service.tab.employee = {name:"employee",label: "Employee Management", icon: "fa-users",state:"coreuser.employee"}
//        service.tab.client =  {name:"client",label: "Client Management", icon: "fa-flag",state:"coreuser.client"}
//        service.tab.offerletter = {name:"offerletter",label: "Offer Letter Processing", icon: "fa-users",state:"coreuser.offerletterhome"}
//        service.tab.offerletter = {name:"event",label: "Event Management", icon: "fa-gift",state:"coreuser.event"}

        service.recall = function () {
            setTimeout(function () {
                if (document.createEvent) { // W3C
                    var ev = document.createEvent('Event');
                    ev.initEvent('resize', true, true);
                    window.dispatchEvent(ev);
                } else { // IE
                    element = document.documentElement;
                    var event = document.createEventObject();
                    element.fireEvent("onresize", event);
                }
            }, 10);
        };
        service.getFormattedDate = function (intDate) {
            var dateStr = new Date(intDate);
            var dd = dateStr.getDate();
            var mm = dateStr.getMonth() + 1;
            var yyyy = dateStr.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            var returnDate = yyyy + '-' + mm + '-' + dd;
            return returnDate;
        };

        service.getSalaryDetails = function (url, params) {
            var deferred = $q.defer();
            url = url + '?fixed=' + params.fixed + '&grade=' + params.grade;
            Core_HttpRequest.get(url)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        service.getAllEvents = function (url) {
            var deferred = $q.defer();
            Core_HttpRequest.get(url)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        service.getAllGuests = function (url) {
            var deferred = $q.defer();
            Core_HttpRequest.get(url)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        }

        service.addEventDetails = function (url, data) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, data)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        }

        service.updateEventDetails = function (url, data) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, data)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        }

        service.generateOfferLetterImpl = function (url, postData) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, postData)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };
        service.getUserTasks = function (url) {
            var deferred = $q.defer();
            Core_HttpRequest.get(url)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };

        service.requestForApproval = function (url, employeeSalary) {
            var deferred = $q.defer();
            Core_HttpRequest.post(url, employeeSalary)
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };
        
        service.sessionCheck = function () {
            var deferred = $q.defer();
            Core_HttpRequest.get("api/sessioncheck")
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });
            return deferred.promise;
        };
        
        
        
        service.downloadOfferLetter = function(fileURL, fileName){
        	 // for non-IE
            if (!window.ActiveXObject) {
                var save = document.createElement('a');
                save.href = fileURL;
                save.target = '_blank';
                save.download = fileName || 'unknown';

                var evt = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': false
                });
                save.dispatchEvent(evt);

                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            }

            // for IE < 11
            else if ( !! window.ActiveXObject && document.execCommand)     {
                var _window = window.open(fileURL, '_blank');
                _window.document.close();
                _window.document.execCommand('SaveAs', true, fileName || fileURL)
                _window.close();
            }
        };

    };
    Core_Service.$inject = ['$rootScope', 'Core_HttpRequest', 'Base64', '$state', '$cookieStore', '$sessionStorage', '$http', '$q', '$timeout'];
    angular.module('app.common')
            .service('Core_Service', Core_Service);
})(angular);
