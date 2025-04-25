"use client";

import { useState, useEffect } from "react";

type Notification = {
  id: number;
  title: string;
  content: string;
  file: string | null;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Exam Schedule Released",
    content: "The exam schedule for Semester 2 has been released. Check the portal for details.",
    file: null,
    read: false,
  },
  {
    id: 2,
    title: "Assignment Submission",
    content: "Submit your project report by Feb 10.",
    file: "project_guidelines.pdf",
    read: false,
  },
  {
    id: 3,
    title: "Holiday Announcement",
    content: "The institute will remain closed on Feb 15 due to maintenance.",
    file: null,
    read: false,
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNotifications = JSON.parse(localStorage.getItem("notifications") || "null") || initialNotifications;
      setNotifications(savedNotifications);
      updateUnreadCount(savedNotifications);
    }
  }, []);

  const updateUnreadCount = (notifs: Notification[]) => {
    const unread = notifs.filter((notif) => !notif.read).length;
    setUnreadCount(unread);
  };

  const handleReadMore = (id: number) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    if (typeof window !== "undefined") {
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    }
    updateUnreadCount(updatedNotifications);
    setSelectedNotification(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-violet-600 text-white p-4 flex justify-between items-center rounded-md shadow-md">
        <h1 className="text-lg font-semibold">Recent Notifications</h1>
        {unreadCount > 0 && (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
            {unreadCount} Unread
          </span>
        )}
      </nav>

      <div className="w-full max-w-lg mt-6 bg-white p-6 rounded-md shadow-lg border">
        {selectedNotification === null ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 border-b cursor-pointer ${notif.read ? "opacity-60" : "font-semibold"}`}
            >
              <h2 className="text-md">{notif.title}</h2>
              <button
                onClick={() => handleReadMore(notif.id)}
                className="text-violet-600 hover:underline text-sm mt-1"
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          notifications.map((notif) => {
            if (notif.id === selectedNotification) {
              return (
                <div key={notif.id} className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{notif.title}</h2>
                  <p className="mb-4">{notif.content}</p>
                  {notif.file && (
                    <a
                      href={`/${notif.file}`}
                      download
                      className="text-violet-600 hover:underline"
                    >
                      Download {notif.file}
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Back
                  </button>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
