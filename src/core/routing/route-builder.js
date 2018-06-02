"use strict";
exports.__esModule = true;
exports.useRoute = function (router, route) {
    // pad the validators array
    if (!route.validators)
        route.validators = [];
    // set a default mapper function
    // identity function... almost
    if (!route.mapper)
        route.mapper = function (I) { return ({ I: I }); };
    return router[route.method].apply(router, [route.path].concat(route.validators, [function (request, response, next) {
            return route.controller(route.mapper(request, response, next))
                .then(function (data) { return response.json(data); })["catch"](function (err) { return next(err); });
        }]));
};
