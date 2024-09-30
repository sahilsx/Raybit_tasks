const jwt = require('jsonwebtoken');
// const { sendEmail } = require('../../utils/Nodemail');
const Appointment = require('../../models/apointment');
// const SECRET_KEY = process.env.secret_key;

const { Op } = require('sequelize');  
const moment = require('moment');  


exports.createAppointment = async (req, res) => {
    try {
        const { userId, name,phone, date, ConsultationHours,timeSlot,Fees,Category } = req.body;
        console.log(req.body,"body");
        const appointment = new Appointment({
            userId,
            name,
            phone,
            date,
            ConsultationHours,
            timeSlot,
            Fees,
            Category

        });
        await appointment.save();
        res.status(201).json({ message: 'Appointment Booked successfully', appointment });
     }catch(err) {  
        console.log(err);
     }
}





exports.getAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json({message: 'Appointment fetched successfully',appointments});
    } catch (err) {
        console.log(err);
    }
}


exports.getAppointmentcount= async (req, res) => {
    const appointments = await Appointment.count();
    res.status(200).json({message: 'Appointment fetched successfully',appointments});
    
}

exports.getConsultationHoursSum = async (req, res) => {
    try {
        const totalConsultationHours = await Appointment.sum('ConsultationHours', {
            where: {
            },
        });

        res.status(200).json({
            message: 'Total Consultation Hours',
            totalConsultationHours: totalConsultationHours || 0,  
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




exports.geRevenueSum = async (req, res) => {
    try {
        const totalRevenue = await Appointment.sum('Fees', {
            where: {
            },
        });

        res.status(200).json({
            message: 'Total Revenue',
            totalConsultationHours: totalRevenue  || 0,  
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};












exports.getRevenueSumM = async (req, res) => {
    try {
        
        const startDate = moment().subtract(1, 'months').startOf('month').toDate();
        const endDate = moment().subtract(1, 'months').endOf('month').toDate();
        // const startDate = moment().startOf('month').toDate();
        // const endDate = moment().endOf('month').toDate();
        const totalRevenue = await Appointment.sum('Fees', {
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        res.status(200).json({
            message: 'Total Revenue for Last Month',
            totalRevenue: totalRevenue || 0,  
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







exports.getTodayAppointments = async (req, res) => {
    try {
       
        const startDate = moment().startOf('day').toDate();
        const endDate = moment().endOf('day').toDate();

        const todayAppointments = await Appointment.findAll({
            where: {
                date:{
                    [Op.between]: [startDate, endDate],  
                },
            },
        });
        if (todayAppointments.length === 0) {
            return res.status(200).json({
                message: 'There are no appointments for today!!!',
            });
        }
        res.status(200).json({
            message: 'Appointments for Today',
            appointments: todayAppointments 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};