BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[GatePass] (
    [id] NVARCHAR(1000) NOT NULL,
    [passNumber] NVARCHAR(1000) NOT NULL,
    [visitorName] NVARCHAR(1000) NOT NULL,
    [visitorPhone] NVARCHAR(1000) NOT NULL,
    [visitorCompany] NVARCHAR(1000),
    [purpose] NVARCHAR(1000) NOT NULL,
    [personToMeet] NVARCHAR(1000),
    [department] NVARCHAR(1000),
    [validFrom] DATETIME2 NOT NULL,
    [validUntil] DATETIME2,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [GatePass_status_df] DEFAULT 'ACTIVE',
    [remarks] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [GatePass_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [GatePass_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [GatePass_passNumber_key] UNIQUE NONCLUSTERED ([passNumber])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [GatePass_visitorName_idx] ON [dbo].[GatePass]([visitorName]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [GatePass_visitorPhone_idx] ON [dbo].[GatePass]([visitorPhone]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [GatePass_status_idx] ON [dbo].[GatePass]([status]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [GatePass_validFrom_idx] ON [dbo].[GatePass]([validFrom]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [GatePass_createdAt_idx] ON [dbo].[GatePass]([createdAt]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [GatePass_status_createdAt_idx] ON [dbo].[GatePass]([status], [createdAt]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
