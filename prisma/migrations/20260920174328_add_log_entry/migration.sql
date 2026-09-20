-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('LOGIN', 'RATE_LIMITED', 'INVITE_CREATED', 'INVITE_UPDATED', 'INVITE_DELETED', 'RSVP_SUBMITTED', 'RSVP_UPDATED');

-- CreateTable
CREATE TABLE "LogEntry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "LogType" NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "message" TEXT NOT NULL,
    "ip" TEXT,
    "meta" JSONB,

    CONSTRAINT "LogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LogEntry_createdAt_idx" ON "LogEntry"("createdAt");
