import { User } from "@/types/user";

export async function fetchUsers(): Promise<User[]> {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  console.log(`Attempting to fetch from ${apiUrl}...`); // Log start

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText} (status: ${response.status})`);
    }

    const users: User[] = await response.json();
    console.log('Fetch successful!'); // Log success
    return users;

  } catch (error) {
    console.error('Failed to fetch users:', error); // Log specific error
    throw error; // Re-throw
  }
}