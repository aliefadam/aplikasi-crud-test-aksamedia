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
}

export default Utils;
