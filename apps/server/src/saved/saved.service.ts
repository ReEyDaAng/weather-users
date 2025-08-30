import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { SaveUserDto } from './saved.dto';

@Injectable()
export class SavedService {
  private supa: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE;

    // Тимчасове логування для діагностики (видали після перевірки)
    console.log('[env] SUPABASE_URL =', url);
    console.log('[env] SERVICE_ROLE length =', key?.length);

    if (!url || !key) {
      throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE is missing');
    }

    this.supa = createClient(url, key, { auth: { persistSession: false } });
  }

  async list() {
    const { data, error } = await this.supa
      .from('saved_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[saved:list]', error);
      throw new InternalServerErrorException(error.message);
    }
    return data;
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
    const { error } = await this.supa.from('saved_users').delete().eq('id', id);
    if (error) {
      console.error('[saved:remove]', error);
      throw new InternalServerErrorException(error.message);
    }
    return { ok: true };
  }
}
