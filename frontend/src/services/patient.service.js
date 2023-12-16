import http from "./http-common";

class PatientService {
  getWallet(){
    return http.get("patient/wallet");
  }
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
   
    checkout(string){
      console.log(string);
      return http.post(`patient/checkout?string=${string}`);
    }
    viewOrder(){
      return http.get("patient/order");
    }
    viewAddress(){
      
      return http.get("patient/dropdown");
    }
   
    cancel(id){
      console.log(id.id);
      return http.get(`/patient/cancel?id=${id.id}`);
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
