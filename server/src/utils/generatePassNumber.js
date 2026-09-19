import prisma from "../config/prisma.js";

const generatePassNumber = async () => {
  const currentYear = new Date().getFullYear();

  const prefix = `RGP-${currentYear}-`;

  const latestGatePass = await prisma.gatePass.findFirst({
    where: {
      passNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      passNumber: true,
    },
  });

  let nextNumber = 1;

  if (latestGatePass) {
    const lastNumber = parseInt(
      latestGatePass.passNumber.split("-")[2],
      10
    );

    nextNumber = lastNumber + 1;
  }

  const formattedNumber = String(nextNumber).padStart(6, "0");

  return `${prefix}${formattedNumber}`;
};

export default generatePassNumber;