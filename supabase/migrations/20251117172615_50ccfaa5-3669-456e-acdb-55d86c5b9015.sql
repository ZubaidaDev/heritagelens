-- Fix 1: Update reviews table RLS policy to restrict access to owners only
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Users can view their own reviews" ON public.reviews
  FOR SELECT
  USING (auth.uid() = user_id);

-- Fix 2: Make journal-photos storage bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'journal-photos';

-- Fix 3: Create proper storage policies for journal-photos bucket
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own journal photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own journal photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own journal photos" ON storage.objects;

-- Create new policies for authenticated user access
CREATE POLICY "Users can view their own journal photos" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'journal-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload their own journal photos" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'journal-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own journal photos" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'journal-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );