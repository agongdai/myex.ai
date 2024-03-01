'use server';
import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewExchange } from '@myex/types/exchange';

export async function myexCreateExchange({ exchangeId, apiKey, apiSecret }: IFormNewExchange) {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingExchange = await prisma.exchange.findFirst({
    where: {
      exchangeId,
      userMyexId,
    },
  });

  const updatedExchange = await prisma.exchange.upsert({
    where: {
      myexId: existingExchange?.myexId || 0,
    },
    update: {
      apiKey,
      apiSecret,
    },
    create: {
      exchangeId,
      apiKey,
      apiSecret,
      userMyexId,
    },
  });

  return apiSuccess(updatedExchange);
}
