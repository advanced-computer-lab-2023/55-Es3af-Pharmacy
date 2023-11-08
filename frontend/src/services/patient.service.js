import http from "./http-common";

class PatientService {
    getAll() {
      return http.get("/patient/patients");
    }
    seeCart(query){
      return http.get(`/patient/Cart?_id=${query}`);
    }
    addToCart(query){
      const id= "6548e4a43fc52b59ba77a428";
      return http.get(`/patient/addToCart?_id=${id}`, query);
      
    }
}  

export default new PatientService();
