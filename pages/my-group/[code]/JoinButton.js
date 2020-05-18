import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useSWR from "swr";
import { useToasts } from "../../../components/Toasts";

function JoinButton() {
  const router = useRouter();
  const { code } = router.query;
  const { mutate } = useSWR(`/api/groups/${code}`);
  const { showToast } = useToasts();
  const joinGroup = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    showToast("Joined Group!");
    await fetch(`/api/groups/joinGroup/${code}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    mutate();
  });
  return (
    <div>
      <Button onClick={joinGroup}>Join</Button>
    </div>
  );
}

export default JoinButton;
