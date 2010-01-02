StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root4' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    
    JooseX.Namespace.Depended.Resource.JavaScript.meta.extend({
        does : JooseX.Namespace.Depended.Transport.ScriptTag
    })
    
    t.plan(8)
    

    //==================================================================================================================================================================================
    //t.diag("Testing of loading several classes in a single file")
    
    var async1 = t.beginAsync()
    
    use([ 'BasicTest1' ], function() {
        
        //==================================================================================================================================================================================
        t.diag("Testing of loading several classes in a single file")
        
        t.ok(BasicTest1.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #1-1')
        t.ok(new BasicTest1().result() == 1, "And it work as expected #1-2")
        
        t.ok(BasicTest2.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #2-1')
        t.ok(new BasicTest2().result() == 2, "And it work as expected #2-2")
        
        t.endAsync(async1)
    })


    var async2 = t.beginAsync()
    
    use([ 'BasicTest3' ], function() {
        
        //==================================================================================================================================================================================
        t.diag("Testing of loading several classes in a single file")
        
        t.ok(BasicTest3.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #1-1')
        t.ok(new BasicTest3().result() == 3, "And it work as expected #1-2")
        
        t.ok(BasicTest4.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #2-1')
        t.ok(new BasicTest4().result() == 4, "And it work as expected #2-2")
        
        t.endAsync(async2)
    })
    
    
})