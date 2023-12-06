import http from "./http-common";

class RegisterPatientService {
  getAll() {
    return http.get("/patient/patients");
  }

  registerPatient(patient) {
   
    return http.post("/patient/registerPatient", patient);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RegisterPatientService();
