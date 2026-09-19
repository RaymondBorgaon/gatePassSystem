-- CreateTable
CREATE TABLE "GatePass" (
    "id" TEXT NOT NULL,
    "passNumber" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "visitorPhone" TEXT NOT NULL,
    "visitorCompany" TEXT,
    "purpose" TEXT NOT NULL,
    "personToMeet" TEXT,
    "department" TEXT,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GatePass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GatePass_passNumber_key" ON "GatePass"("passNumber");

-- CreateIndex
CREATE INDEX "GatePass_visitorName_idx" ON "GatePass"("visitorName");

-- CreateIndex
CREATE INDEX "GatePass_visitorPhone_idx" ON "GatePass"("visitorPhone");

-- CreateIndex
CREATE INDEX "GatePass_status_idx" ON "GatePass"("status");

-- CreateIndex
CREATE INDEX "GatePass_validFrom_idx" ON "GatePass"("validFrom");

-- CreateIndex
CREATE INDEX "GatePass_createdAt_idx" ON "GatePass"("createdAt");

-- CreateIndex
CREATE INDEX "GatePass_status_createdAt_idx" ON "GatePass"("status", "createdAt");
