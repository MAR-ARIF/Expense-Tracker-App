import { Client , Databases , ID, Query} from "appwrite";
import conf from "../conf/conf";

export class DatabaseService{
    client = new Client();
    database;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
    }

    async createExpense({userId , description , amount , date , category}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    userId,
                    amount,
                    date,
                    description,
                    category
                }
            )
            
        } catch (error) {
            console.log("Error in create expense in database.js: " ,error)
            
        }

    }
    async getAllExpenses(){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.orderDesc("$createdAt")]
            )
            
        } catch (error) {
            console.log("Errors in getAllExpense in database.js: " , error);
            
        }
    }
    async deleteExpense(id){
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
            
        } catch (error) {
            console.log("Errors in deleteExpense in database.js: " , error);
            
        }
    }

}
const databaseService = new DatabaseService();
export default databaseService;