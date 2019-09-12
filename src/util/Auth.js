import Cookies from 'js-cookie'
import Vue from 'vue'
Vue.use(Cookies)

const TokenKey = 'token'

export function setCookie(name, value) {
  var days = 1;
  var exp = new Date();
  document.cookie = name + "=" + escape(value)
}
export function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
  }
  return "";
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{expires:7})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

