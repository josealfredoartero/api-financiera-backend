import type { Prisma } from "../../generated/prisma/client.ts"
import { prisma } from "../lib/prisma.ts"


const repository = prisma.account

export const AccountRepository = {
  create: async (data: Prisma.AccountUncheckedCreateInput) => {
    return await repository.create({ data })
  },
  findMany: async (parameters?: Prisma.AccountFindManyArgs) => {
    return await repository.findMany(parameters)
  },
  findById: async (id: number, parameters?: Prisma.AccountFindFirstArgs) => {
    return await repository.findFirst({ where: { id }, ...parameters })
  },
  count: async (parameters?: Prisma.AccountCountArgs) => {
    return await repository.count(parameters)
  },
  update: async (id: number, parameters: Prisma.AccountUncheckedUpdateInput) => {
    return await repository.update({
      where: { id },
      data: parameters,
    })
  },
  delete: async (id: number) => {
    return repository.delete({
      where: { id },
    })
  },
}