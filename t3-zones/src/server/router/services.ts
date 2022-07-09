import { createRouter } from "./context";
import { z } from "zod";
import axios from "axios";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const servicesRouter = createRouter()
  .mutation("check", {
    input: z
      .object({
        url: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input } : any) {

        const { url } = input;

        try {
            
            const response = await axios({
                url,
                method: "GET",
                timeout: 10000
            });

            return {
                status: response.status,
                data: response.data,
            }

        } catch(err) {
            throw err
        }

    },
  })
  
  .mutation("add", {
    input: z
      .object({
        url: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input } : any) {
        const { url } = input;

        const service = prisma.service.create({
          data: {
            url,
            name: url
          }
        });

        return service

    },
  })
  
