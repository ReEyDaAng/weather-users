import { createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

export interface SavedUser {
  id: string;
  payload: any;
  created_at?: string;
}

@Injectable()
export class SavedService {
  private supa = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  async list() {
    const { data, error } = await this.supa
      .from('saved_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as SavedUser[];
  }

    async save(user: SavedUser) {
    const { error } = await this.supa
        .from('saved_users')
        .upsert({ id: user.id, payload: user.payload }, { onConflict: 'id' }); // ← додано

    if (error) throw error;
    return { ok: true };
    }


  async remove(id: string) {
    const { error } = await this.supa.from('saved_users').delete().eq('id', id);
    if (error) throw error;
    return { ok: true };
  }
}
