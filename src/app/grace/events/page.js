"use client";

import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("event")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImageFile(file);
  };

  const addEvent = async () => {
    if (!newTitle || !newDate || !newLink || !newImageFile) return;

    try {
      setUploading(true);

      // ✅ Upload image with correct path (NO double folder issue)
      const filename = `${uuid()}-${newImageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(filename, newImageFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: newImageFile.type,
        });

      if (uploadError) throw uploadError;

      // ✅ Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("event-images").getPublicUrl(filename);

      // ✅ Insert event data
      const { error: insertError } = await supabase.from("event").insert([
        {
          title: newTitle,
          description: newDescription,
          link: newLink,
          date: newDate,
          start_time: newDate + "T00:00:00",
          end_time: newDate + "T23:59:59",
          image_url: publicUrl,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      // Reset
      setNewTitle("");
      setNewDate("");
      setNewDescription("");
      setNewLink("");
      setNewImageFile(null);
      setUploading(false);
      fetchEvents();
    } catch (err) {
      console.error("Error uploading event:", err.message || err);
      setUploading(false);
    }
  };

  const removeEvent = async (id) => {
    await supabase.from("event").delete().eq("id", id);
    fetchEvents();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📅 Grace Event Manager</h1>

      {/* Add Event Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Event Title"
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="date"
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white file:text-white file:border-none file:bg-purple-600 file:px-3 file:py-1"
        />
        <input
          type="text"
          placeholder="Join Now Link"
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <textarea
          placeholder="Description"
          rows={3}
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white sm:col-span-2"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          onClick={addEvent}
          disabled={uploading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-semibold sm:col-span-2 justify-center"
        >
          {uploading ? "Uploading..." : <><FaPlus size={12} /> Add Event</>}
        </button>
      </div>

      {/* Event List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white/5 border border-white/10 rounded-lg"
          >
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-sm text-white/60 mb-1">{event.date}</p>
            <p className="text-sm text-white/80 mb-3">{event.description}</p>
            <div className="flex justify-between items-center">
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-400 hover:underline"
              >
                Join Now →
              </a>
              <button
                onClick={() => removeEvent(event.id)}
                className="text-red-400 hover:text-red-600"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
