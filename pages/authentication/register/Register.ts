import Vue from "vue";
import User from "~/models/User";

const processRegisterForm = async (context: Vue, name: string, email: string, password: string): Promise<User | undefined> => {
  if (name == "") {
    alert("Veuillez saisir votre nom svp");
    return;
  }

  if (email == "") {
    alert("Veuillez saisir votre adresse email svp");
    return;
  }

  if (password == "") {
    alert("Veuillez saisir votre mot de passe svp");
    return;
  }

  return await context.$axios.$post("/register", {name: name, email: email, password: password});
}

export default processRegisterForm;
