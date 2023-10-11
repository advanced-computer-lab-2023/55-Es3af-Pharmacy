import http from "./http-common";

class PatientService {
    getAll() {
      return http.get("/patients");
    }
}  

export default new PatientService();