import http from "./http-common";

class PatientService {
    getAll() {
      return http.get("/patient/patients");
    }
}  

export default new PatientService();