import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

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
  }, []);
  return (
    <div>
      <div className="text-xl font-bold">Admin Panel</div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
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
                <TableRow key={userItems?.id}>
                  <TableCell>{userItems?.full_name}</TableCell>
                  <TableCell>{userItems?.email_id}</TableCell>
                  <TableCell>{userItems?.mobile_no}</TableCell>
                  <TableCell>{userItems?.whatsapp_no}</TableCell>
                  <TableCell>{userItems?.property_name}</TableCell>
                  <TableCell>{userItems?.property_location}</TableCell>
                  <TableCell>{userItems?.own_status}</TableCell>
                  <TableCell>{userItems?.claim_status}</TableCell>
                  <TableCell>{userItems?.item_own.item_name}</TableCell>
                  <TableCell>
                    {userItems?.own_status &&
                    userItems.claim_status === false ? (
                      <Button>Claim</Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Admin;
