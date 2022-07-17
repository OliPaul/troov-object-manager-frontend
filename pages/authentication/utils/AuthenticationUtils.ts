import Vue from "vue";

export default class AuthenticationUtils {
  static async verifyAuthentication(context: Vue) {
    const token = localStorage.getItem("token");
    if (token) {
      await context.$router.push({path: "/item", query: {name: localStorage.getItem("userName")}});
    }
  }
}
