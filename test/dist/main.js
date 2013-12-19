define("main.js", [ "./math" ], function(require) {
    var math = require("./math");
    test("math.plus", function() {
        ok(3 === math.plus(1, 2));
    });
});
define("math.js", [], function() {
    return {
        plus: function(a, b) {
            return a + b;
        }
    };
});
//# buildBy cmdUtil-UglifyJS2-FullCache at Thu Dec 19 2013 16:28:35 GMT+0800 (中国标准时间) take time: 13 ms