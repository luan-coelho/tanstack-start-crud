import { AppLayout } from '@/components/layout/app-layout';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
