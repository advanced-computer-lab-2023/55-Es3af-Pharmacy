const Router = require("express");
const { medicineRoutes } = require("./medicine.routes");
const { userRoutes } = require("./user.routes");
const { patientRoutes } = require("./patient.routes");
const { pharmacistRoutes } = require("./pharmacist.routes");
const { pharmacistRequestsRoutes } = require("./pharmacistRequests.routes");

const router = new Router();

router.use("/medicine", medicineRoutes);

router.use("/user", userRoutes);

router.use("/patient", patientRoutes);

router.use("/pharmacist", pharmacistRoutes);

router.use("/pharmacist-requests",pharmacistRequestsRoutes )

module.exports = { router };
