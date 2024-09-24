import { createClient } from "@supabase/supabase-js";
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
      console.error(error);
    }
    return data;
  }

  async geturlClicks(urlids) {
    const { data, error } = await this.supabase
      .from("clicks")
      .select("*")
      .in("url_id", urlids);

    if (error) {
      console.error(error.message);
    }

    return data;
  }

  async deleteUrl(id) {
    const { data, error } = await this.supabase
      .from("urls")
      .delete()
      .eq("id", id);
  }
  if(error) {
    console.log(error);
    throw new Error("unable to load URLS");
  }

  async createShortUrl({ title, longUrl, customUrl ,user_id }) {
    const short_url = Math.random().toString(36).substring(2, 6);
    
    console.log(title, longUrl, customUrl, user_id)
    const { data, error } = await this.supabase
      .from("urls")
      .insert([
        {
          title,
          user_id,
          short_url,
          original_url: longUrl,
          custom_url: customUrl || null,
        },
      ])
      .select();

      if(error) throw  new Error(error)
      return data
  }
}
const databaseService = new DatabaseService();
export default databaseService;
