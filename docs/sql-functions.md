### `posts_meta` - Grab posts with posts_meta given a page offset.

```postgresql

create or replace function posts_meta(page int)

returns table(
  post_id bigint,
  title text,
  ingame_name text,
  ingame_sound_id integer,
  ingame_layer_count integer,
  sar_filename text,
  thumbnail_filename text,
  created_at timestamp with time zone,
  user_id uuid,
  picture text,
  username text
)

language sql

security definer

as $$

  select
      id as post_id,
      title,
      ingame_name,
      ingame_sound_id,
      ingame_layer_count,
      sar_filename,
      thumbnail_filename,
      created_at,
      user_id,
      picture,
      username
  from posts
  join users_meta() using (user_id)
  order by created_at desc
  offset page * 20
  limit 20;

$$;

```

```postgresql

create or replace function users_meta()

returns table(
  user_id uuid,
  picture text,
  username text
)

language sql


as $$

select
    id as user_id,
    raw_user_meta_data ->> 'picture' as picture,
    raw_user_meta_data ->> 'preferred_username' as username
from auth.users;

$$;

```

```postgresql

create or replace function posts_meta_single(id_of_post bigint)

returns table(
  post_id bigint,
  title text,
  ingame_name text,
  ingame_sound_id integer,
  ingame_layer_count integer,
  sar_filename text,
  thumbnail_filename text,
  created_at timestamp with time zone,
  user_id uuid,
  picture text,
  username text
)

language sql

security definer

as $$

  select
      id as post_id,
      title,
      ingame_name,
      ingame_sound_id,
      ingame_layer_count,
      sar_filename,
      thumbnail_filename,
      created_at,
      user_id,
      picture,
      username
  from posts
  join users_meta() using (user_id)
  where id = id_of_post

$$;

```

```postgresql
create or replace function posts_meta_from_user(page int, from_user_id uuid)

returns table(
  post_id bigint,
  title text,
  ingame_name text,
  ingame_sound_id integer,
  ingame_layer_count integer,
  sar_filename text,
  thumbnail_filename text,
  created_at timestamp with time zone,
  user_id uuid,
  picture text,
  username text
)

language sql

security definer

as $$

  select
      id as post_id,
      title,
      ingame_name,
      ingame_sound_id,
      ingame_layer_count,
      sar_filename,
      thumbnail_filename,
      created_at,
      user_id,
      picture,
      username
  from posts
  join users_meta() using (user_id)
  where user_id = from_user_id
  order by created_at desc
  offset page * 20
  limit 20;

$$;
```
