const AdminRoutes = require("express").Router();

const {
createAppointment,
getAppointment,
getAppointmentcount,
getConsultationHoursSum,
geRevenueSum,
getRevenueSumM,
getTodayAppointments
} = require("../controller/admincontroller/appointment");



AdminRoutes.post("/createAppointment",createAppointment);
AdminRoutes.get("/getAppointment",getAppointment);
AdminRoutes.get("/getAppointmentcount",getAppointmentcount);
AdminRoutes.get("/getConsultationHoursSum",getConsultationHoursSum);
AdminRoutes.get("/geRevenueSum",geRevenueSum);
AdminRoutes.get("/getRevenueSumM",getRevenueSumM);
AdminRoutes.get("/getTodayAppointments",getTodayAppointments);
module.exports = AdminRoutes;