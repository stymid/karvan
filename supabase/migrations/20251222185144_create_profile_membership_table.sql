-- profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- memberships
create table memberships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null,
  status text not null,
  created_at timestamptz default now()
);

create index on memberships(user_id);