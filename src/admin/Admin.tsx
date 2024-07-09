import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserRow from "./UserRow";

export interface UserDataProps {
  id: string;
  full_name: string;
  email_id: string;
  mobile_no: string;
  whatsapp_no: string;
  property_name: string;
  property_location: string;
  claim_status: boolean;
  own_status: boolean;
  item_own: ItemOwn;
  created_at: string;
  updated_at: string;
}

export interface ItemOwn {
  item_id: string;
  item_name: string;
}

const Admin = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const [userData, setUserData] = useState<UserDataProps[]>([]);
  const fetchUserInfo = async () => {
    setLoader(true);
    try {
      const userDataResponse = await axios.get(
        `https://api.pripgo.com/event/users?status=${filter}`
      );
      if (userDataResponse.data.status === 1) {
        setUserData(userDataResponse.data.data);
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [filter]);
  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <div className="text-xl font-bold mb-5">Admin Panel</div>
        <div className="ml-auto mb-5">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="own">Not Claim</SelectItem>
                <SelectItem value="claim">Claim</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {loader && (
        <div className="flex items-center justify-center w-100 gap-2 my-9">
          <Loader className="animate-spin" />
          Loading...
        </div>
      )}

      {!loader && userData.length === 0 && (
        <div className="flex items-center justify-center w-100 gap-2 my-9">
          No Data Found
        </div>
      )}

      {!loader && userData.length > 0 && (
        <div>
          <Table className="border border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Property Name</TableHead>
                <TableHead>Property Location</TableHead>
                <TableHead>Own Status</TableHead>
                <TableHead>Claim Status</TableHead>
                <TableHead>Won</TableHead>
                <TableHead>Claim</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData &&
                userData.map((userItems) => (
                  <UserRow
                    userItems={userItems}
                    fetchUserInfo={fetchUserInfo}
                  />
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
export default Admin;
