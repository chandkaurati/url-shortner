import { createClient } from "@supabase/supabase-js";

class AuthService {
  constructor() {
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URI,
      import.meta.env.VITE_SUPABASE_API_KEY
    );
  }

  async createAccount({ name, email, password}) {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if(error){
        return error
      }
      if (data?.session) {
        return data?.session;
      }
  }

  async setSession({ email, password }) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if(error){
      return error
    }

    if (data?.session) {
      return data?.session
    }
  }

  async getCurrentSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.log(error);
      throw new Error(error);
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
