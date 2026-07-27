'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { maintenanceService } from '../../../../services/maintenanceService';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';
import { useAuth } from '../../../../context/AuthContext';
import { ArrowLeft, Wrench, CheckCircle2, Clock, MessageSquare, Send, AlertTriangle, ShieldCheck } from 'lucide-react';
import { formatDate } from '../../../../lib/utils';
import toast from 'react-hot-toast';

export default function MaintenanceDetailPage({ params }) {
  const resolvedParams = React.use(Promise.resolve(params));
  const id = resolvedParams?.id;
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [noteText, setNoteText] = useState('');
  const [updating, setUpdating] = useState(false);

  const steps = ['Pending', 'Accepted', 'Assigned', 'In Progress', 'Completed'];

  const loadTicket = () => {
    maintenanceService
      .getMaintenanceById(id)
      .then((res) => {
        setTicket(res.request);
        setNewStatus(res.request?.status || '');
      })
      .catch(() => toast.error('Failed to load ticket details'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTicket();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await maintenanceService.updateStatus(id, {
        status: newStatus,
        noteText: noteText.trim() ? noteText : undefined,
      });
      toast.success('Ticket status updated!');
      setNoteText('');
      loadTicket();
    } catch (err) {
      toast.error('Failed to update ticket.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold">Loading ticket details...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-bold text-white">Ticket Not Found</h3>
        <Link href="/maintenance">
          <Button variant="outline" size="sm" className="mt-4">
            Back to Maintenance
          </Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = steps.indexOf(ticket.status);

  return (
    <div className="space-y-6">
      <Link href="/maintenance" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Back to Tickets Queue
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white">{ticket.title}</h2>
            <Badge status={ticket.status} />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Submitted by <strong className="text-white">{ticket.tenantId?.name}</strong> for <strong className="text-blue-400">{ticket.propertyId?.title}</strong>
          </p>
        </div>

        <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${ticket.priority === 'Emergency' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
          Priority: {ticket.priority}
        </span>
      </div>

      {/* 7-Step Progress Stepper Visualizer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Resolution Lifecycle Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between relative py-4">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
            {steps.map((step, idx) => {
              const isCompletedStep = currentStepIndex >= idx;
              const isCurrentStep = ticket.status === step;
              return (
                <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrentStep
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 scale-110'
                        : isCompletedStep
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {isCompletedStep ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className={`text-[11px] font-semibold ${isCurrentStep ? 'text-blue-400' : isCompletedStep ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Ticket Description & Attachment Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details & Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">{ticket.description}</p>
              {ticket.images?.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {ticket.images.map((img, idx) => (
                    <img key={idx} src={img} alt="Attachment" className="rounded-xl h-44 w-full object-cover border border-slate-800" />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Notes Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Status Activity & Technician Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {ticket.notes?.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No notes recorded yet.</p>
                ) : (
                  ticket.notes?.map((note, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{note.authorName} <span className="text-[10px] text-blue-400 font-semibold">({note.authorRole})</span></span>
                        <span className="text-[10px] text-slate-500">{formatDate(note.createdAt)}</span>
                      </div>
                      <p className="text-xs text-slate-300">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Update Control Panel */}
        <div className="space-y-6">
          {(user?.role === 'Property Owner' || user?.role === 'Maintenance Staff' || user?.role === 'Admin') && (
            <Card>
              <CardHeader>
                <CardTitle>Advance Status Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <Select
                    label="Update Ticket Status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    options={['Pending', 'Accepted', 'Assigned', 'In Progress', 'Completed', 'Rejected', 'Cancelled']}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Add Activity Note</label>
                    <textarea
                      rows={3}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="e.g., Parts ordered, work scheduled..."
                      className="w-full glass-input rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <Button type="submit" variant="primary" loading={updating} className="w-full">
                    Save Status Update
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Assigned Staff</CardTitle>
            </CardHeader>
            <CardContent>
              {ticket.assignedStaffId ? (
                <div className="flex items-center gap-3">
                  <img src={ticket.assignedStaffId.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'} alt="" className="w-10 h-10 rounded-full object-cover border border-blue-500/40" />
                  <div>
                    <h5 className="text-xs font-bold text-white">{ticket.assignedStaffId.name}</h5>
                    <p className="text-[10px] text-blue-400">{ticket.assignedStaffId.email}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Technician not yet assigned.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
