-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "fileId" INTEGER;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
