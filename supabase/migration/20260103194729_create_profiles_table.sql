-- ===============================
-- profiles table
-- ===============================

-- enum for work status
create type work_status as enum (
  'open_to_work',
  'busy',
  'inactive',
  'resting'
);

-- profiles table
create table profiles (
  id uuid primary key
    references auth.users(id)
    on delete cascade,

  username text unique,
  first_name text,
  last_name text,

  avatar_url text,
  biography text,
  phone text,
  birth_date date,

  work_status work_status default 'inactive',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- auto-update updated_at
create or replace function update_profiles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
before update on profiles
for each row
execute procedure update_profiles_updated_at();