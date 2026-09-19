import prisma from "../config/prisma.js";
import updateExpiredGatePasses from "../utils/updateExpiredGatePasses.js";


/* =========================================
   GET REPORT SUMMARY
========================================= */

export const getReportSummary = async (
  req,
  res,
  next
) => {
  try {
    await updateExpiredGatePasses();


    const {
      startDate,
      endDate,
    } = req.query;


    /* =========================================
       DATE VALIDATION
    ========================================= */

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message:
          "Start date and end date are required.",
      });
    }


    const start = new Date(startDate);
    const end = new Date(endDate);


    if (
      isNaN(start.getTime()) ||
      isNaN(end.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format.",
      });
    }


    start.setHours(0, 0, 0, 0);

    end.setHours(23, 59, 59, 999);


    if (start > end) {
      return res.status(400).json({
        success: false,
        message:
          "Start date cannot be greater than end date.",
      });
    }


    const dateFilter = {
      createdAt: {
        gte: start,
        lte: end,
      },
    };


    /* =========================================
       DATABASE QUERIES
    ========================================= */

    const [
      totalGatePasses,
      activeGatePasses,
      completedGatePasses,
      expiredGatePasses,
      cancelledGatePasses,
    ] = await Promise.all([

      prisma.gatePass.count({
        where: dateFilter,
      }),

      prisma.gatePass.count({
        where: {
          ...dateFilter,

          status: "ACTIVE",
        },
      }),

      prisma.gatePass.count({
        where: {
          ...dateFilter,

          status: "COMPLETED",
        },
      }),

      prisma.gatePass.count({
        where: {
          ...dateFilter,

          status: "EXPIRED",
        },
      }),

      prisma.gatePass.count({
        where: {
          ...dateFilter,

          status: "CANCELLED",
        },
      }),

    ]);


    /* =========================================
       RESPONSE
    ========================================= */

    return res.status(200).json({
      success: true,

      data: {

        dateRange: {
          startDate: start,
          endDate: end,
        },

        statistics: {
          totalGatePasses,
          activeGatePasses,
          completedGatePasses,
          expiredGatePasses,
          cancelledGatePasses,
        },

      },
    });

  } catch (error) {
    next(error);
  }
};