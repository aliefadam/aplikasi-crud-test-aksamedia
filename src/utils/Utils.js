class Utils {
  static auth() {
    return localStorage.getItem("login") === "true";
  }
  static saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  static getParam(param) {
    const queryString = window.location.search;
    return new URLSearchParams(queryString).get(param);
  }
}

export default Utils;
