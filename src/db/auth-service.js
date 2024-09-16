import { createClient } from "@supabase/supabase-js";

class AuthService {
  constructor() {
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URI,
      import.meta.env.VITE_SUPABASE_API_KEY
    );
  }

  async createAccount({ name, email, password, profile_pic }) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (data?.session) {
        return data?.session;
      } else {
        return error;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async setSession({ email, password }) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data?.session) {
        return data?.session;
      } else {
        return error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    // console.log(data.session.user);
    return data?.session;
  }

  async removeSession() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error);
  }
}

const authService = new AuthService();
export default authService;
