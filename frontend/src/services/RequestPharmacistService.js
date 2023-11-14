import http from "./http-common";

class RequestPharmacistService {
  getAll() {
    return http.get("/requestPharmacist/getPharmReq");
  }

  pharmacistReq(pharmacistReq) {
    return http.post("/requestPharmacist/newRequest", pharmacistReq);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RequestPharmacistService();