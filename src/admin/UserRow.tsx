import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Check, Loader, X } from "lucide-react";
import { UserDataProps } from "./Admin";
import { useState } from "react";
import axios from "axios";

interface Props {
  userItems: UserDataProps;
  fetchUserInfo: any;
  index: number;
}
const UserRow = ({ userItems, fetchUserInfo, index }: Props) => {
  const [claimLoader, setClaimLoader] = useState<boolean>(false);

  const claimUserPrize = async (user_id: string, item_id: string) => {
    setClaimLoader(true);
    try {
      const paylaod = {
        user_id: user_id,
        item_id: item_id,
      };
      const userDataResponse = await axios.post(
        `https://api.pripgo.com/event/items/claim`,
        paylaod
      );
      if (userDataResponse.data.status === 1) {
        fetchUserInfo();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setClaimLoader(false);
    }
  };

  return (
    <TableRow key={userItems?.id} className="text-left">
      <TableCell>{index + 1}</TableCell>
      <TableCell>{userItems?.full_name}</TableCell>
      <TableCell>{userItems?.email_id}</TableCell>
      <TableCell>{userItems?.mobile_no}</TableCell>
      <TableCell>{userItems?.whatsapp_no}</TableCell>
      <TableCell>{userItems?.property_name}</TableCell>
      <TableCell>{userItems?.property_location}</TableCell>
      <TableCell>
        {userItems?.own_status ? (
          <Check className="text-green-500 font-bold" />
        ) : (
          <X className="text-red-500 font-bold" />
        )}
      </TableCell>
      <TableCell>
        {userItems?.claim_status ? (
          <Check className="text-green-500 font-bold" />
        ) : (
          <X className="text-red-500 font-bold" />
        )}
      </TableCell>
      <TableCell>{userItems?.item_own.item_name}</TableCell>
      <TableCell>
        {userItems?.own_status && userItems.claim_status === false ? (
          <Button
            size={"sm"}
            onClick={() =>
              claimUserPrize(userItems.id, userItems.item_own.item_id)
            }
            disabled={claimLoader}
          >
            {claimLoader && <Loader className="animate-spin mr-2 h-4" />}
            Claim
          </Button>
        ) : userItems?.own_status && userItems.claim_status ? (
          <Check className="text-green-500 font-bold" />
        ) : (
          <X className="text-red-500 font-bold" />
        )}
      </TableCell>
    </TableRow>
  );
};
export default UserRow;
