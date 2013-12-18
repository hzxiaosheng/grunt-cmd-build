define("./main", [ "./math" ], function(require) {
    var math = require("./math");
    test("math.plus", function() {
        ok(3 === math.plus(1, 2));
    });
    //module.exports = "main";
    exports.say = function(){return 'hi'};
});
define("math", [], function() {
    return {
        plus: function(a, b) {
            return a + b;
        }
    };
});
//# buildBy cmdUtil-UglifyJS2-FullCache at Wed Dec 18 2013 18:56:48 GMT+0800 (中国标准时间) take time: 13 ms