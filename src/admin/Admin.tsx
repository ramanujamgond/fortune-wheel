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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

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
  const [adminKey, setAdminKey] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [userData, setUserData] = useState<UserDataProps[]>([]);

  //   admin key to access the routes
  //   const adminAuthKey = process.env.REACT_APP_AUTH_KEY;

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

  const handleClick = () => {
    if (inputValue === "HqtNpv") {
      setAdminKey(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You do not have permission to access this page.",
      });
    }
  };

  const refreshData = () => {
    fetchUserInfo();
  };

  useEffect(() => {
    fetchUserInfo();
  }, [filter]);

  return (
    <div className="w-full">
      {!adminKey && (
        <div className="flex items-center justify-between gap-4 my-8">
          <Input
            type="text"
            value={inputValue}
            placeholder="Enter the secret key to access to dashborad"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="h-10"
          />
          <Button size={"lg"} onClick={handleClick}>
            Submit
          </Button>
        </div>
      )}

      {adminKey && (
        <>
          <div className="flex items-center justify-center my-6">
            <div className="text-xl font-bold mb-5">Admin Panel</div>
            <div className="flex gap-4 ml-auto mb-5">
              <Button onClick={refreshData}>Refresh</Button>
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
            <div className="mb-12">
              <Table className="border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
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
                    userData.map((userItems, index) => (
                      <UserRow
                        index={index}
                        userItems={userItems}
                        fetchUserInfo={fetchUserInfo}
                      />
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Admin;
