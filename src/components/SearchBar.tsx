
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  // placeholder
}

export function SearchBar({ /* placeholder = "Search..." */ }: SearchBarProps) {
  return (
    <Input
      type="search"
      placeholder="Search users..." 
      className="max-w-sm w-full mx-auto" 
      // value Add later
      // onChange // Add later
    />
  );
}