import { jwtDecode } from 'jwt-decode'

const AuthService = {
  getProfile: function() {
    if(this.isTokenExpired())
      return null;

    return jwtDecode(this.getToken());
  },

  isLoggedIn: function () {
    return !this.isTokenExpired() ? true : false;
  },

  isTokenExpired: function() {
     const token = this.getToken();
     if(!token) return true;

     const decoded = jwtDecode(token);
     if(decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id-token');
      return true;
     }

     return false;
  },

  getToken: function() {
    return localStorage.getItem('id-token');
  },

  login: function(idToken) {
    localStorage.setItem('id-token', idToken);
    window.location.assign('/admin/attendance');
  },

  logout: function() {
    localStorage.removeItem('id-token');
    window.location.href = '/';
  }
}

export default AuthService;