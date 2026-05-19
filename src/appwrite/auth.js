import conf from "../conf/conf";
import { Account , Client , ID } from "appwrite";
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createUser({name,email,password}){
        try{
            const user = await this.account.create(ID.unique() , email, password , name);
            if(user) {
                return await this.login(email,password);

            } else {
                return user;
            }

        } catch(error){
            console.log("Error in createUser in auth.js :" , error);
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            console.log("Error in login in auth.js: ",error)
            
        }
    }
    async logout(){
        try {
            return await this.account.deleteSession(); 
            
        } catch (error) {
            console.log("Error in logout in auth.js: ", error);
            
        }
    }
    async getUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Error in getUserin auth.js:" , error);
            return null;
            
        }
    }

}
const authService = new AuthService();
export default authService;