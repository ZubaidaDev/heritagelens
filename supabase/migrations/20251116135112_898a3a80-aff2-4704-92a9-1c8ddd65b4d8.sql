-- Enable realtime for reviews table
ALTER TABLE public.reviews REPLICA IDENTITY FULL;

-- The table is already in the supabase_realtime publication by default