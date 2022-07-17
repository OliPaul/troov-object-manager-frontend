import Vue from "vue";
import User from "~/models/User";

const processLoginForm = async (context: Vue, email: string, password: string): Promise<User | undefined> => {
  if (email == "") {
    alert("Veuillez saisir votre adresse email svp");
    return;
  }

  if (password == "") {
    alert("Veuillez saisir votre mot de passe svp");
    return;
  }

  const userInfo = await context.$axios.$post("/sign_in", {email: email, password: password})
  // Store token
  if(userInfo.token) {
    localStorage.setItem("token", userInfo.token);
    localStorage.setItem("userName", userInfo.name);
  }
  return new User(userInfo.name, userInfo.email);
}

export default processLoginForm;
