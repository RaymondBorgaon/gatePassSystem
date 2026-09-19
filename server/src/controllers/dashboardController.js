import prisma from "../config/prisma.js";
import updateExpiredGatePasses from "../utils/updateExpiredGatePasses.js";


/* =========================================
   GET DASHBOARD STATISTICS
========================================= */

export const getDashboardStats = async (
  req,
  res,
  next
) => {
  try {

    /* Update Expired Gate Passes */

    await updateExpiredGatePasses();


    /* Get Start Of Today */

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    /* Database Queries */

    const [
      totalGatePasses,
      activeGatePasses,
      completedGatePasses,
      expiredGatePasses,
      cancelledGatePasses,
      todayGatePasses,
      recentGatePasses,
    ] = await Promise.all([

      prisma.gatePass.count(),

      prisma.gatePass.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.gatePass.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.gatePass.count({
        where: {
          status: "EXPIRED",
        },
      }),

      prisma.gatePass.count({
        where: {
          status: "CANCELLED",
        },
      }),

      prisma.gatePass.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),

      prisma.gatePass.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 5,
      }),

    ]);


    return res.status(200).json({
      success: true,

      data: {

        statistics: {

          totalGatePasses,

          activeGatePasses,

          completedGatePasses,

          expiredGatePasses,

          cancelledGatePasses,

          todayGatePasses,

        },

        recentGatePasses,

      },
    });

  } catch (error) {
    next(error);
  }
};