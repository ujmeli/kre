import {getChatGPTUser} from '../../chatgpt-auth';
import {getDb} from '../../../db';
import {records} from '../../../db/schema';
import {eq} from 'drizzle-orm';
export async function GET(){const u=await getChatGPTUser();if(!u)return Response.json({error:'Bejelentkezés szükséges'},{status:401});const rows=await getDb().select().from(records).where(eq(records.userId,u.userId));return Response.json({state:rows[0]?JSON.parse(rows[0].payload):null,name:u.fullName||''});}
export async function PUT(r:Request){const u=await getChatGPTUser();if(!u)return Response.json({error:'Bejelentkezés szükséges'},{status:401});const raw=await r.text();if(raw.length>200000)return Response.json({error:'Túl nagy adat'},{status:413});try{const v=JSON.parse(raw);if(!Array.isArray(v.dogs)||!v.sessions||typeof v.sessions!=='object')throw Error();await getDb().insert(records).values({userId:u.userId,payload:raw}).onConflictDoUpdate({target:records.userId,set:{payload:raw}});return Response.json({ok:true});}catch{return Response.json({error:'Érvénytelen adat'},{status:400});}}
export async function DELETE(){const u=await getChatGPTUser();if(!u)return new Response(null,{status:401});await getDb().delete(records).where(eq(records.userId,u.userId));return Response.json({ok:true});}
