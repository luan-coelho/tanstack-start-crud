import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1>Hello world!</h1>;
}
