import http from "./http-common";
class MedsService {
  getAll() {
    return http.get("/medicine");
  }

  search(query){
    
    return http.get("/medicine/?Name", query);
  }

  async searchByName(medicine) {
    return http.get("/medicine/searchByName", medicine);
  }

  filterMedicinebyUse(medicinalUse) {
    return http.get("/medicine/filter", medicinalUse);
  }

  addMedicine(med) {
    return http.post("/medicine", med);
  }

  updateMedicine(medicine) {
    return http.put("/medicine/update", medicine);
  }

  deleteMedicine(Name) {
    return http.delete(`/medicine`, Name);
  }
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MedsService();
