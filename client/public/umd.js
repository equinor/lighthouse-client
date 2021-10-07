(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['lodash'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.b);
    }
})(this, function (lodash) {
    //use b in some fashion.

    function setup() {
        return 'Hello World!' + lodash.add(50 + 12);
    }
    // attach properties to the exports object to define
    // the exported module properties.
    return {
        test: 'hey',
        setup
    };
});
