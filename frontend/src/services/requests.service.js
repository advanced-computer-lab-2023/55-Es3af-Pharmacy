import http from "./http-common";

class RequestService {
  getAll() {
    return http.get("/pharmacist-requests");
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RequestService();
