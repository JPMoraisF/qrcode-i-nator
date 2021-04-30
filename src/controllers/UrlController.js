const QRCode = require("../models/QRCode")

module.exports = {
    async handleRequest(request, response) {
        const { id } = request.params;
        try{
            const qrcode = await QRCode.findOne({_id: id});
            if(qrcode){
                qrcode.visitors = qrcode.visitors + 1;
                await qrcode.save();
                return response.redirect(`//${qrcode.url}`)
            }
            else {
                response.status(404).json({"message": "Null link in QR Code"});
            }
        }
        catch(err){
            return response.json(err);
        }
        
    }
}