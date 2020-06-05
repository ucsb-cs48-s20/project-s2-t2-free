import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useSWR from "swr";
import { useToasts } from "./Toasts";

function JoinLeaveButton(props) {
  const user = props.user;
  const router = useRouter();
  const { code } = router.query;

  const { data, mutate } = useSWR(`/api/groups/getUserGroups`);
  const { mutate: mutateGroupList } = useSWR(
    `/api/groups/getGroupInfo/${code}`
  );
  const { mutate: mutateGroupFreeTime } = useSWR(
    `/api/groups/getGroupFreeTime/${code}`
  );
  const { mutate: mutateMembersFreeTime } = useSWR(
    `/api/groups/getUsersAndEvents/${code}`
  );
  const { showToast } = useToasts();
  const leaveGroup = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    showToast("Left Group!");
    await fetch(`/api/groups/leaveGroup/${code}`, { method: "DELETE" });
    mutateGroupList();
    mutateGroupFreeTime();
    mutateMembersFreeTime();
    mutate();
  });
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
    mutateGroupList();
    mutateGroupFreeTime();
    mutateMembersFreeTime();
    mutate();
  });

  console.log(data);

  if (typeof data === "object") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].code === code) {
        return (
          <div className="mb-3">
            <Button id="leavegroup" onClick={leaveGroup}>
              Leave
            </Button>
          </div>
        );
      }
    }
    return (
      <div className="mb-3 mr-2">
        <Button id="joingroup" onClick={joinGroup}>
          Join
        </Button>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default JoinLeaveButton;
