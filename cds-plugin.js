const cds = require("@sap/cds");
const { request } = require("hdb/lib/protocol");
cds.add?.register?.('comments', class extends cds.add.Plugin {
    async run() {
        console.log('more stuff')
    }
});
cds.build?.register?.('comments', class CommentsPlugin extends cds.build.Plugin{
    static hasTask(){
        return true;
    }
    init(){
        console.log('init')
    }
    async build(){
        console.log('build')
    }
})
cds.once('served', () => {
   
    for (const srv of cds.services) {
        for (const entities of srv.entities) {
            for (const key in entities.elements) {
                if (Object.prototype.hasOwnProperty.call(entities.elements, key)) {
                    const element = entities.elements[key];
                    if (element['@rkp']) {
                        // console.log(element);
                        srv.before('READ',entities,(request)=>{
                            // console.log("inside");
                        })
                    }
                }
            }
        }
    }
})