import http from "./http-common";

class PatientService {
    getAll() {
      return http.get("/patient/patients");
    }
    seeCart(){
      return http.get("/patient/Cart");
    }
    removeOne(){
      return http.get("/patient/removeItem")
    }
    addToCart(id){
      
      return http.post(`/patient/addToCart/${id}`);
      
    }
}  

export default new PatientService();
