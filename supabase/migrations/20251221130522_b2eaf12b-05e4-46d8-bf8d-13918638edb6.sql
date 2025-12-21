-- Make the journal-photos bucket public so images can be accessed
UPDATE storage.buckets SET public = true WHERE id = 'journal-photos';