-- Historique des conversations avec l'assistant virtuel du site (chat "Léa")
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  page_source text
);

create index chat_messages_session_created_idx
  on public.chat_messages (session_id, created_at);

alter table public.chat_messages enable row level security;

-- Le widget de chat (via la fonction serveur) peut enregistrer les messages
create policy "chat peut enregistrer ses messages"
  on public.chat_messages for insert
  to anon
  with check (true);

-- Seul un compte connecté (toi, dans /admin) peut relire les conversations
create policy "admin peut lire les conversations"
  on public.chat_messages for select
  to authenticated
  using (true);

-- Compte le nombre de messages d'une session sur la dernière heure, sans
-- exposer le contenu des messages à la clé publique (anon) : sert uniquement
-- à limiter les abus (anti-spam) depuis la fonction serveur du chat.
create or replace function public.chat_message_count_last_hour(p_session_id text)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer
  from public.chat_messages
  where session_id = p_session_id
    and created_at > now() - interval '1 hour';
$$;

grant execute on function public.chat_message_count_last_hour(text) to anon;
