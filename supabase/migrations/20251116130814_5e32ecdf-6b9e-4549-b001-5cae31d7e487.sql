-- Create journals table
CREATE TABLE public.journals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  location TEXT,
  visit_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;

-- Create policies for journals
CREATE POLICY "Users can view their own journals" 
ON public.journals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own journals" 
ON public.journals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals" 
ON public.journals 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals" 
ON public.journals 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create journal_photos table to track uploaded images
CREATE TABLE public.journal_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  journal_id UUID NOT NULL REFERENCES public.journals(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for journal_photos
ALTER TABLE public.journal_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for journal_photos
CREATE POLICY "Users can view photos of their own journals" 
ON public.journal_photos 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.journals 
    WHERE journals.id = journal_photos.journal_id 
    AND journals.user_id = auth.uid()
  )
);

CREATE POLICY "Users can add photos to their own journals" 
ON public.journal_photos 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.journals 
    WHERE journals.id = journal_photos.journal_id 
    AND journals.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete photos from their own journals" 
ON public.journal_photos 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.journals 
    WHERE journals.id = journal_photos.journal_id 
    AND journals.user_id = auth.uid()
  )
);

-- Create storage bucket for journal photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('journal-photos', 'journal-photos', true);

-- Create storage policies for journal photos
CREATE POLICY "Users can view journal photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'journal-photos');

CREATE POLICY "Users can upload their own journal photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'journal-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own journal photos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'journal-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own journal photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'journal-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_journals_updated_at
BEFORE UPDATE ON public.journals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();