'use strict';

function Route(name, htmlName, defaultRoute) {
    try {
        if(!name || !htmlName) {
            throw new Error('Error: name and htmlName params are required')
        }
        this.constructor(name, htmlName, defaultRoute)
    } catch (e) {
        console.error(e)
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function (name, htmlName, defaultRoute) {
        this.name = name
        this.htmlName = htmlName
        this.default = defaultRoute
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name
    }
}
