import { useEffect, useState } from 'react';
import { AppError, handleError } from '@/lib/errorHandler';
import { useToast } from '@/components/ui/use-toast';
import { getAllUsers } from "@/api/userCalls";
import { IUser } from "shared/types";

const useUsersFetcher = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();

      if(usersData instanceof AppError)
      {
        const errorMessage = handleError(usersData);
        toast({ description: errorMessage });
      }
      else {
        setUsers(usersData);
      }
    };

    fetchUsers();
  }, [toast]);

  return  { users, setUsers };
};

export default useUsersFetcher;