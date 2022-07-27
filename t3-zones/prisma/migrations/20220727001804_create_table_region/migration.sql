-- CreateTable
CREATE TABLE "region" (
    "region" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "lambda" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);