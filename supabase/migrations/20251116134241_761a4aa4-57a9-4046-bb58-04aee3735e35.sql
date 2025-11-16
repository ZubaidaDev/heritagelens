-- Create profiles for existing auth users that don't have profiles yet
INSERT INTO public.profiles (id, username)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'username', 'user_' || substring(au.id::text, 1, 8))
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing foreign key on reviews if it exists
ALTER TABLE public.reviews
DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;

-- Add foreign key from reviews to profiles
ALTER TABLE public.reviews
ADD CONSTRAINT reviews_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- Drop existing foreign key on journals
ALTER TABLE public.journals
DROP CONSTRAINT IF EXISTS journals_user_id_fkey;

-- Add foreign key from journals to profiles
ALTER TABLE public.journals
ADD CONSTRAINT journals_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;