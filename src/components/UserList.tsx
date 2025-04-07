import { Accordion } from '@/components/ui/accordion';
import { UserItem } from './UserItem';
import type { User } from '@/types/user'; 

interface UserListProps {
  users: User[];
}

export function UserList({ users}: UserListProps) {
  return (
    <Accordion type="single" collapsible className="w-full border rounded-md"> 
      {users.map((user) => (
        // Pass the full user object to UserItem
        <UserItem key={user.id} user={user} />
      ))}
    </Accordion>
  );
}