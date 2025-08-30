import { SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

type Row = { id: string; payload: any; created_at: string };

@Injectable()
export class SavedService {
  constructor(private readonly supa: SupabaseClient) {}

  async list() {
    const { data, error } = await this.supa
      .from('saved_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Row[];
  }

  async save(input: { id: string; payload: any }) {
    // ВАЖЛИВО: пишемо саме { id, payload }
    const { error } = await this.supa
      .from('saved_users')
      .upsert({ id: input.id, payload: input.payload });

    if (error) throw error;
    return { ok: true };
  }

  async remove(id: string) {
    const { error } = await this.supa
      .from('saved_users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { ok: true };
  }
}