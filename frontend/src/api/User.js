const authURL = process.env.REACT_APP_AUTH_URL;
const profileURL = process.env.REACT_APP_PROFILE_URL;

export class User {
  static async auth(login, password) {
    try {
      const response = await fetch(authURL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return { error: e.message };
    }
  }

  static async profile(token) {
    try {
      if (!token) {
        throw new Error('Invalid token');
      }

      const response = await fetch(authURL, {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const { token } = await response.json();
      return token;
    } catch (e) {
      return { error: e.message };
    }
  }
}
