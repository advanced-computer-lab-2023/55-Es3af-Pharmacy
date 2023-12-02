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
    return http.post('/forgetPassword', user)
  }

  updatePassword(password, type){
    return http.put(`/${type}/updatePassword`, password)
  }

  resetPassword(user, id){
    return http.put(`/resetPassword/${id}`, user)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
