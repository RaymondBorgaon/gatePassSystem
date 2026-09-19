import prisma from "../config/prisma.js";

const updateExpiredGatePasses = async () => {
  try {
    await prisma.gatePass.updateMany({
      where: {
        status: "ACTIVE",

        validUntil: {
          not: null,
          lt: new Date(),
        },
      },

      data: {
        status: "EXPIRED",
      },
    });
  } catch (error) {
    console.error(
      "Error updating expired gate passes:",
      error.message
    );
  }
};

export default updateExpiredGatePasses;