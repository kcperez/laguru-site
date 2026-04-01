"use client";

import { useState } from "react";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  source: string;
  created_at: string;
}

interface WallMessage {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [wallMessages, setWallMessages] = useState<WallMessage[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/subscribers", {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (!res.ok) {
        setError("Wrong password.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setSubscribers(data.subscribers || []);
      setCount(data.count || 0);

      const wallRes = await fetch("/api/wall");
      const wallData = await wallRes.json();
      setWallMessages(wallData.messages || []);

      setAuthed(true);
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  }

  async function handleDeleteMessage(id: string) {
    const res = await fetch("/api/wall", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setWallMessages(wallMessages.filter((m) => m.id !== id));
    }
  }

  async function handleExport() {
    const res = await fetch("/api/admin/export", {
      headers: { Authorization: `Bearer ${password}` },
    });

    if (!res.ok) return;

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laguru-subscribers.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-text-bright mb-8">Admin</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary text-sm outline-none focus:border-accent mb-4"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Log In"}
          </button>
          {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
        </form>
      </div>
    );
  }

  const landingCount = subscribers.filter((s) => s.source === "landing").length;
  const docCount = subscribers.filter((s) => s.source === "documentary").length;

  return (
    <div className="min-h-screen bg-bg px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-text-bright">Subscribers</h1>
          <button
            onClick={handleExport}
            className="px-6 py-2 rounded-lg bg-bg-card border border-border text-text-primary text-sm font-medium hover:border-accent transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <p className="text-text-dim text-xs font-medium tracking-wide uppercase mb-1">
              Total
            </p>
            <p className="text-2xl font-bold text-text-bright">{count}</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <p className="text-text-dim text-xs font-medium tracking-wide uppercase mb-1">
              Landing Page
            </p>
            <p className="text-2xl font-bold text-text-bright">{landingCount}</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-5">
            <p className="text-text-dim text-xs font-medium tracking-wide uppercase mb-1">
              Documentary
            </p>
            <p className="text-2xl font-bold text-text-bright">{docCount}</p>
          </div>
        </div>

        {/* Table */}
        {subscribers.length === 0 ? (
          <div className="bg-bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-text-dim text-sm">No subscribers yet.</p>
          </div>
        ) : (
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Email
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Source
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-border last:border-b-0 hover:bg-bg-card-alt transition-colors"
                    >
                      <td className="px-5 py-3 text-sm text-text-primary">
                        {sub.name}
                      </td>
                      <td className="px-5 py-3 text-sm text-text-dim">
                        {sub.email}
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-text-dim">
                          {sub.source}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-text-dim">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Wall Messages */}
        <div className="flex items-center justify-between mt-12 mb-6">
          <h2 className="text-xl font-bold text-text-bright">Wall Messages</h2>
          <span className="text-text-dim text-sm">{wallMessages.length} messages</span>
        </div>

        {wallMessages.length === 0 ? (
          <div className="bg-bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-text-dim text-sm">No wall messages yet.</p>
          </div>
        ) : (
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Message
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Date
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-text-dim uppercase tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wallMessages.map((msg) => (
                    <tr
                      key={msg.id}
                      className="border-b border-border last:border-b-0 hover:bg-bg-card-alt transition-colors"
                    >
                      <td className="px-5 py-3 text-sm text-text-primary">
                        {msg.name}
                      </td>
                      <td className="px-5 py-3 text-sm text-text-dim max-w-xs truncate">
                        {msg.message}
                      </td>
                      <td className="px-5 py-3 text-sm text-text-dim">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-red-400/60 hover:text-red-400 text-xs font-semibold tracking-wide uppercase transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
