
const Appointment = require('../../models/apointment');
const { Op } = require('sequelize');  
const moment = require('moment');  
const { Sequelize } = require('sequelize');
const AppError = require('../../utils/error');
const {catchAsync} = require('../../utils/catchAsync');






exports.createAppointment = catchAsync( async (req, res,next) => {
    
        const { userId, name,phone, date, ConsultationHours,timeSlot,Fees,Category } = req.body;
        console.log(req.body,"body");
        if (!userId || !name || !phone || !date) {
          return next(new AppError('Required fields are missing', 400)); 
      }
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
    
})





exports.getAppointment =catchAsync(async (req, res) => {
    
        const appointments = await Appointment.findAll();
        res.status(200).json({message: 'Appointment fetched successfully',appointments});
    
})







exports.getAppointmentcount=catchAsync( async (req, res) => {
    const appointments = await Appointment.count();
    res.status(200).json({message: 'Appointment fetched successfully',appointments});
    
})





exports.getConsultationHoursSum = catchAsync(async (req, res) => {
    
        const totalConsultationHours = await Appointment.sum('ConsultationHours', {
            where: {
            },
        });
        res.status(200).json({
            message: 'Total Consultation Hours',
            totalConsultationHours: totalConsultationHours || 0,  
        });
});








exports.geRevenueSum =catchAsync(async (req, res) => {
    
        const totalRevenue = await Appointment.sum('Fees', {
            where: {
            },
        });

        res.status(200).json({
            message: 'Total Revenue',
            totalConsultationHours: totalRevenue  || 0,  
        })
});














exports.getRevenueSumM =catchAsync(async (req, res) => {
    
        
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
});










exports.getTodayAppointments =catchAsync(async (req, res) => {
   
       
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
});










exports.updateAppointmentStatus =catchAsync(async (req, res) => {
  
    const { appointmentId } = req.query; 
    const appointment = await Appointment.findByPk(appointmentId);
    console.log(appointment)
   
  if (!appointment) {
    return next(new AppError('Appointment not found', 404));
  }

  if (appointment.status === 'Completed') {
    return next(new AppError('Appointment is already completed', 400));
  }
   
    appointment.status = 'Completed';

  
    await appointment.save();

  
    res.status(200).json({
      message: 'Appointment status updated to completed',
      appointment,
    });
});










exports.updateAppointmentStatusToCancel =catchAsync(async (req, res) => {
    
      const { appointmentId } = req.query; 
      const appointment = await Appointment.findByPk(appointmentId);
      console.log(appointment)
      
  if (!appointment) {
    return next(new AppError('Appointment not found', 404));
  }

  if (appointment.status === 'Cancelled') {
    return next(new AppError('Appointment is already Cancelled', 400));
  }
  
     
      appointment.status = 'Cancelled';
  
    
      await appointment.save();
  
    
      res.status(200).json({
        message: 'Appointment status updated to Cancelled',
        appointment,
      });
  });
  













  

const getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};







exports.getWeeklyConsultationHours =catchAsync(async (req, res) => {
    const today = new Date();
    const lastWeek = new Date(today);

    lastWeek.setDate(today.getDate() - 7);

    
    const consultationData = await Appointment.findAll({
      where: {
        createdAt: {
          [Op.between]: [lastWeek, today],
        },
        status: 'completed', 
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'], 
        [Sequelize.fn('SUM', Sequelize.col('ConsultationHours')), 'totalDuration'] 
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))], 
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']]
    });

   
    const dailyConsultations = consultationData.reduce((acc, entry) => {
      const day = entry.getDataValue('date');
      const totalDuration = entry.getDataValue('totalDuration');
      acc[day] = totalDuration; 
      return acc;
    }, {});

   
    res.status(200).json({
      message: 'Consultation hours for the last week',
      data: dailyConsultations,
    });

});














exports.getMonthlyConsultationHours =catchAsync(async (req, res) => {
    const today = new Date();
    const lastMonth = new Date(today);

    
    lastMonth.setMonth(today.getMonth() - 1);

    
    const consultationData = await Appointment.findAll({
      where: {
        createdAt: {
          [Op.between]: [lastMonth, today],
        },
        status: 'completed', 
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('ConsultationHours')), 'totalDuration'] 
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))], 
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']] 
    });

   
    const dailyConsultations = consultationData.reduce((acc, entry) => {
      const day = entry.getDataValue('date');
      const totalDuration = entry.getDataValue('totalDuration');
      acc[day] = totalDuration; 
      return acc;
    }, {});

    
    res.status(200).json({
      message: 'Consultation hours for the last month',
      data: dailyConsultations,
    });
});
















exports.getWeeklyRevenue =catchAsync(async (req, res) => {
      const today = new Date();
      const lastWeek = new Date(today);
  
      lastWeek.setDate(today.getDate() - 7);
  
      
      const consultationData = await Appointment.findAll({
        where: {
            createdAt: {
            [Op.between]: [lastWeek, today],
          },
          status: 'completed', 
        },
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'], 
          [Sequelize.fn('SUM', Sequelize.col('Fees')), 'totalRevenue'] 
        ],
        group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))], 
        order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']]
      });
  
     
      const dailytotalRevenue = consultationData.reduce((acc, entry) => {
        const day = entry.getDataValue('date');
        const totalRevenue = entry.getDataValue('totalRevenue');
        acc[day] = totalRevenue; 
        return acc;
      }, {});
  
     
      res.status(200).json({
        message: 'Total revenue for the last week',
        data: dailytotalRevenue,
      });
  
  });
  












  exports.getMonthlyRevenue =catchAsync(async (req, res) => {
  
      const today = new Date();
      const lastMonth = new Date(today);
  
      
      lastMonth.setMonth(today.getMonth() - 1);
  
      
      const consultationData = await Appointment.findAll({
        where: {
            createdAt: {
            [Op.between]: [lastMonth, today],
          },
          status: 'completed', 
        },
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
          [Sequelize.fn('SUM', Sequelize.col('Fees')), 'totalRevevue'] 
        ],
        group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))], 
        order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']] 
      });
  
     
      const dailytotalRevevue = consultationData.reduce((acc, entry) => {
        const day = entry.getDataValue('date');
        const totalRevevue = entry.getDataValue('totalRevevue');
        acc[day] = totalRevevue; 
        return acc;
      }, {});
  
      
      res.status(200).json({
        message: 'Total revenue for the last month',
        data: dailytotalRevevue ,
      });
  });
















exports.getTodaysConsultationHours =catchAsync(async (req, res) => {
    const today = new Date();
    
    
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    
    
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

   
    const consultationData = await Appointment.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
        status: 'completed', 
      },
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('ConsultationHours')), 'totalDuration'] 
      ],
    });

 
    const totalDuration = consultationData[0]?.getDataValue('totalDuration') || 0;

    
    res.status(200).json({
      message: 'Consultation hours for today',
      data: totalDuration,
    });
});









exports.getTodaysRevenue =catchAsync(async (req, res) => {
      const today = new Date();
      
      
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      
      
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
     
      const consultationData = await Appointment.findAll({
        where: {
            createdAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
          status: 'completed', 
        },
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('Fees')), 'totalRevenue'] 
        ],
      });
  
   
      const totalRevenue = consultationData[0]?.getDataValue('totalRevenue') || 0;
  
     
      res.status(200).json({
        message: 'Total revenue for today',
        data: totalRevenue,
      });
  });
  