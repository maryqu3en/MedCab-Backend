-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_created_by_fkey";

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
