// server/src/saved/saved.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import type { SaveUserDto } from './saved.dto';

type Row = { id: string; payload: unknown; created_at: string };

@Injectable()
export class SavedService {
  private supa = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
    {
      // service_role – без сесій
      auth: { persistSession: false },
      // на всякий випадок фіксуємо схему:
      db: { schema: 'public' },
    }
  );

  async list() {
    const { data, error } = await this.supa
      .from('saved_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[saved:list]', error); // ← побачимо точну причину в Railway Logs
      throw new InternalServerErrorException(error.message);
    }
    return data as Row[];
  }

  async save(user: SaveUserDto) {
    const { error } = await this.supa
      .from('saved_users')
      .upsert({ id: user.id, payload: user.payload });

    if (error) {
      console.error('[saved:save]', error);
      throw new InternalServerErrorException(error.message);
    }
    return { ok: true };
  }

  async remove(id: string) {
    const { error } = await this.supa
      .from('saved_users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[saved:remove]', error);
      throw new InternalServerErrorException(error.message);
    }
    return { ok: true };
  }
}
