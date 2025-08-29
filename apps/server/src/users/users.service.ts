import fetch from 'node-fetch';


export class UsersService {
async fetchUsers(page = 1, results = 12, seed = 'demo') {
const url = new URL('https://randomuser.me/api/');
url.searchParams.set('page', String(page));
url.searchParams.set('results', String(results));
url.searchParams.set('seed', seed);


const res = await fetch(url);
if (!res.ok) throw new Error('RandomUser fetch failed');
return res.json();
}
}