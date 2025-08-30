import { useEffect, useState } from "react";
import { reviewPic } from "../../../constants";

function AdminProfileDisplay() {
  const [username, setUsername] = useState("Anonym");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="flex border border-black items-center rounded-lg p-2 self-end cursor-pointer max-md:hidden">
      <img
        src={reviewPic.rectangle103}
        className="w-[36px] h-[36px]"
        alt="profile"
      />
      <p className="px-2 w-40 text-center font-bold text-xl">{username}</p>
    </div>
  );
}

export default AdminProfileDisplay;
