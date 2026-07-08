DROP VIEW IF EXISTS public.reviews_public;

CREATE OR REPLACE FUNCTION public.get_reviews_with_username(_destination text DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  rating int,
  comment text,
  destination text,
  visit_date date,
  created_at timestamptz,
  updated_at timestamptz,
  username text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.id, r.rating, r.comment, r.destination, r.visit_date, r.created_at, r.updated_at, p.username
  FROM public.reviews r
  LEFT JOIN public.profiles p ON p.id = r.user_id
  WHERE (_destination IS NULL OR r.destination = _destination)
  ORDER BY r.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.get_reviews_with_username(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_reviews_with_username(text) TO anon, authenticated;