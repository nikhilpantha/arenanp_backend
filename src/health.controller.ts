import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { RedisService } from './redis/redis.service';
import { Public } from './common/decorators/public.decorator';

/**
 * Simple readiness/liveness endpoint. Returns 200 with detailed component
 * status. Kept lightweight on purpose — no @nestjs/terminus dependency.
 */
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async check() {
    const started = Date.now();
    const [db, redis] = await Promise.all([this.pingDb(), this.pingRedis()]);
    const overall = db.status === 'up' && redis.status === 'up' ? 'ok' : 'degraded';

    return {
      status: overall,
      latencyMs: Date.now() - started,
      components: { database: db, redis },
      timestamp: new Date().toISOString(),
    };
  }

  private async pingDb(): Promise<{ status: 'up' | 'down'; error?: string }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'up' };
    } catch (e) {
      return { status: 'down', error: (e as Error).message };
    }
  }

  private async pingRedis(): Promise<{ status: 'up' | 'down'; error?: string }> {
    try {
      const res = await this.redis.raw.ping();
      return res === 'PONG' ? { status: 'up' } : { status: 'down', error: `unexpected: ${res}` };
    } catch (e) {
      return { status: 'down', error: (e as Error).message };
    }
  }
}
