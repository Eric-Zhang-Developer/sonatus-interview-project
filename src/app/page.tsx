'use client'; 

import { useState, useEffect } from 'react'; 
import type { User } from '@/types/user';
import { fetchUsers } from '@/lib/fetchUsers'; 
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { UserList } from '@/components/UserList';
import { Skeleton } from "@/components/ui/skeleton"; 

export default function HomePage() {
  // - State -
  const [initialUsers, setInitialUsers] = useState<User[]>([]); // Stores the original fetched list
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Stores the list to display (after filter/sort)
  const [searchTerm, setSearchTerm] = useState(''); // Store search term 
  const [sortKey, setSortKey] = useState<'name' | 'email' | null>(null); 
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // - Data Fetching -
  useEffect(() => {
    // Define async function inside effect
    const loadUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const users = await fetchUsers();
        setInitialUsers(users); // Store the original list
        setFilteredUsers(users); // Set the initial display list
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers(); // Call the function
  }, []); // Run only on mount

  // - Filtering & Sorting Effect -
  useEffect(() => {
    const processedUsers = [...initialUsers]; // Start with the original list

    // 1. Filter
    if (searchTerm) {
      // To-do
    }

    // 2. Sort
    if (sortKey) {
      // To-do
    }

    setFilteredUsers(processedUsers); // Update the state for the list to display

  }, [searchTerm, sortKey, initialUsers]); // Re-run when search, sort, or initial data changes

  // - Event Handlers -
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: 'name' | 'email') => {
    setSortKey(prevKey => (prevKey === key ? null : key));
  };

  // - Render Logic -
  const renderContent = () => {
    if (isLoading) {
      // Simple Loading Skeleton
      return (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500 text-center">{error}</p>;
    }

    // Pass the dynamically filtered/sorted list to UserList
    return <UserList users={filteredUsers} />;
  };

  return (
    <main className="p-4 max-w-2xl mx-auto flex flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold text-center">User List</h1>

      <Input
        type="search"
        placeholder="Search by name or email..."
        className="max-w-sm w-full mx-auto"
        value={searchTerm}
        onChange={handleSearchChange}
        disabled={isLoading || !!error} // Disable input while loading or if error occurred
      />

      <div className="flex items-center justify-center gap-4">
        <Button
          variant={sortKey === 'name' ? 'default' : 'outline'}
          onClick={() => handleSort('name')}
          disabled={isLoading || !!error}
        >
          Sort by Name {sortKey === 'name' ? ' (Active)' : ''}
        </Button>
        <Button
          variant={sortKey === 'email' ? 'default' : 'outline'}
          onClick={() => handleSort('email')}
          disabled={isLoading || !!error}
        >
          Sort by Email {sortKey === 'email' ? ' (Active)' : ''}
        </Button>
      </div>

      {/* Render loading/error/list */}
      {renderContent()}

    </main>
  );
}