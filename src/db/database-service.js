import { createClient } from "@supabase/supabase-js";
import { UAParser } from "ua-parser-js";
class DatabaseService {
  constructor() {
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URI,
      import.meta.env.VITE_SUPABASE_API_KEY
    );

    this.parser = new UAParser();
  }

  async getUrls(user_id) {
    const { data, error } = await this.supabase
      .from("urls")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error(error.message);
      throw new Error("unable to load urls");
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
      throw new Error("unable to get clicks");
    }

    return data;
  }

  async deleteUrl(id) {
    const { error } = await this.supabase.from("urls").delete().eq("id", id);
    if (error) {
      console.error(error.message);
      throw new Error("unable to delete url");
    }
  }

  async createShortUrl({ title, longUrl, customUrl, user_id }) {
    const short_url = Math.random().toString(36).substring(2, 6);

    console.log(title, longUrl, customUrl, user_id);
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

    if (error) {
      console.error(error.message);
      throw new Error("Error fetching creating url");
    }
    return data;
  }

  async getLongUrl(id) {
    const { data, error } = await this.supabase
      .from("urls")
      .select("id,original_url")
      .or(`short_url.eq.${id},custom_url.eq.${id}`)
      .single();

    if (error) {
      console.error(error.message);
      throw new Error("Error fetching long url");
    }

    return data;
  }

  async storeClicks({ id, originalUrl }) {
    try {
      const res = this.parser.getResult();
      const device = res.type || "desktop";

      const responce = await fetch("https://ipapi.co/json");
      const { city, country_name: country } = await responce.json();

      await this.supabase.from("clicks").insert([
        {
          url_id: id,
          city: city,
          country: country,
          device: device,
        },
      ]);

      window.location.href = originalUrl;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error storing link");
    }
  }

  async getUrl({ id, user_id }) {
    const { data, error } = await this.supabase
      .from("urls")
      .select("*")
      .eq("id", id)
      .eq("user_id", user_id) 
      .single()

    if (error) {
      console.error(error.message);
      throw new Error("Short url not found");
    }
    return data
  }

  async getClicksForUrl(url_id) {
    const { data, error } = await this.supabase
      .from("clicks")
      .select("*")
      .eq("id", url_id);

    if (error) {
       console.error(error)
       throw new Error("ubable to get clicks")
    }

    return data;
  }
}
const databaseService = new DatabaseService();
export default databaseService;
