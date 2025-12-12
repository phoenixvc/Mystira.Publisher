import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components';
import { AuditLogList, AuditLogFilters, AuditLogDetail, useAuditLogs } from '@/features/AuditTrail';
import type { AuditLog } from '@/api/types';

export function AuditPage() {
  const { logs, isLoading, filters, setFilters, exportLogs } = useAuditLogs();
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  return (
    <div className="page page--audit">
      <header className="page-header">
        <h1>Audit Trail</h1>
        <p>View the complete history of all actions across registered stories.</p>
      </header>

      <Card>
        <CardHeader>
          <h2>Filters</h2>
        </CardHeader>
        <CardBody>
          <AuditLogFilters
            filters={filters}
            onChange={setFilters}
            onExport={exportLogs}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2>Activity Log</h2>
        </CardHeader>
        <CardBody>
          <AuditLogList
            logs={logs}
            isLoading={isLoading}
            onSelect={setSelectedLog}
          />
        </CardBody>
      </Card>

      <AuditLogDetail
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </div>
  );
}
