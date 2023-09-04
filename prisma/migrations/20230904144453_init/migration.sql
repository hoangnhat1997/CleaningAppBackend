-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('Floor', 'Door', 'Glass', 'Carpet');

-- CreateEnum
CREATE TYPE "Floor" AS ENUM ('Level1', 'Level2', 'Level3');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskType" "TaskType" NOT NULL,
    "location" TEXT NOT NULL,
    "floor" "Floor" NOT NULL,
    "area" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
