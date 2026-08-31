-- Réservations créées depuis le formulaire du site
create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null,
  email text not null,
  telephone text not null,
  adresse text not null,
  date_souhaitee date,
  creneau text,
  vehicules jsonb not null default '[]'::jsonb,
  total_estime numeric not null default 0,
  statut text not null default 'en_attente'
    check (statut in ('en_attente', 'confirmee', 'terminee', 'annulee'))
);

alter table public.reservations enable row level security;

-- Le formulaire public du site peut créer une réservation
create policy "public peut creer une reservation"
  on public.reservations for insert
  to anon
  with check (true);

-- Seul un compte connecté (toi) peut consulter/modifier/supprimer
create policy "admin peut tout lire"
  on public.reservations for select
  to authenticated
  using (true);

create policy "admin peut tout modifier"
  on public.reservations for update
  to authenticated
  using (true);

create policy "admin peut tout supprimer"
  on public.reservations for delete
  to authenticated
  using (true);

-- Numérotation séquentielle des factures (obligatoire légalement, sans trou)
create sequence public.facture_numero_seq start 1;

create or replace function public.next_facture_numero()
returns text
language plpgsql
as $$
declare
  next_val bigint;
begin
  next_val := nextval('public.facture_numero_seq');
  return 'FA-' || to_char(now(), 'YYYY') || '-' || lpad(next_val::text, 4, '0');
end;
$$;

-- Factures, liées à une réservation du site ou saisies manuellement
create table public.factures (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  numero text not null unique default public.next_facture_numero(),
  reservation_id uuid references public.reservations(id),
  client_nom text not null,
  client_email text not null,
  client_adresse text,
  client_telephone text,
  lignes jsonb not null default '[]'::jsonb,
  montant_total numeric not null default 0,
  date_prestation date,
  envoyee_le timestamptz
);

alter table public.factures enable row level security;

-- Uniquement toi (connecté) peux créer/lire/modifier des factures
create policy "admin gere les factures"
  on public.factures for all
  to authenticated
  using (true)
  with check (true);
