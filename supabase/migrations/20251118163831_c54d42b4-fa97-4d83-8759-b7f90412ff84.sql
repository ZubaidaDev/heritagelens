-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Users can view photos of their own journals" ON journal_photos;

-- Create new policy that allows viewing photos from public journals OR own journals
CREATE POLICY "Users can view photos of public or own journals"
ON journal_photos
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM journals
    WHERE journals.id = journal_photos.journal_id
    AND (journals.is_public = true OR journals.user_id = auth.uid())
  )
);