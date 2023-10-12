import http from "./http-common";
class MedsService {
  getAll() {
    return http.get("/medicine");
  }

  async searchByName(Name) {
    return http.get("/medicine/searchByName", Name);
  }

  filterMedicinebyUse(medicinalUse) {
    return http.get("/medicine/filter", medicinalUse);
  }

  addMedicine(med) {
    return http.post("/medicine", med);
  }

  updateMedicine(Name, Price, ActiveIngredients) {
    return http.put("/medicine", { Name, Price, ActiveIngredients });
  }

  deleteMedicine(Name) {
    return http.delete(`/medicine`, Name);
  }
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MedsService();
