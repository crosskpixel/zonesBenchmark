import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient, region } from "@prisma/client";
import axios from 'axios';
import { strict } from 'assert';
const prisma = new PrismaClient()

interface Candidate {
    serviceid: number,
    serviceurl: string
}

export const getServices = async (region: region, offset = 0) => {
    const result: Candidate[] = await prisma.$queryRaw`
        select 
            s.id as serviceId, 
            s.url as serviceUrl
        from ServiceRegion sr inner join region r on r.id = sr.regionId inner join "Service" s on s.id = sr.serviceId
            where r.id = ${region.id}
            limit 10000 offset ${offset}`;
    return result;
}

export const callServicesAndLoggingResponses = async (region: region, candidates: Candidate[]) => {   
    
    // let resultOfCallbacks = [];
    let promises = [];

    do {
        var chunkServices = candidates.splice(0, 5);
        var request = chunkServices.map(service => ({
            id: service.serviceid,
            url: service.serviceurl,
        }));
        chunkServices = [];

        promises.push(
            axios.post(region.lambda, request).then(response =>{
                console.log(response.data,`dd`)

                console.log(response.data.split(`|`))
            }).catch(err => console.log(err))
        );

        request = [];


    } while(candidates.length > 0);

    await Promise.all(promises);

    // console.log(resultOfCallbacks,`resultOffCallbacks`);

}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const regionName = `southamerica-east1`;
    
    const region: region = await prisma.region.findFirstOrThrow({ where: { region: regionName }});

    var page = 0;

    do {
        var candidates = await getServices(region,page);
        page++;
        
        callServicesAndLoggingResponses(region, candidates);

    } while(candidates.length > 0);

    console.log(`done`);


    res.status(200).json({ name: 'John Doe' })
}