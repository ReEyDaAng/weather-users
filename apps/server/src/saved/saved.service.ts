import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import type { AppUser, SavedUser } from '../common/types';

// Точний тип для рядка в таблиці
type SavedRow = {
  id: string;
  payload: AppUser;
  created_at: string;
};

@Injectable()
export class SavedService {
  // локальний клієнт — лишаємо як було, DI не чіпаємо
  private readonly supa = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
  );

  async list(): Promise<SavedUser[]> {
    const { data, error } = await this.supa
      .from('saved_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // кастимо в наш тип, щоб не було any
    return (data ?? []) as SavedRow[];
  }

  async save(user: SavedUser): Promise<{ ok: true }> {
    const { error } = await this.supa
      .from('saved_users')
      .upsert({ id: user.id, payload: user.payload });

    if (error) throw error;
    return { ok: true };
  }

  async remove(id: string): Promise<{ ok: true }> {
    const { error } = await this.supa
      .from('saved_users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { ok: true };
  }
}
