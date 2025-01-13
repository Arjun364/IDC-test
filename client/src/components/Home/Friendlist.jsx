import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Usercontext";
import { FaRegUser } from "react-icons/fa";

const Friendlist = () => {
  const { currentUser, setCurrentUser, users } = useContext(UserContext);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const friends = (currentUser.friendList || [])
        .map((email) => users.find((user) => user.email === email))
        .filter(Boolean);
      setFriendList(friends);
    }
  }, [currentUser, users]);

  const removeFriend = (email) => {
    const updatedFriendList = currentUser.friendList.filter(
      (friendEmail) => friendEmail !== email
    );
    const updatedUser = { ...currentUser, friendList: updatedFriendList };
    setCurrentUser(updatedUser);
  };

  return (
    <div className="w-full md:w-[25rem] h-[20rem] md:h-full rounded-md border border-solid shadow-lg">
      <div className="w-full h-[3rem] bg-blue-500 flex items-center justify-center">
        <h4 className="text-[1rem] font-semibold text-white">Friend List</h4>
      </div>
      <div className="w-full h-full flex flex-col gap-2 mt-2 px-2 overflow-y-auto">
        {friendList.length > 0 ? (
          friendList.map((friend, index) => {
            return (
              <div
                key={index}
                className="w-full border-2 border-solid border-black rounded-md px-2 py-3 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <FaRegUser className="text-[2rem]" />
                  <div>
                    <span className="text-[1.2rem] leading-1">{friend.username}</span>
                    <p className="text-sm">Last seen: {friend.lastSeen || "N/A"}</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => removeFriend(friend.email)}
                >
                  Remove Friend
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-500">No friends found</p>
        )}
      </div>
    </div>
  );
};

export default Friendlist;
