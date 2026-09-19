import prisma from "../config/prisma.js";
import generatePassNumber from "../utils/generatePassNumber.js";
import updateExpiredGatePasses from "../utils/updateExpiredGatePasses.js";



/* =========================================
   CREATE GATE PASS
========================================= */

export const createGatePass = async (
  req,
  res,
  next
) => {

  try {

    const {

      visitorName,
      visitorPhone,
      visitorCompany,
      purpose,
      personToMeet,
      department,
      validFrom,
      validUntil,
      remarks,

    } = req.body;


    /* Required Fields */

    if (
      !visitorName ||
      !visitorPhone ||
      !purpose ||
      !validFrom
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Visitor name, visitor phone, purpose and valid from are required.",

      });

    }


    /* Validate Dates */

    const validFromDate =
      new Date(validFrom);


    if (
      Number.isNaN(
        validFromDate.getTime()
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid valid from date.",

      });

    }


    let validUntilDate = null;


    if (validUntil) {

      validUntilDate =
        new Date(validUntil);


      if (
        Number.isNaN(
          validUntilDate.getTime()
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid valid until date.",

        });

      }


      if (
        validUntilDate <
        validFromDate
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Valid until date cannot be earlier than valid from date.",

        });

      }

    }


    /* Generate Pass Number */

    const passNumber =
      await generatePassNumber();


    /* Create Gate Pass */

    const gatePass =
      await prisma.gatePass.create({

        data: {

          passNumber,

          visitorName:
            visitorName.trim(),

          visitorPhone:
            visitorPhone.trim(),

          visitorCompany:
            visitorCompany?.trim() || null,

          purpose:
            purpose.trim(),

          personToMeet:
            personToMeet?.trim() || null,

          department:
            department?.trim() || null,

          validFrom:
            validFromDate,

          validUntil:
            validUntilDate,

          remarks:
            remarks?.trim() || null,

        },

      });


    return res.status(201).json({

      success: true,

      message:
        "Gate pass created successfully.",

      data: gatePass,

    });


  } catch (error) {

    next(error);

  }

};


/* =========================================
   GET ALL GATE PASSES
   WITH PAGINATION AND FILTERING
========================================= */

export const getAllGatePasses = async (req, res, next) => {
  try {
    await updateExpiredGatePasses();

    const {
      page = 1,
      limit = 10,
      status,
      search,
      startDate,
      endDate,
    } = req.query;


    /* =========================================
       PAGINATION
    ========================================= */

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);

    const limitNumber = Math.min(
      Math.max(parseInt(limit, 10) || 10, 1),
      100
    );

    const skip = (pageNumber - 1) * limitNumber;


    /* =========================================
       BUILD FILTER
    ========================================= */

    const where = {};


    // Status Filter

    if (status) {
      const allowedStatuses = [
        "ACTIVE",
        "EXPIRED",
        "COMPLETED",
        "CANCELLED",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid gate pass status.",
        });
      }

      where.status = status;
    }


    // Search Filter

    if (search) {
      where.OR = [
        {
          passNumber: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          visitorName: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          visitorPhone: {
            contains: search,
          },
        },

        {
          visitorCompany: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }


    // Date Filter

    if (startDate || endDate) {
      where.createdAt = {};

      if (startDate) {
        const start = new Date(startDate);

        if (isNaN(start.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid start date.",
          });
        }

        start.setHours(0, 0, 0, 0);

        where.createdAt.gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);

        if (isNaN(end.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid end date.",
          });
        }

        end.setHours(23, 59, 59, 999);

        where.createdAt.lte = end;
      }
    }


    /* =========================================
       DATABASE QUERY
    ========================================= */

    const [
      gatePasses,
      totalGatePasses,
    ] = await Promise.all([
      prisma.gatePass.findMany({
        where,

        orderBy: {
          createdAt: "desc",
        },

        skip,

        take: limitNumber,
      }),

      prisma.gatePass.count({
        where,
      }),
    ]);


    const totalPages = Math.ceil(
      totalGatePasses / limitNumber
    );


    /* =========================================
       RESPONSE
    ========================================= */

    return res.status(200).json({
      success: true,

      data: gatePasses,

      pagination: {
        totalRecords: totalGatePasses,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });

  } catch (error) {
    next(error);
  }
};


/* =========================================
   GET SINGLE GATE PASS
========================================= */

export const getGatePassById = async (req, res, next) => {
  try {
    await updateExpiredGatePasses();
    const { id } = req.params;

    const gatePass = await prisma.gatePass.findUnique({
      where: {
        id,
      },
    });

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: gatePass,
    });
  } catch (error) {
    next(error);
  }
};




/* =========================================
   UPDATE GATE PASS
========================================= */

export const updateGatePass = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingGatePass = await prisma.gatePass.findUnique({
      where: {
        id,
      },
    });

    if (!existingGatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found.",
      });
    }

    const {
      visitorName,
      visitorPhone,
      visitorCompany,
      purpose,
      personToMeet,
      department,
      validFrom,
      validUntil,
      remarks,
    } = req.body;

    const updatedGatePass = await prisma.gatePass.update({
      where: {
        id,
      },

      data: {
        ...(visitorName !== undefined && { visitorName }),

        ...(visitorPhone !== undefined && { visitorPhone }),

        ...(visitorCompany !== undefined && {
          visitorCompany,
        }),

        ...(purpose !== undefined && { purpose }),

        ...(personToMeet !== undefined && {
          personToMeet,
        }),

        ...(department !== undefined && {
          department,
        }),

        ...(validFrom !== undefined && {
          validFrom: new Date(validFrom),
        }),

        ...(validUntil !== undefined && {
          validUntil: validUntil
            ? new Date(validUntil)
            : null,
        }),

        ...(remarks !== undefined && { remarks }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Gate pass updated successfully.",
      data: updatedGatePass,
    });
  } catch (error) {
    next(error);
  }
};


/* =========================================
   UPDATE GATE PASS STATUS
========================================= */

export const updateGatePassStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const allowedStatuses = [
      "ACTIVE",
      "EXPIRED",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gate pass status.",
      });
    }

    const gatePass = await prisma.gatePass.findUnique({
      where: {
        id,
      },
    });

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found.",
      });
    }

    const updatedGatePass = await prisma.gatePass.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Gate pass status updated successfully.",
      data: updatedGatePass,
    });
  } catch (error) {
    next(error);
  }
};


/* =========================================
   DELETE GATE PASS
========================================= */

export const deleteGatePass = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gatePass = await prisma.gatePass.findUnique({
      where: {
        id,
      },
    });

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found.",
      });
    }

    await prisma.gatePass.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Gate pass deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};