import type { AuditLog } from '@/api/types';
import { Badge, Spinner, EmptyState } from '@/components';

interface AuditLogListProps {
  logs: AuditLog[];
  isLoading?: boolean;
  onSelect?: (log: AuditLog) => void;
}

export function AuditLogList({ logs, isLoading, onSelect }: AuditLogListProps) {
  if (isLoading) {
    return (
      <div className="audit-log-list__loading">
        <Spinner />
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        title="No audit logs found"
        description="No activity has been recorded yet, or no logs match your filters."
      />
    );
  }

  return (
    <ul className="audit-log-list">
      {logs.map(log => (
        <li key={log.id} className="audit-log-list__item">
          <button
            type="button"
            className="audit-log-list__button"
            onClick={() => onSelect?.(log)}
          >
            <div className="audit-log-list__header">
              <Badge variant={getEventVariant(log.eventType)}>
                {formatEventType(log.eventType)}
              </Badge>
              <time className="audit-log-list__time" dateTime={log.timestamp}>
                {new Date(log.timestamp).toLocaleString()}
              </time>
            </div>
            <div className="audit-log-list__content">
              <span className="audit-log-list__actor">{log.actorName}</span>
              <span className="audit-log-list__description">
                {getEventDescription(log)}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function formatEventType(eventType: string): string {
  return eventType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getEventVariant(eventType: string) {
  if (eventType.includes('created') || eventType.includes('completed')) {
    return 'success' as const;
  }
  if (eventType.includes('failed') || eventType.includes('rejected')) {
    return 'danger' as const;
  }
  if (eventType.includes('override')) {
    return 'warning' as const;
  }
  return 'info' as const;
}

function getEventDescription(log: AuditLog): string {
  switch (log.eventType) {
    case 'story_created':
      return 'created a new story';
    case 'contributor_added':
      return `added ${log.targetName || 'a contributor'}`;
    case 'contributor_removed':
      return `removed ${log.targetName || 'a contributor'}`;
    case 'split_updated':
      return 'updated royalty splits';
    case 'approval_submitted':
      return 'approved the registration';
    case 'approval_rejected':
      return 'rejected the registration';
    case 'override_applied':
      return `overrode ${log.targetName || 'a contributor'}`;
    case 'registration_initiated':
      return 'initiated on-chain registration';
    case 'registration_completed':
      return 'completed registration';
    case 'registration_failed':
      return 'registration failed';
    default:
      return log.eventType;
  }
}
