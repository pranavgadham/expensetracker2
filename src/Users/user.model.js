import UserModel from "./user.schema.js";

export class userModel{
    createUser = async({name,email,password}) => {
        try{
            const newUse = await new UserModel({
                name:name,
                email:email,
                password:password
            })

            return await newUse.save();

        }catch(err){
            throw new Error("Error creating user: " + err.message);
        }
    }
    verifyUser = async({email,password}) =>{
        try {
            const user = await UserModel.findOne({email:email,password:password});
            if(!user){
                return null;
            }
            return user;
        } catch (error) {
            throw new Error("Error finding user: " + error.message);
        }
    }
}

