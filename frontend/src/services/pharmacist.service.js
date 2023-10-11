import http from "./http-common";

class PharmacistService {
    getAll() {
      return http.get("/pharmacist");
    }
}  

export default new PharmacistService();
