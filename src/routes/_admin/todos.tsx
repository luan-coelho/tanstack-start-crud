import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/todos')({
  component: RouteComponent,
});

function RouteComponent() {
  return <h2>Todos</h2>;
}
