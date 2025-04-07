import { UserList } from '@/components/UserList';

export default function HomePage() {
  return (
    // Basic container with some padding
    <main className="p-4">
      <UserList />
    </main>
  );
}