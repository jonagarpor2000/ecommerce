import { now } from "mongoose";
import { sessionsModel } from "./models/sessions.models.js";

export default class sessionsDao {
    constructor() {
      this.model = sessionsModel;
    }

    async getAllInactive() {
      const query = await this.model.find({ 'updatedAt': {
    	  $gte: now()-2*24*60*60*1000, //.toISOString(),
   		  $exists: true
          	}
		  },
		  {
 		  	allowDiskUse: false
		  })
        return query
    }
  
  
  }
