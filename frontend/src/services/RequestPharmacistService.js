import http from "./http-common";

class RequestPharmacistService {
  getAll() {
    return http.get("/pharmacist-requests/");
  }

  pharmacistReq(pharmacistReq) {
    return http.post("/pharmacist-requests/newRequest", pharmacistReq);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RequestPharmacistService();