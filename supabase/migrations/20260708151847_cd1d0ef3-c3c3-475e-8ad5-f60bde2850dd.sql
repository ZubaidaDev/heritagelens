CREATE OR REPLACE VIEW public.reviews_public AS
SELECT
  r.id,
  r.rating,
  r.comment,
  r.destination,
  r.visit_date,
  r.created_at,
  r.updated_at,
  p.username
FROM public.reviews r
LEFT JOIN public.profiles p ON p.id = r.user_id;

GRANT SELECT ON public.reviews_public TO anon, authenticated;