-- Drop the old restrictive SELECT policy on reviews
DROP POLICY IF EXISTS "Users can view their own reviews" ON reviews;

-- Create new policy that allows everyone to view all reviews (public read)
CREATE POLICY "Anyone can view all reviews"
ON reviews
FOR SELECT
USING (true);