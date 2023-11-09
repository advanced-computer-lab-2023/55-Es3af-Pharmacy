import http from "./http-common";

class PatientService {
    getAll() {
      return http.get("/patient/patients");
    }
    seeCart(){
      return http.get("/patient/Cart");
    }
    removeOne(id){
      return http.post(`/patient/removeItem?id=${id}`)
    }

    addOne(id){
      return http.post(`/patient/addItem?id=${id}`)
    }
    
    addToCart(id){
      
      return http.post(`/patient/addToCart?id=${id}`);
      
    }
}  

export default new PatientService();
