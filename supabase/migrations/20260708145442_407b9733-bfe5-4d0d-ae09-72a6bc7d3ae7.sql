
-- 1) Reviews: hide reviewer user_id from public/authenticated queries via column privileges
REVOKE SELECT ON public.reviews FROM anon, authenticated;
GRANT SELECT (id, rating, comment, destination, visit_date, created_at, updated_at) ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;

-- 2) Storage: drop broad journal-photos read policy (public bucket URLs still work bypassing RLS)
DROP POLICY IF EXISTS "Users can view journal photos" ON storage.objects;

-- 3) Lock down SECURITY DEFINER trigger function from being executable via API
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
