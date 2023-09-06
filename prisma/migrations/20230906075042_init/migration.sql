/*
  Warnings:

  - You are about to drop the column `fileId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_fileId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "fileId";
