var declared = false;
try {
    declared = typeof StressTest.Test048 == 'function';
} catch(e) {}
if (declared && StressTest.Test048.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test048";
}
Class('StressTest.Test048', {
    version: 0.1,
    use: [{
        'Module': 'StressTest.Test066'
    },
    {
        'Module': 'StressTest.Test061'
    },
    {
        'Module': 'StressTest.Test094'
    },
    {
        'Module': 'StressTest.Test084'
    },
    {
        'Module': 'StressTest.Test069'
    },
    {
        'Module': 'StressTest.Test090'
    },
    {
        'Module': 'StressTest.Test062'
    },
    {
        'Module': 'StressTest.Test080'
    },
    {
        'Module': 'StressTest.Test072'
    },
    {
        'Module': 'StressTest.Test099'
    },
    {
        'Module': 'StressTest.Test082'
    },
    {
        'Module': 'StressTest.Test091'
    },
    {
        'Module': 'StressTest.Test055'
    },
    {
        'Module': 'StressTest.Test087'
    },
    {
        'Module': 'StressTest.Test056'
    },
    {
        'Module': 'StressTest.Test065'
    },
    {
        'Module': 'StressTest.Test081'
    },
    {
        'Module': 'StressTest.Test060'
    },
    {
        'Module': 'StressTest.Test085'
    },
    {
        'Module': 'StressTest.Test088'
    },
    {
        'Module': 'StressTest.Test057'
    },
    {
        'Module': 'StressTest.Test076'
    },
    {
        'Module': 'StressTest.Test068'
    },
    {
        'Module': 'StressTest.Test059'
    },
    {
        'Module': 'StressTest.Test070'
    },
    {
        'Module': 'StressTest.Test089'
    },
    {
        'Module': 'StressTest.Test092'
    },
    {
        'Module': 'StressTest.Test097'
    },
    {
        'Module': 'StressTest.Test064'
    },
    {
        'Module': 'StressTest.Test073'
    },
    {
        'Module': 'StressTest.Test079'
    },
    {
        'Module': 'StressTest.Test077'
    },
    {
        'Module': 'StressTest.Test083'
    },
    {
        'Module': 'StressTest.Test054'
    },
    {
        'Module': 'StressTest.Test078'
    },
    {
        'Module': 'StressTest.Test063'
    },
    {
        'Module': 'StressTest.Test098'
    },
    {
        'Module': 'StressTest.Test093'
    },
    {
        'Module': 'StressTest.Test075'
    },
    {
        'Module': 'StressTest.Test049'
    },
    {
        'Module': 'StressTest.Test071'
    },
    {
        'Module': 'StressTest.Test074'
    },
    {
        'Module': 'StressTest.Test100'
    },
    {
        'Module': 'StressTest.Test095'
    },
    {
        'Module': 'StressTest.Test067'
    },
    {
        'Module': 'StressTest.Test096'
    },
    {
        'Module': 'StressTest.Test086'
    }],
    methods: {
        result: function() {
            return 48
        }
    },
    body: function() {
        if (StressTest.Test049.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test057.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test063.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test076.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test080.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test082.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test091.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test095.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test048";
        }
        if (StressTest.Test096.meta.constructor != Joose.Meta.Class) {
            __global__.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test048";
        }
    }
})