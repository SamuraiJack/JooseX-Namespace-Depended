Role('JooseX.Namespace.Depended.Transport.XHRSync', {
    
    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onsuccess, onerror) {
            var req = new JooseX.SimpleRequest()
            var text; 
            
            try {
                text = req.getText(url)
            } catch (e) {
                onerror(e)
                return
            }
            
            onsuccess(text, url)
        }
    }
})