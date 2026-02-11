import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockCampaigns } from '../utils/mockData';
import { MoreVertical, Play, Pause, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Modal from '../components/Common/Modal';

const SortableCampaignCard = ({ campaign, onViewDetails }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: campaign.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const statusIcons = {
    active: Play,
    paused: Pause,
    completed: CheckCircle
  };

  const StatusIcon = statusIcons[campaign.status] || Clock;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="campaign-card"
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="campaign-card-header">
        <div className="campaign-title-section">
          <StatusIcon 
            size={20} 
            className={`status-icon status-${campaign.status}`}
          />
          <h3>{campaign.name}</h3>
        </div>
        <button className="campaign-menu-btn">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="campaign-stats">
        <div className="campaign-stat-item">
          <span className="stat-label">Budget</span>
          <span className="stat-value">${campaign.budget.toLocaleString()}</span>
        </div>
        <div className="campaign-stat-item">
          <span className="stat-label">Spent</span>
          <span className="stat-value">${campaign.spent.toLocaleString()}</span>
        </div>
        <div className="campaign-stat-item">
          <span className="stat-label">Conversions</span>
          <span className="stat-value">{campaign.conversions}</span>
        </div>
      </div>

      <div className="campaign-progress-section">
        <div className="progress-header">
          <span>Budget Usage</span>
          <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="campaign-footer">
        <span className={`status-badge status-${campaign.status}`}>
          {campaign.status}
        </span>
        <button 
          className="view-details-btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(campaign);
          }}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCampaigns((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="campaigns-page">
      <div className="page-header">
        <div>
          <h1>Campaigns</h1>
          <p>Manage your marketing campaigns</p>
        </div>
        <button className="btn btn-primary">
          Create Campaign
        </button>
      </div>

      <div className="campaigns-stats">
        <div className="campaign-stat-summary">
          <div className="summary-item">
            <span className="summary-label">Total Campaigns</span>
            <span className="summary-value">{campaigns.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Active</span>
            <span className="summary-value">{campaigns.filter(c => c.status === 'active').length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Budget</span>
            <span className="summary-value">
              ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Spent</span>
            <span className="summary-value">
              ${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={campaigns.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="campaigns-grid">
            <AnimatePresence>
              {campaigns.map((campaign) => (
                <SortableCampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onViewDetails={setSelectedCampaign}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <Modal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        title={selectedCampaign?.name}
        size="large"
      >
        {selectedCampaign && (
          <div className="campaign-details">
            <div className="detail-section">
              <h3>Overview</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value status-badge status-${selectedCampaign.status}`}>
                    {selectedCampaign.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Budget</span>
                  <span className="detail-value">${selectedCampaign.budget.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Spent</span>
                  <span className="detail-value">${selectedCampaign.spent.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Remaining</span>
                  <span className="detail-value">
                    ${(selectedCampaign.budget - selectedCampaign.spent).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Performance</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Impressions</span>
                  <span className="detail-value">{selectedCampaign.impressions.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Clicks</span>
                  <span className="detail-value">{selectedCampaign.clicks.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Conversions</span>
                  <span className="detail-value">{selectedCampaign.conversions.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">CTR</span>
                  <span className="detail-value">
                    {((selectedCampaign.clicks / selectedCampaign.impressions) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Timeline</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Start Date</span>
                  <span className="detail-value">{selectedCampaign.startDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">End Date</span>
                  <span className="detail-value">{selectedCampaign.endDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Campaigns;
