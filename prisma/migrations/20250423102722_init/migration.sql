/*
  Warnings:

  - You are about to drop the column `createdBy` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `MedicalRecord` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_patientId_fkey";

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "createdBy",
DROP COLUMN "patientId",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "patient_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
