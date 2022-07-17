export default function ({$axios, redirect}) {
  $axios.onRequest(config => {
    const token = localStorage.getItem("token");

    if (token) {
      $axios.setToken(token, 'Bearer', ['post', 'put', 'get', 'delete']);
    }
  })

  $axios.onError(error => {
    if (error.response.status === 401) {
      redirect("/authentication/login");
    }
    if (error.response.status !== 200) {
      alert(error.response.data.error);
    }
    return new Promise(() => {
    });
  })
}
