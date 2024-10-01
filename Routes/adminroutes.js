const AdminRoutes = require("express").Router();

const {
createAppointment,
getAppointment,
getAppointmentcount,
getConsultationHoursSum,
geRevenueSum,
getRevenueSumM,
getTodayAppointments,
updateAppointmentStatus,
updateAppointmentStatusToCancel,
getWeeklyConsultationHours,
getMonthlyConsultationHours,
getWeeklyRevenue,
getMonthlyRevenue,
getTodaysConsultationHours,
getTodaysRevenue
} = require("../controller/admincontroller/appointment");



AdminRoutes.post("/createAppointment",createAppointment);
AdminRoutes.get("/getAppointment",getAppointment);
AdminRoutes.get("/getAppointmentcount",getAppointmentcount);
AdminRoutes.get("/getConsultationHoursSum",getConsultationHoursSum);
AdminRoutes.get("/geRevenueSum",geRevenueSum);
AdminRoutes.get("/getRevenueSumM",getRevenueSumM);
AdminRoutes.get("/getTodayAppointments",getTodayAppointments);
AdminRoutes.put("/updateAppointmentStatus",updateAppointmentStatus);
AdminRoutes.put("/CancelAppointmentStatus",updateAppointmentStatusToCancel);
AdminRoutes.get("/getWeeklyConsultationHours",getWeeklyConsultationHours);
AdminRoutes.get("/getMonthlyConsultationHours",getMonthlyConsultationHours);
AdminRoutes.get("/getWeeklyRevenue",getWeeklyRevenue);
AdminRoutes.get("/getMonthlyRevenue",getMonthlyRevenue);
AdminRoutes.get("/getTodaysConsultationHours",getTodaysConsultationHours);
AdminRoutes.get("/getTodaysRevenue",getTodaysRevenue);

module.exports = AdminRoutes;