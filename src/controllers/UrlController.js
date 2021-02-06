const QRCode = require("../models/QRCode")

module.exports = {
    async handleRequest(request, response) {
        const id = request.params.id;
        try{
            const qrcode = await QRCode.findOne({id});
            return response.redirect(`//${qrcode.url}`)
        }
        catch(err){
            console.log(err);
            return response.json(err);
        }
        
    }
}