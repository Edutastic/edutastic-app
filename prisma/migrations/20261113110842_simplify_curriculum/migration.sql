/*
  Warnings:

  - You are about to drop the column `ageGroupId` on the `ChildProfile` table. All the data in the column will be lost.
  - You are about to drop the `AgeGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Curriculum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subtopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ageGroupKey` to the `ChildProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChildProfile" DROP CONSTRAINT "ChildProfile_ageGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Curriculum" DROP CONSTRAINT "Curriculum_ageGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Curriculum" DROP CONSTRAINT "Curriculum_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Subtopic" DROP CONSTRAINT "Subtopic_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_curriculumId_fkey";

-- AlterTable
ALTER TABLE "ChildProfile" DROP COLUMN "ageGroupId",
ADD COLUMN     "ageGroupKey" VARCHAR(10) NOT NULL;

-- DropTable
DROP TABLE "AgeGroup";

-- DropTable
DROP TABLE "Curriculum";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "Subtopic";

-- DropTable
DROP TABLE "Topic";

-- CreateIndex
CREATE INDEX "ChildProfile_parentId_idx" ON "ChildProfile"("parentId");
