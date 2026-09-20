import { prisma } from './prisma'
import type { LogType, Prisma } from '@prisma/client'

export function truncate(value: unknown, max = 200): string {
  const s = String(value)
  return s.length > max ? `${s.slice(0, max)}…` : s
}

export async function log(
  type: LogType,
  message: string,
  opts?: { success?: boolean; ip?: string; meta?: Record<string, unknown> }
) {
  try {
    await prisma.logEntry.create({
      data: {
        type,
        message,
        success: opts?.success ?? true,
        ip: opts?.ip,
        meta: opts?.meta as Prisma.InputJsonValue | undefined,
      },
    })
  } catch (err) {
    console.error('Échec de l\'écriture du log', err)
  }
}
