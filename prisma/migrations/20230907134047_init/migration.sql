/*
  Warnings:

  - Added the required column `image` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_databaseFileId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "image" TEXT NOT NULL;
