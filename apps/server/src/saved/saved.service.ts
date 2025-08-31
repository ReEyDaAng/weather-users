import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import type { SaveUserDto } from './saved.dto';

type Row = { id: string; payload: unknown; created_at: string };

// service_role вставлений як константа, бо у railway проблема зі считуванням ключа
const SUPABASE_SERVICE_ROLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1Z2RneXdqb3ZwZnNhcmlqYmpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjQ2MDU5NiwiZXhwIjoyMDcyMDM2NTk2fQ.wgnebe7xdxt_bpenlW95I54stPQ_7YjSRiFHBb9k8PA';

@Injectable()
export class SavedService {
  private supa = createClient(
    (process.env.SUPABASE_URL ?? '').trim(),
    (SUPABASE_SERVICE_ROLE ?? '').trim(),
    { auth: { persistSession: false }, db: { schema: 'public' } },
  );

  async list() {
    const { data, error } = await this.supa
      .from('saved_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[saved:list]', error);
      throw new InternalServerErrorException(error.message);
    }
    return data as Row[];
  }

  async save(user: SaveUserDto) {
    const { data: existing, error: selErr } = await this.supa
      .from('saved_users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (selErr && selErr.code !== 'PGRST116') {
      // PGRST116 = no rows found
      console.error('[saved:check]', selErr);
      throw new InternalServerErrorException(selErr.message);
    }

    if (existing) {
      return { ok: false, reason: 'already' };
    }

    const { error } = await this.supa
      .from('saved_users')
      .insert({ id: user.id, payload: user.payload });

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
