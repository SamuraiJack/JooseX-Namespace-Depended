Role('JooseX.Namespace.Depended', {

    /*VERSION,*/

    meta : Joose.Managed.Role,

    requires : [ 'prepareProperties' ],


    have : {
        containResources                    : [ 'use', 'meta', 'isa', 'does', 'trait', 'traits' ]
    },


    override: {

//        GETCURRENT : function () {
//            var currentModule   = this.getCurrent()
//
//            return currentModule == Joose.top ? 'TOP' : currentModule.meta.name
//        },


        prepareProperties : function (name, extend, defaultMeta, callback) {
            if (name && typeof name != 'string') {
                extend = name
                name = null
            }

            extend = extend || {}

            var summaredDeps    = this.collectAllDeps(extend)
            var currentModule   = this.getCurrent()

            // if (currentModule !== Joose.top && !currentModule.meta) {
            //     require('console').log("CURRENT MODULE: %s", require('util').inspect(currentModule))
            //     require('console').log("TOP: %s", require('util').inspect(Joose.top))
            // }

            var resource = JooseX.Namespace.Depended.Manager.my.getResource({
                type    : 'joose',
                token   : currentModule == Joose.top ? name : currentModule.meta.name + '.' + name
            })


            if (extend.VERSION) resource.setVersion(extend.VERSION)

            //BEGIN executes right after the all dependencies are loaded, but before this module becomes ready (before body())
            //this allows to manually control the "ready-ness" of module (custom pre-processing)
            //BEGIN receives the function (callback), which should be called at the end of custom processing
            if (extend.BEGIN) {
                resource.setOnBeforeReady(extend.BEGIN)

                delete extend.BEGIN
            }

            Joose.A.each(summaredDeps, function (descriptor) {
                resource.addDescriptor(descriptor)
            })


            //skip constructing for classes w/o dependencies
            if (Joose.O.isEmpty(resource.dependencies)) {
                this.inlineAllDeps(extend)

                var res = this.SUPER(name, extend, defaultMeta, callback)

                //this will allow to classes which don't have dependencies to be ready synchronously
                resource.checkReady()

                return res
            } else {

                var me      = this
                var SUPER   = this.SUPER

                var current

                //unshift is critical for correct order of readyListerens processing!
                //constructing is delaying until resource will become ready
                resource.readyListeners.unshift(function () {
                    me.inlineAllDeps(extend)

                    Joose.Namespace.Manager.my.executeIn(currentModule, function () {

                        SUPER.call(me, name, extend, defaultMeta, callback)
                    })
                })

                // running as <script> in browser or as main script in node
                if (!resource.hasReadyCheckScheduled)
                    if (Joose.is_NodeJS)
                        resource.handleDependencies()
                    else
                        // defer the dependencies loading, because they actually could be provided later in the same bundle file
                        // this, however, affect performance, so bundles should be created in the dependencies-ordered way
                        setTimeout(function () {
                            resource.handleDependencies()
                        }, 0)


                return this.create(name, Joose.Namespace.Keeper, {})
            }
        },


        prepareMeta : function (meta) {
            meta.resource = meta.resource || JooseX.Namespace.Depended.Manager.my.getMyResource('joose', meta.name, meta.c)
        }
    },
    //eof override


    methods : {

        alsoDependsFrom : function (extend, summaredDeps) {
        },


        collectAllDeps : function (extend) {
            var summaredDeps    = []
            var me              = this

            //gathering all the related resourses from various builders
            this.collectClassDeps(extend, summaredDeps)

            var extendMy = extend.my

            //gathering resourses of 'my'
            this.collectClassDeps(extendMy, summaredDeps)


            //gathering resourses from own attributes
            if (extend.has) Joose.O.each(extend.has, function (attr, name) {
                // do not try to collect the dependencies when class is given as init value
                if (Joose.O.isClass(attr)) return

                me.collectClassDeps(attr, summaredDeps)
            })

            //gathering resourses from attributes of `my`
            if (extendMy && extendMy.has) Joose.O.each(extendMy.has, function (attr, name) {
                // do not try to collect the dependencies when class is given as init value
                if (Joose.O.isClass(attr)) return

                me.collectClassDeps(attr, summaredDeps)
            })

            //and from externally collected additional resources
            this.alsoDependsFrom(extend, summaredDeps)

            return summaredDeps
        },


        collectClassDeps : function (from, to) {

            if (from) Joose.A.each(this.containResources, function (propName) {

                this.collectDependencies(from[propName], to, from, propName)

            }, this)
        },


        collectDependencies : function (from, to, extend, propName) {
            if (from) Joose.A.each(Joose.O.wantArray(from), function (descriptor) {
                if (descriptor && typeof descriptor != 'function') to.push(descriptor)
            })
        },


        inlineAllDeps : function (extend) {
            var me              = this

            this.inlineDeps(extend)

            var extendMy = extend.my

            if (extendMy) this.inlineDeps(extendMy)


            if (extend.has) Joose.O.each(extend.has, function (attr, name) {

                if (attr && typeof attr == 'object') me.inlineDeps(attr)
            })

            if (extendMy && extendMy.has) Joose.O.each(extendMy.has, function (attr, name) {

                if (attr && typeof attr == 'object') me.inlineDeps(attr)
            })
        },


        inlineDeps : function (extend) {
            delete extend.use

            Joose.A.each(this.containResources, function (propName) {

                if (extend[propName]) {

                    var descriptors = []

                    Joose.A.each(Joose.O.wantArray(extend[propName]), function (descriptor, index) {

                        var descType = typeof descriptor

                        if (descType == 'function')
                            descriptors.push(descriptor.meta ? descriptor : (propName != 'isa' ? descriptor() : null ))
                        else
                            if (descType == 'object')
                                if (descriptor.token)
                                    descriptors.push(eval(descriptor.token))
                                else
                                    Joose.O.each(descriptor, function (version, name) {
                                        descriptors.push(eval(name))
                                    })
                            else
                                if (descType == 'string')
                                    descriptors.push(eval(descriptor))
                                else
                                    throw new Error("Wrong dependency descriptor format: " + descriptor)

                    })

                    if (propName != 'isa' && propName != 'meta')
                        extend[propName] = descriptors
                    else
                        if (descriptors.length > 1)
                            throw "Cant specify several super- or meta- classes"
                        else
                            if (descriptors[0]) extend[propName] = descriptors[0]

                }
            })
        }
    }
})


Joose.Namespace.Manager.meta.extend({
    does : JooseX.Namespace.Depended
})

