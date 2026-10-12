import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, RefreshCw, Lock, UserCheck, ArrowLeft, Trash2, Download } from 'lucide-react';

const Admin = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'shubham@123') {
      setIsAuthenticated(true);
      setErrorMsg('');
      fetchInquiries();
    } else {
      setErrorMsg('Incorrect Password! Try again.');
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://anchor-shubham-atre.onrender.com/api/inquiries');
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`https://anchor-shubham-atre.onrender.com/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete lead #${id}?`)) return;
    try {
      const res = await fetch(`https://anchor-shubham-atre.onrender.com/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete inquiry', err);
    }
  };

  const downloadCSV = () => {
    if (inquiries.length === 0) return alert('No data available to export');

    const headers = ['ID', 'Name', 'Phone', 'Event Type', 'Event Date', 'Message', 'Status', 'Date Added'];
    const rows = inquiries.map(item => [
      item.id,
      `"${item.name || ''}"`,
      `"${item.phone || ''}"`,
      `"${item.event_type || ''}"`,
      `"${item.event_date || ''}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`,
      `"${item.status || 'New'}"`,
      `"${item.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_anchor_shubham_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Anchor Shubham Admin</h2>
          <p className="text-slate-400 text-sm mb-6">Enter secret passcode to view leads</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
            />
            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all"
            >
              Access Dashboard
            </button>
          </form>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="mt-6 text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <UserCheck className="text-amber-400" /> Inquiries Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">Total Leads: {inquiries.length}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow"
            >
              <Download className="w-4 h-4" /> Export CSV / Excel
            </button>
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                Go to Website
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Event Type</th>
                  <th className="px-6 py-4">Event Date</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-slate-500">
                      No inquiries found in database.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => {
                    const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                    const currentStatus = inq.status || 'New';

                    const statusColor =
                      currentStatus === 'Booked' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                        currentStatus === 'Contacted' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                          'bg-sky-500/20 text-sky-400 border-sky-500/40';

                    return (
                      <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-500">#{inq.id}</td>
                        <td className="px-6 py-4">
                          <select
                            value={currentStatus}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border bg-slate-950 cursor-pointer focus:outline-none ${statusColor}`}
                          >
                            <option value="New" className="bg-slate-900 text-sky-400">New</option>
                            <option value="Contacted" className="bg-slate-900 text-amber-400">Contacted</option>
                            <option value="Booked" className="bg-slate-900 text-emerald-400">Booked</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">{inq.name}</td>
                        <td className="px-6 py-4 text-amber-300 font-mono">{inq.phone}</td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-xs border border-slate-700">
                            {inq.event_type || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{inq.event_date || 'N/A'}</td>
                        <td className="px-6 py-4 text-slate-400 max-w-xs truncate" title={inq.message}>
                          {inq.message || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <a
                              href={`tel:${cleanPhone}`}
                              className="p-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-lg text-amber-400 border border-slate-700 transition-colors"
                              title="Call Client"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                            <a
                              href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20Anchor%20Shubham%20Atre!`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 rounded-lg text-emerald-400 border border-slate-700 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="p-2 bg-slate-800 hover:bg-red-500 hover:text-white rounded-lg text-red-400 border border-slate-700 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
