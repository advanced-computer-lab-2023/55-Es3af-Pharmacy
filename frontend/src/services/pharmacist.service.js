import http from "./http-common";

class PharmacistService {
    getAll() {
      return http.get("/pharmacist/pharmacists");
    }
    archive(name){
      const res= {Name:name};
      console.log(res);
      return http.post("/medicine/archiveMedicine",res);
    }
    unarchive(name){
      const res= {Name:name};
      console.log(res);
      return http.post("/medicine/unarchiveMedicine",res);
    }
    getWallet(){
      return http.get("pharmacist/wallet");
    }
}  

export default new PharmacistService();
