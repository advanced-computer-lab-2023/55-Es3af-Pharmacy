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
      
      return http.post("patient/addDel",address);
    }
    checkout(){
      return http.post("patient/checkout")
    }
    viewOrder(){
      return http.get("patient/order");
    }
    viewAddress(){
      console.log("hennnaa");
      return http.get("patient/dropdown");
    }
    cancelOrder(){
      return http.delete("patient/cancel");
    }
    removeMed(id){
      return http.post(`/patient/deleteMed?id=${id}`)
    }
    selectAdd(address){
     
      return http.post("/patient/selectAddress", address)
    }

    // getPassword(password){
    //   console.log('service')
    //   return http.post(`/patient/updatePassword`, password)
    // }
    async createSession(body){
      return http.post("/patient/createSession", body)
    }
    async withdrawFromWallet(body){
      return http.put("/patient/widrawFromWallet",body)
    }

    updatePassword(password){
      return http.put(`/patient/updatePassword`, password)
    }

} 

export default new PatientService();
