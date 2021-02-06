const { update } = require('../models/User');
const User = require('../models/User');

module.exports = {
    async index (request, response) {
        try{
            var users = await User.find();
            return response.json(users);
        }
        catch(e){
            console.log(e);
        }
    },

    async store (request, response) {
        const { name, email } = request.body;
        var db_user = await User.findOne({email});
        if(!db_user){
            db_user = await User.create({
                name,
                email
            });
        }
        else{
            return response.send("User already exists!");
        }
        return response.json(db_user);
    },

    async delete(request, response) {
        var { email } = request.body;
        const db_user = await User.deleteOne({email});
        if(db_user.deletedCount === 0){
            return response.status(404).json({"message": "document not found", "deleted": db_user.deletedCount});
        }
        return response.json({"message": "user deleted", "deleted": db_user.deletedCount});
    },

    async update(request, response) {
        var { email } = request.body;
        var db_user = await User.findOne({email});
        if(db_user){
            for (var [key, value] of Object.entries(request.body)) {
                db_user = await User.updateOne({email}, {
                    $set: request.body,
                    $currentDate: {lastModified: true}
                });
            }
            return response.json({"message": "document updated", "modifiedDocuments": db_user.nModified});
        }
        else{
            response.status(404).json({"message": "document not found"});
        }
    }
    
};