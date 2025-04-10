import { SearchBar } from '@/components/SearchBar';
import { UserList } from '@/components/UserList';
import { Button } from '@/components/ui/button';
import { fetchUsers } from '@/lib/fetchUsers'; 
import type { User } from '@/types/user'; 

// Entire homepage is async here so we can use await
// Making the Page component `async` allows us to `await` data fetching directly.
// Removes need to use useState or useEffect 
export default async function HomePage() {
  let users: User[] = []; // Initialize with empty array

  try {
    users = await fetchUsers();
  } catch (error) {

    // Error handling 
    console.error("Error fetching users for page:", error);
    return (
       <main className="p-4 max-w-2xl mx-auto text-center">
         <h1 className="text-xl font-semibold mb-4">User List</h1>
         <p className="text-red-500">Failed to load user data. Please try again later.</p>
       </main>
    );
  }

  // If fetch is successful, let us render the UserList with the fetched data
  return (
    <main className="p-4 max-w-2xl mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-center">User List</h1>
      <SearchBar></SearchBar>
      <div className="flex items-center justify-center gap-8">
        <Button className="hover:cursor-pointer">Sort by Name</Button>
        <Button className="hover:cursor-pointer">Sort by Email</Button>
      </div>
      
      {/* Pass the fetched users array as a prop */}
      <UserList users={users} />
    </main>
  );
}