import { supabase } from "./supabase";

export async function uploadEventImage(file) {
  const filename = `${crypto.randomUUID()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("event-images")
    .upload(filename, file);

  if (error) throw new Error("Upload failed");

  const publicUrl = supabase.storage
    .from("event-images")
    .getPublicUrl(data.path).data.publicUrl;

  return publicUrl;
}

export async function saveEventToDatabase(event) {
  const { data, error } = await supabase
    .from("event")
    .insert([event]);

  if (error) throw new Error("Failed to save event");

  return data;
}
