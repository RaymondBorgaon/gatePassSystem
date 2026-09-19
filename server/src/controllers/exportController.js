import ExcelJS from "exceljs";

import prisma from "../config/prisma.js";

import updateExpiredGatePasses from "../utils/updateExpiredGatePasses.js";


/* =========================================
   EXPORT GATE PASSES AS EXCEL
========================================= */

export const exportGatePasses = async (
  req,
  res,
  next
) => {

  try {

    await updateExpiredGatePasses();


    const {
      status,
      search,
      startDate,
      endDate,
    } = req.query;


    /* =========================================
       BUILD FILTER
    ========================================= */

    const where = {};


    // STATUS FILTER

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

          message:
            "Invalid gate pass status.",

        });

      }


      where.status = status;

    }



    // SEARCH FILTER

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



    // DATE FILTER

    if (startDate || endDate) {

      where.createdAt = {};


      if (startDate) {

        const start =
          new Date(startDate);


        if (isNaN(start.getTime())) {

          return res.status(400).json({

            success: false,

            message:
              "Invalid start date.",

          });

        }


        start.setHours(
          0,
          0,
          0,
          0
        );


        where.createdAt.gte =
          start;

      }



      if (endDate) {

        const end =
          new Date(endDate);


        if (isNaN(end.getTime())) {

          return res.status(400).json({

            success: false,

            message:
              "Invalid end date.",

          });

        }


        end.setHours(
          23,
          59,
          59,
          999
        );


        where.createdAt.lte =
          end;

      }

    }



    /* =========================================
       FETCH DATA
    ========================================= */

    const gatePasses =
      await prisma.gatePass.findMany({

        where,

        orderBy: {
          createdAt: "desc",
        },

      });



    /* =========================================
       CREATE EXCEL WORKBOOK
    ========================================= */

    const workbook =
      new ExcelJS.Workbook();


    workbook.creator =
      "Raymond Gate Pass Management System";


    workbook.created =
      new Date();


    const worksheet =
      workbook.addWorksheet(
        "Gate Pass Records"
      );



    /* =========================================
       ADD COLUMNS
    ========================================= */

    worksheet.columns = [

      {
        header: "Pass Number",
        key: "passNumber",
        width: 20,
      },

      {
        header: "Visitor Name",
        key: "visitorName",
        width: 24,
      },

      {
        header: "Visitor Phone",
        key: "visitorPhone",
        width: 18,
      },

      {
        header: "Company",
        key: "visitorCompany",
        width: 24,
      },

      {
        header: "Purpose",
        key: "purpose",
        width: 30,
      },

      {
        header: "Person To Meet",
        key: "personToMeet",
        width: 24,
      },

      {
        header: "Department",
        key: "department",
        width: 22,
      },

      {
        header: "Valid From",
        key: "validFrom",
        width: 24,
      },

      {
        header: "Valid Till",
        key: "validTill",
        width: 24,
      },

      {
        header: "Status",
        key: "status",
        width: 15,
      },

      {
        header: "Remarks",
        key: "remarks",
        width: 30,
      },

      {
        header: "Created At",
        key: "createdAt",
        width: 24,
      },

    ];



    /* =========================================
       HEADER STYLING
    ========================================= */

    const headerRow =
      worksheet.getRow(1);


    headerRow.font = {

      bold: true,

      color: {
        argb: "FFFFFFFF",
      },

      size: 11,

    };


    headerRow.alignment = {

      vertical: "middle",

      horizontal: "center",

    };


    headerRow.fill = {

      type: "pattern",

      pattern: "solid",

      fgColor: {
        argb: "FFC8102E",
      },

    };


    headerRow.height = 24;



    /* =========================================
       ADD DATA
    ========================================= */

    gatePasses.forEach((gatePass) => {

      worksheet.addRow({

        passNumber:
          gatePass.passNumber || "",

        visitorName:
          gatePass.visitorName || "",


        // PHONE AS TEXT
        // Leading zero will remain safe
        visitorPhone: String(
          gatePass.visitorPhone || ""
        ),


        visitorCompany:
          gatePass.visitorCompany || "",


        purpose:
          gatePass.purpose || "",


        personToMeet:
          gatePass.personToMeet || "",


        department:
          gatePass.department || "",


        validFrom:
          gatePass.validFrom
            ? new Date(
              gatePass.validFrom
            )
            : "",


        validTill:
          gatePass.validTill
            ? new Date(
              gatePass.validTill
            )
            : "",


        status:
          gatePass.status || "",


        remarks:
          gatePass.remarks || "",


        createdAt:
          gatePass.createdAt
            ? new Date(
              gatePass.createdAt
            )
            : "",

      });

    });



    /* =========================================
       DATE FORMATTING
    ========================================= */

    worksheet.eachRow(
      (row, rowNumber) => {

        if (rowNumber === 1) return;


        // Phone column as text

        row.getCell(3).numFmt =
          "@";


        // Date columns

        row.getCell(8).numFmt =
          "dd mmm yyyy, hh:mm AM/PM";


        row.getCell(9).numFmt =
          "dd mmm yyyy, hh:mm AM/PM";


        row.getCell(12).numFmt =
          "dd mmm yyyy, hh:mm AM/PM";


        row.alignment = {

          vertical: "middle",

          wrapText: true,

        };


        row.height = 22;

      }
    );



    /* =========================================
       ADD BORDERS
    ========================================= */

    worksheet.eachRow(
      (row) => {

        row.eachCell(
          (cell) => {

            cell.border = {

              top: {
                style: "thin",
                color: {
                  argb: "FFE2E8F0",
                },
              },

              left: {
                style: "thin",
                color: {
                  argb: "FFE2E8F0",
                },
              },

              bottom: {
                style: "thin",
                color: {
                  argb: "FFE2E8F0",
                },
              },

              right: {
                style: "thin",
                color: {
                  argb: "FFE2E8F0",
                },
              },

            };

          }
        );

      }
    );



    /* =========================================
       FREEZE HEADER ROW
    ========================================= */

    worksheet.views = [

      {
        state: "frozen",

        ySplit: 1,

      },

    ];



    /* =========================================
       AUTO FILTER
    ========================================= */

    worksheet.autoFilter = {

      from: "A1",

      to: "L1",

    };



    /* =========================================
       STATUS COLORS
    ========================================= */

    worksheet.eachRow(
      (row, rowNumber) => {

        if (rowNumber === 1) return;


        const statusCell =
          row.getCell(10);


        const status =
          statusCell.value;


        if (status === "ACTIVE") {

          statusCell.font = {
            bold: true,
            color: {
              argb: "FF15803D",
            },
          };

        }


        if (status === "EXPIRED") {

          statusCell.font = {
            bold: true,
            color: {
              argb: "FFD97706",
            },
          };

        }


        if (status === "COMPLETED") {

          statusCell.font = {
            bold: true,
            color: {
              argb: "FF2563EB",
            },
          };

        }


        if (status === "CANCELLED") {

          statusCell.font = {
            bold: true,
            color: {
              argb: "FFDC2626",
            },
          };

        }

      }
    );



    /* =========================================
       SEND EXCEL FILE
    ========================================= */

    const fileName =
      `gate-passes-${Date.now()}.xlsx`;


    res.setHeader(

      "Content-Type",

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    );


    res.setHeader(

      "Content-Disposition",

      `attachment; filename="${fileName}"`

    );


    await workbook.xlsx.write(res);


    res.end();


  } catch (error) {

    next(error);

  }

};