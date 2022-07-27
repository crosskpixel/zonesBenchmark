-- CreateTable
CREATE TABLE "region" (
    "region" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "lambda" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);


insert into region(region, active, lambda) values ('southamerica-east1',true,'https://southamerica-east1-zones-355620.cloudfunctions.net/southamerica-east1');