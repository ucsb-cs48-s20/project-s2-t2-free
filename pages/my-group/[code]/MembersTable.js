import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useSWR from "swr";
import { useToasts } from "../../../components/Toasts";

function MembersTable() {
  const router = useRouter();
  const { code } = router.query;
  const { mutate } = useSWR(`/api/user`);
  const { users } = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await fetch(`/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    mutate();
  });
  console.log(users);
  //  let members = {};
  //  for(let i; i < users.length; i++) {
  //    members += {users[i]} + " : " + "<br>";
  //  }

  return <div></div>;
}

export default MembersTable;
