'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { maintenanceService } from '../../../services/maintenanceService';
import { propertyService } from '../../../services/propertyService';
import { Card } from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Modal from '../../../components/ui/Modal';
import { useAuth } from '../../../context/AuthContext';
import { FiTool, FiPlus, FiArrowRight, FiUpload, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { formatDate } from '../../../lib/utils';

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setCreateData((prev) => ({ ...prev, image: reader.result }));
        toast.success('Ticket photo attached!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!createData.title || !createData.propertyId) {
      return toast.error('Please enter a title and select a property');
    }
    setSubmitting(true);
    try {
      await maintenanceService.createMaintenanceRequest(createData);
      toast.success('Maintenance ticket submitted');
      setShowCreateModal(false);
      setCreateData({ title: '', description: '', propertyId: properties[0]?._id || '', priority: 'Medium', image: '' });
      loadData();
    } catch (err) {
      toast.error('Failed to submit ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3A5F] font-poppins">Maintenance Ticket Engine</h2>
          <p className="text-xs text-[#6B7A90]">7-step work order resolution tracking and technician assignment</p>
        </div>
        {user?.role === 'Tenant' && (
          <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
            <FiPlus className="w-4 h-4" /> Submit New Ticket
          </Button>
        )}
      </div>

      {/* Tickets Feed */}
      {loading ? (
        <div className="py-16 text-center text-[#6B7A90]">
          <div className="w-8 h-8 border-4 border-[#5E8FBF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading maintenance requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <Card className="text-center py-12">
          <FiTool className="w-12 h-12 text-[#5E8FBF] mx-auto mb-3" />
          <h4 className="text-base font-bold text-[#183153] font-poppins">No maintenance tickets found</h4>
          <p className="text-xs text-[#6B7A90] mt-1">Submit a ticket to request repair dispatch.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((ticket) => (
            <Card key={ticket._id}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-[#183153] font-poppins">{ticket.title}</h4>
                    <Badge status={ticket.status} />
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${ticket.priority === 'Emergency' ? 'bg-[#D14343]/10 text-[#D14343] border border-[#D14343]/30' : 'bg-[#EAF3FA] text-[#183153]'}`}>
                      Priority: {ticket.priority}
                    </span>
                  </div>

                  <p className="text-xs text-[#425466] line-clamp-2">{ticket.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#6B7A90] pt-1">
                    <span>Property: <strong className="text-[#183153]">{ticket.propertyId?.title || 'Residential Unit'}</strong></span>
                    <span>Tenant: <strong className="text-[#183153]">{ticket.tenantId?.name || 'Resident'}</strong></span>
                    <span>Created: <strong className="text-[#183153]">{formatDate(ticket.createdAt)}</strong></span>
                  </div>
                </div>

                <Link href={`/maintenance/${ticket._id}`}>
                  <Button variant="outline" size="sm">
                    View Details <FiArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <Modal title="Submit Maintenance Request" onClose={() => setShowCreateModal(false)}>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <Input
              label="Ticket Summary / Issue Title"
              placeholder="e.g., Leaking kitchen sink faucet"
              value={createData.title}
              onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
              required
            />

            <Select
              label="Select Property"
              value={createData.propertyId}
              onChange={(e) => setCreateData({ ...createData, propertyId: e.target.value })}
              options={properties.map((p) => ({ label: p.title, value: p._id }))}
              required
            />

            <Select
              label="Priority Level"
              value={createData.priority}
              onChange={(e) => setCreateData({ ...createData, priority: e.target.value })}
              options={['Low', 'Medium', 'High', 'Emergency']}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#34495E]">Issue Description</label>
              <textarea
                rows={3}
                placeholder="Provide detailed description of the issue..."
                value={createData.description}
                onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
                className="w-full bg-white border-1.5 border-[#C7D7EA] text-[#1F2937] placeholder-[#94A3B8] rounded-[12px] text-xs font-normal p-3 transition focus:outline-none focus:border-[#7AA7D9] focus:ring-4 focus:ring-[#7AA7D9]/20"
              />
            </div>

            {/* Image File Attachment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#34495E]">Attach Photo Proof</label>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleTicketPhotoUpload} className="hidden" />
              {createData.image ? (
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#C7D7EA]">
                  <img src={createData.image} alt="Issue preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setCreateData((prev) => ({ ...prev, image: '' }))}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 rounded-xl border-2 border-dashed border-[#C7D7EA] hover:border-[#5E8FBF] bg-[#EAF3FA]/30 flex flex-col items-center justify-center gap-1 transition text-[#6B7A90] hover:text-[#183153] cursor-pointer"
                >
                  <FiUpload className="w-5 h-5 text-[#5E8FBF]" />
                  <span className="text-xs font-semibold">Click to Attach Photo File</span>
                </button>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={submitting}>Submit Ticket</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
