"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase"; // ✅ Supabase client

function Countdown({ targetTime, label }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(targetTime);
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("00d 00h 00m 00s");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="text-sm text-white">
      {label}: <span className="font-semibold">{timeLeft}</span>
    </div>
  );
}

function EventCard({ event, status }) {
  const isLive = status === "live";
  const isUpcoming = status === "upcoming";
  const isEnded = status === "ended";

  const handleClick = (e) => {
    if (!isLive) {
      e.preventDefault();
      if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
      const el = e.currentTarget;
      el.classList.add("animate-shake");
      setTimeout(() => el.classList.remove("animate-shake"), 500);
    }
  };

  const label = isLive ? "Join" : isUpcoming ? "Upcoming" : "Ended";

  return (
    <div className="w-full sm:w-[90%] md:w-[48%] lg:w-[30%] rounded-xl overflow-hidden bg-white/5 backdrop-blur-md shadow-lg">
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image_url})` }}
      />
      <div className="p-4 text-white flex flex-col gap-2 text-sm sm:text-base">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="text-sm text-gray-300">{event.description}</p>
        <div className="flex items-center justify-between mt-2">
          {isUpcoming && <Countdown targetTime={event.start_time} label="Starts in" />}
          {isLive && <Countdown targetTime={event.end_time} label="Ends in" />}
          {isEnded && <div className="text-sm text-white">Event Ended</div>}

          <a
            href={isLive ? event.link : "#"}
            target={isLive ? "_blank" : undefined}
            rel={isLive ? "noopener noreferrer" : undefined}
            onClick={handleClick}
            className={`ml-auto px-4 py-1 text-xs rounded-full border font-medium transition-all duration-200 ${
              isLive
                ? "border-white text-white hover:bg-white/10 active:scale-95"
                : "border-white/20 text-white/50 cursor-default"
            }`}
            style={{ userSelect: "none" }}
          >
            {label}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function EventPage() {
  const [currentTab, setCurrentTab] = useState("live");
  const [events, setEvents] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const PAGE_LIMIT = 6;

  const fetchInitialEvents = async () => {
    const { data, error } = await supabase
      .from("event")
      .select("*")
      .order("start_time", { ascending: true })
      .limit(PAGE_LIMIT);

    if (!error) {
      setEvents(data);
      if (data.length > 0) {
        setLastTimestamp(data[data.length - 1].start_time);
      }
    }
  };

  const loadMoreEvents = async () => {
    if (!lastTimestamp) return;
    setLoadingMore(true);

    const { data, error } = await supabase
      .from("event")
      .select("*")
      .order("start_time", { ascending: true })
      .gt("start_time", lastTimestamp)
      .limit(PAGE_LIMIT);

    if (!error && data.length > 0) {
      setEvents((prev) => [...prev, ...data]);
      setLastTimestamp(data[data.length - 1].start_time);
    }

    setLoadingMore(false);
  };

  useEffect(() => {
    fetchInitialEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    return events.filter((event) => {
      const start = new Date(event.start_time);
      const end = new Date(event.end_time);
      if (currentTab === "live") return start <= now && now <= end;
      if (currentTab === "upcoming") return now < start;
      if (currentTab === "ended") return now > end;
      return false;
    });
  }, [currentTab, events]);

  const emptyMessages = {
    live: "No events are live at the moment.",
    upcoming: "No upcoming events at the moment.",
    ended: "We are waiting for the first event to end.",
  };

  return (
    <div className="relative flex flex-col items-start justify-start min-h-screen w-full max-w-6xl p-4 sm:p-7 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex gap-3 mb-6 pl-4">
        {["live", "upcoming", "ended"].map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              currentTab === tab
                ? "bg-white text-black shadow-md"
                : "bg-white/10 text-white hover:bg-white/20 hover:scale-[1.03]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
          </button>
        ))}
      </div>

      {/* Events */}
      {filteredEvents.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[400px]">
          <p className="text-gray-400 text-lg text-center px-4">
            {emptyMessages[currentTab]}
          </p>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-wrap gap-6 mb-12 justify-center sm:justify-start">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} status={currentTab} />
            ))}
          </div>

          {events.length >= PAGE_LIMIT && (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={loadMoreEvents}
                disabled={loadingMore}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
