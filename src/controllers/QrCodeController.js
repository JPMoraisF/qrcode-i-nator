const QRCode = require('../models/QRCode');

module.exports = {
    async index(request, response) {
        try{
            var urls = await QRCode.find();
            return response.json(urls);
        }
        catch(e){
            return response.send(e);
        }
    },

    async store(request, response) {
        const { url, name = url } = request.body;
        var qr = new QRCode({
            url: url,
            name,
            visitors: 0
        });
        short = JSON.stringify(qr._id);
        const id = short.slice(short.length-7, short.length-1);
        qr.id = id;
        await qr.save()
        return response.json({qr});
    },

    async update(request, response) {
        const id = request.params.id;
        var db_code = await QRCode.findOne({id});
        if(db_code){
            for (var [key, value] of Object.entries(request.body)) {
                db_code = await QRCode.updateOne({id}, {
                    $set: request.body,
                    $currentDate: {lastModified: true}
                });
            }
            return response.json(db_code);
        }
        else{
            return response.status(404).json({"message": "code not found"});
        }
    },

    async delete(request, response) {
        const id = request.params.id;
        var db_code = await QRCode.deleteOne({id});
        if(db_code.deletedCount === 0){
            return response.status(404).json({"message": "code not found!"});
        }
        else{
            return response.json(db_code);
        }
    },
};