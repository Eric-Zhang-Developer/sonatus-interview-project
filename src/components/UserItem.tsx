import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { User } from '@/types/user'; 

interface UserItemProps {
  user: User;
}

export function UserItem({ user }: UserItemProps) {
  const fullAddress = `${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    
    <AccordionItem value={`user-${user.id}`}>

      {/* Trigger shows Name and Email */}
      <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline hover:cursor-pointer">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-left gap-x-4">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0 truncate">
            {user.email}
          </span>
        </div>
      </AccordionTrigger>

      {/* Content shows the structured details */}
      {/* Adress, phone, company name, website */}
      <AccordionContent className="px-4 pb-4 pt-1 text-xs"> 
        <div className="space-y-1.5"> {/* Use space-y for vertical spacing */}
          <div>
            <span className="font-semibold text-muted-foreground w-16 inline-block">Address:</span>
            <span>{fullAddress}</span>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground w-16 inline-block">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground w-16 inline-block">Company:</span>
            <span>{user.company.name}</span>
          </div>
           <div>
            <span className="font-semibold text-muted-foreground w-16 inline-block">Website:</span>
            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {user.website}
            </a>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}