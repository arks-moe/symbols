### `posts_meta` - Grab posts with posts_meta given a page offset.

```postgresql
create or replace function posts_meta(page int)

returns table(
  post_id bigint,
  title text,
  sar_filename text,
  thumbnail_filename text,
  created_at timestamp with time zone,
  user_id uuid,
  picture text,
  username text
)

language sql

as $$
  select
      id as post_id,
      title,
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
