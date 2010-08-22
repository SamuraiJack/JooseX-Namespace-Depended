Class('JooseX.Namespace.Depended.Resource.Code', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    // NOTE : we don't add the default materialization and transport roles here - they'll be added
    // in one of the Bootstrap/*.js files
    
    methods : {
        
        BUILD : function (config) {
//            if (config.token)
            
            return config
        },
        
        
        getUrls : function () {
            var urls = []
            var className = this.token.split('.')
            
            Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (libroot) {
                libroot = libroot.replace(/\/$/, '')
                urls.push( [ libroot ].concat(className).join('/') + '.js' + (JooseX.Namespace.Depended.Manager.my.disableCaching ? '?disableCaching=' + new Date().getTime() : '') )
            })
            
            return urls
        },
        
        
        addDescriptor : function (descriptor) {
            if (typeof descriptor == 'object' && !descriptor.token) 
                Joose.O.eachOwn(descriptor, function (version, name) {
                    this.addDescriptor({
                        type : 'joose',
                        token : name,
                        version : version
                    })
                }, this)
            else
                this.SUPER(descriptor)
        }

    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('code', JooseX.Namespace.Depended.Resource.Code)

//backward-compat
JooseX.Namespace.Depended.Manager.my.registerResourceClass('joose', JooseX.Namespace.Depended.Resource.Code)