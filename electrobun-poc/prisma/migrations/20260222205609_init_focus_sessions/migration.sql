-- CreateTable
CREATE TABLE "FocusSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    "phase" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "requiresComputer" BOOLEAN NOT NULL,
    "lockMode" TEXT NOT NULL,
    "plannedSeconds" INTEGER NOT NULL,
    "elapsedSeconds" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
