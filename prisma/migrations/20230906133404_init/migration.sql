/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_fileId_fkey";

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "File_id_seq";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "fileId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "File_id_key" ON "File"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
