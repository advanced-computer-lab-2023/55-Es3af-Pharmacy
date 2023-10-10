import http from "./http-common";

class UserService {
  getAll() {
    return http.get("/user");
  }

  addAdmin(user) {
    return http.post("/user/admin", user);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
