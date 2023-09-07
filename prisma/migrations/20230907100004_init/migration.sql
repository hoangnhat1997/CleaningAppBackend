/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `databaseFileId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_fileId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "databaseFileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "DatabaseFile" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "data" BYTEA NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseFile_id_key" ON "DatabaseFile"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_databaseFileId_fkey" FOREIGN KEY ("databaseFileId") REFERENCES "DatabaseFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
