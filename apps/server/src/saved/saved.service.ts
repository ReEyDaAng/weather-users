import { createClient } from '@supabase/supabase-js';


export interface SavedUser {
id: string; // randomuser uuid
payload: any; // full user json
created_at?: string;
}


export class SavedService {
private supa = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE!, // server-only
);


async list() {
const { data, error } = await this.supa.from('saved_users').select('*').order('created_at', { ascending: false });
if (error) throw error;
return data as SavedUser[];
}


async save(user: SavedUser) {
const { error } = await this.supa.from('saved_users').upsert({ id: user.id, payload: user.payload });
if (error) throw error;
return { ok: true };
}


async remove(id: string) {
const { error } = await this.supa.from('saved_users').delete().eq('id', id);
if (error) throw error;
return { ok: true };
}
}