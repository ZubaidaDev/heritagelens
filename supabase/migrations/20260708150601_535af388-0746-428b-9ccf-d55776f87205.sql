DROP POLICY IF EXISTS "Owner can view own journal photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view public journal photos" ON storage.objects;

CREATE POLICY "Owner can view own journal photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'journal-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view public journal photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'journal-photos'
  AND EXISTS (
    SELECT 1 FROM public.journals j
    WHERE j.id::text = (storage.foldername(name))[2]
      AND j.is_public = true
  )
);