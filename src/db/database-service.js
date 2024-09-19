const { createClient } = require("@supabase/supabase-js");

class DatabaseService {
  constructor() {
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URI,
      import.meta.env.VITE_SUPABASE_API_KEY
    );
  }

  async getUrls(user_id) {
    const { data, error } = await this.supabase
      .from("urls")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error(error.message);
      throw new Error("Unable to load urls");
    }
    return data;
  }

  async geturlClicks(urlids) {
    const { data, error } = await this.supabase
      .from("clicks")
      .select("*")
      .in("url_id", urlids);

      if(error){
        console.error(error.message)
        throw new Error("unable to load clicks")
      }

      return data
  }



}

const databaseService = new DatabaseService();
export default databaseService;
