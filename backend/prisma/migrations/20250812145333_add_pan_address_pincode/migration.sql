-- AlterTable
ALTER TABLE "public"."Registration" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "pan" VARCHAR(10),
ADD COLUMN     "pinCode" VARCHAR(6),
ADD COLUMN     "state" VARCHAR(100);
