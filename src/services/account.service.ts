import type { Prisma } from "../../generated/prisma/client.ts"
import { AccountRepository } from "../repository/account.repository.ts"

export const AccountService = {
    create: async (parameters: Prisma.AccountUncheckedCreateInput) => {
        const account = await AccountRepository.create(parameters)
        
        return account
    },

    findAll: async (parameters?: Prisma.AccountFindManyArgs) => {
        const accounts = await AccountRepository.findMany(parameters)

        return accounts
    },

    findById: async (id: number, parameters?: Prisma.AccountFindFirstArgs) => {
        const account = await AccountRepository.findById(id, parameters)

        return account
    },

    update: async (id: number, parameters: Prisma.AccountUncheckedUpdateInput) => {
        const account = await AccountRepository.update(id, parameters)

        return account
    },

    delete: async (id: number) => {
        const account = await AccountRepository.delete(id)

        return account
    },
}