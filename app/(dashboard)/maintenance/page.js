'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { maintenanceService } from '@/services/maintenanceService';
import { propertyService } from '@/services/propertyService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';
import { Wrench, Plus, Clock, CheckCircle2, AlertTriangle, ArrowRight, Upload, ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

export default function MaintenancePage() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [requests, setRequests] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    propertyId: '',
    priority: 'Medium',
    image: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqRes, propRes] = await Promise.all([
        maintenanceService.getMaintenanceRequests(),
        propertyService.getProperties(),
      ]);
      setRequests(reqRes.requests || []);
      setProperties(propRes.properties || []);
      if (propRes.properties?.length > 0) {
        setCreateData((prev) => ({ ...prev, propertyId: propRes.properties[0]._id }));
      }
    } catch (err) {
      toast.error('Failed to load maintenance requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTicketPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCreateData((prev) => ({ ...prev, image: event.target.result }));
          toast.success('Issue photo attached!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await maintenanceService.createRequest({
        title: createData.title,
        description: createData.description,
        propertyId: createData.propertyId,
        priority: createData.priority,
        images: createData.image ? [createData.image] : [],
      });
      toast.success('Maintenance ticket submitted!');
      setShowCreateModal(false);
      setCreateData({
        title: '',
        description: '',
        propertyId: properties[0]?._id || '',
        priority: 'Medium',
        image: '',
      });
      loadData();
    } catch (err) {
      toast.error('Failed to create maintenance ticket.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Maintenance Ticket Engine</h2>
          <p className="text-xs text-slate-400">7-step work order resolution tracking and technician assignment</p>
        </div>
        {user?.role === 'Tenant' && (
          <Button variant="emerald" size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" /> Submit New Ticket
          </Button>
        )}
      </div>

      {/* Tickets Feed */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading maintenance requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <Card className="text-center py-12">
          <Wrench className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No maintenance tickets found</h4>
          <p className="text-xs text-slate-400 mt-1">Submit a ticket to request repair dispatch.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((ticket) => (
            <Card key={ticket._id} className="hover:border-slate-700 transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-white">{ticket.title}</h4>
                    <Badge status={ticket.status} />
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${ticket.priority === 'Emergency' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'}`}>
                      Priority: {ticket.priority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">{ticket.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>Property: <strong className="text-white">{ticket.propertyId?.title || 'Residential Unit'}</strong></span>
                    <span>Tenant: <strong className="text-white">{ticket.tenantId?.name || 'Resident'}</strong></span>
                    <span>Created: <strong className="text-white">{formatDate(ticket.createdAt)}</strong></span>
                  </div>
                </div>

                <Link href={`/maintenance/${ticket._id}`}>
                  <Button variant="outline" size="sm">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Ticket Modal with File Upload */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Report Maintenance Issue">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label="Ticket Title"
            placeholder="e.g., Leaking kitchen sink pipe"
            value={createData.title}
            onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
            required
          />

          <Select
            label="Select Residence Property"
            value={createData.propertyId}
            onChange={(e) => setCreateData({ ...createData, propertyId: e.target.value })}
            options={properties.map((p) => ({ label: p.title, value: p._id }))}
          />

          <Select
            label="Urgency Priority Level"
            value={createData.priority}
            onChange={(e) => setCreateData({ ...createData, priority: e.target.value })}
            options={['Low', 'Medium', 'High', 'Emergency']}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Detailed Issue Description</label>
            <textarea
              rows={3}
              value={createData.description}
              onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
              placeholder="Describe the issue in detail..."
              className="w-full glass-input rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>

          {/* Maintenance Issue Photo File Upload Dropzone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Attach Issue Photo File</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleTicketPhotoUpload}
              accept="image/*"
              className="hidden"
            />
            {createData.image ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 h-36">
                <img src={createData.image} alt="Issue photo" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setCreateData({ ...createData, image: '' })}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-rose-400 hover:bg-slate-900 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-900/40 p-4 rounded-xl text-center cursor-pointer transition flex items-center justify-center gap-3"
              >
                <Upload className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-slate-300 font-semibold">Upload Photo File from Device</span>
              </div>
            )}
          </div>

          <Button type="submit" variant="emerald" loading={submitting} className="w-full">
            Submit Maintenance Ticket
          </Button>
        </form>
      </Modal>
    </div>
  );
}
