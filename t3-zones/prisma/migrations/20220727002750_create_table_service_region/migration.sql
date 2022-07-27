-- CreateTable
CREATE TABLE "serviceregion" (
    "serviceid" BIGINT NOT NULL,
    "regionid" BIGINT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "service_region_pkey" PRIMARY KEY ("id")
);


insert into region(region, active, lambda) values ('southamerica-east1',true,'https://southamerica-east1-zones-355620.cloudfunctions.net/southamerica-east1');
insert into "Service"(name,url) values ('https://core-api.revizia.app/api/server/publico/version', 'https://core-api.revizia.app/api/server/publico/version');
insert into ServiceRegion(serviceId, regionId, active) values (1,1, true);