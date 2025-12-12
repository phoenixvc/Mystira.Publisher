import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components';
import { Layout } from './Layout';
import {
  HomePage,
  LoginPage,
  DashboardPage,
  StoriesPage,
  StoryDetailPage,
  RegisterPage,
  AuditPage,
  NotFoundPage,
} from '@/pages';
import { ProtectedRoute } from './ProtectedRoute';

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:id" element={<StoryDetailPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/audit" element={<AuditPage />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
