import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

export const getSession = async () => {
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
}

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
  checkError: async (err) => {
    if (err === "JWT expired") {
      const { data: { user, session }, error } = await supabase.auth.refreshSession();

      if (error) {
        return Promise.reject(error);
      }
      console.log(user);
      return Promise.resolve(session);
    } else {
      return Promise.resolve();
    }
  },
  checkAuth: getSession,
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
  },
  getIdentity: getSession,
  getPermissions: async () => {
    const admins = ["theio.vrefos@gmail.com", "aravantinos.dionysis@gmail.com", "authenticskyskier@gmail.com"];
    const session = await getSession();
    const { user } = session;

    if (admins.includes(user.email)) {
      return "admin";
    } else {
      return "user";
    }
  },
}

export default authProvider;
