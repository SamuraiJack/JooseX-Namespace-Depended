StartTest(function(t) {
    t.plan(88)
    
//	if (console) console.profile()

    Module("StressTest")
    
    t.ok(StressTest, "Root module created")
    
    __global__.doubleDeclarations = false
    __global__.unSatisfiedDeps = false
    
    //==================================================================================================================================================================================
    t.diag("Stress testing of dependencies loading")
    
    var start      = new Date()
    var async      = t.beginAsync()
    
    Module("StressTest", {
        use : [ 'StressTest.Test001', 'StressTest.Test010' ],
        
        body : function() {
            var end   = new Date()
            
            t.diag("Duration = " + (end.getTime() - start.getTime()) / 1000)
            
            t.ok(!__global__.doubleDeclarations, "Stress testing passed without redeclarations")
            t.ok(!__global__.unSatisfiedDeps, "Stress testing passed with all dependencies satisfied")
            
            for (var i = 1; i <= 100; i++) {
                var class_name = new String(i).split('')
                while (class_name.length < 3) class_name.unshift('0')
                class_name = 'Test' + class_name.join('')
                
                var testClass = StressTest[class_name]
                
                if (typeof testClass == 'function') {
                    t.ok(
                        testClass.meta.constructor == Joose.Meta.Class && testClass.meta.hasMethod('result') && new testClass().result() == i,
                        "Class 'StressTest." + class_name + "' was loaded correctly"
                    )
                }
            }
            
            t.endAsync(async)
//          if (console) console.profileEnd()
        }
    })
})
