import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

export const signup = async (email, password) => {
  const { data, error } = await supabase.auth.signUp(email, password);

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(data);
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(data);
}

export const signInWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
  })

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(data);
}

const authProvider = {
    login: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({email, password});

      if (error) {
        return Promise.reject(error);
      }
      return Promise.resolve(data);
    },
    checkError: (error) => {
      console.log(error)
      return Promise.resolve();
    },
    checkAuth: async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return Promise.reject(error);
      }

      const { session } = data;
      if (session === null) {
        return Promise.reject();
      } else {
        return Promise.resolve(session);
      }
    },
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
          throw error;
      }
    },
    getIdentity:  async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return Promise.reject(error);
      }

      const { session } = data;
      if (session === null) {
        return Promise.reject();
      } else {
        const { user } = session;

        if (user) {
          return Promise.resolve(user);
        }

        return Promise.resolve();
      }
    },
    getPermissions: (params) => { /* ... */ },
}

export default authProvider;
