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
    addDel(address){
      console.log(address);
      return http.post("patient/addDel",address);
    }
    checkout(){
      return http.post("patient/checkout")
    }
    viewOrder(){
      return http.get("patient/order");
    }
    cancelOrder(){
      return http.delete("patient/cancel");
    }
    removeMed(id){
      return http.post(`/patient/deleteMed?id=${id}`)
    }


}  

export default new PatientService();
