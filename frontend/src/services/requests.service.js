import http from "./http-common";

class RequestService {
  getAll() {
    return http.get("/requestPharmacist/getPharmReq");
  }
  rejectRequest(mid) {
    const rid = {id: mid};
    console.log(rid)
    return http.delete("/user/reject",rid);
  }
  acceptRequest(mid) {
    //console.log(id);

    const rid = {id: mid};
    return http.put("/user/accept",rid);
  }
 // rejectRequest(mid) {
    
   // const rid = {id: mid};
    //r/eturn http.delete("/user/reject",rid);
  //}\
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RequestService();
