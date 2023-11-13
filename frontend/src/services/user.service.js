import http from "./http-common";

class UserService {
  getAll() {
    return http.get("/user");
  }

  addAdmin(user) {
    return http.post("/user/admin", user);
  }

  login(user) {
    return http.post("/login", user);
  }

  logout() {
    return http.get("/logout");
  }

  deleteUser(id) {
    return http.delete(`/user/${id}`);
  }

  forgetPassword(user){
    console.log('service')
    return http.put('/forgetPassword', user)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
