import React, { useContext, useState } from "react";
import { UserContext } from "../../Usercontext";
import { FaRegUser } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const ExploreUser = () => {
  const { users, currentUser, setCurrentUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Manage dropdown visibility

  const handleAddFriend = (email) => {
    const updatedUser = {
      ...currentUser,
      friendList: [...(currentUser.friendList || []), email],
    };
    setCurrentUser(updatedUser);
  };

  const handleBlockUser = (email) => {
    const updatedUser = {
      ...currentUser,
      blockList: [...(currentUser.blockList || []), email],
    };
    setCurrentUser(updatedUser);
  };

  const handleUnblockUser = (email) => {
    const updatedUser = {
      ...currentUser,
      blockList: currentUser.blockList.filter((blockedEmail) => blockedEmail !== email),
    };
    setCurrentUser(updatedUser);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="w-full md:w-[20rem] h-[20rem] md:h-full rounded-md border border-solid shadow-lg">
      <div className="w-full h-[3rem] bg-purple-500 flex items-center justify-center">
        <h4 className="text-[1rem] font-semibold text-white">User List</h4>
      </div>
      <div className="w-full h-full flex flex-col gap-2 mt-2 px-2">
        {users.filter((user) => user.email !== currentUser?.email).map((user, index) => (
          <div
            key={index}
            className="w-full border-2 border-solid border-black rounded-md px-2 py-3 flex items-center justify-between gap-2 relative"
          >
            <div className="flex items-center gap-2">
              <FaRegUser className="text-[2rem]" />
              <div>
                <span className="text-[1.2rem] leading-1">{user.username}</span>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            <div className="relative">
              <HiDotsVertical
                className="text-[1.2rem] cursor-pointer"
                onClick={() => toggleDropdown(index)}
              />
              {dropdownOpen === index && (
                <div className="absolute right-0 top-8 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-40">
                  <ul className="flex flex-col">
                    {/* Add Friend Option */}
                    {!currentUser.friendList?.includes(user.email) && (
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleAddFriend(user.email);
                          setDropdownOpen(null); // Close dropdown
                        }}
                      >
                        Add Friend
                      </li>
                    )}
                    {/* Block/Unblock Options */}
                    {!currentUser.blockList?.includes(user.email) ? (
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleBlockUser(user.email);
                          setDropdownOpen(null); // Close dropdown
                        }}
                      >
                        Block
                      </li>
                    ) : (
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleUnblockUser(user.email);
                          setDropdownOpen(null); // Close dropdown
                        }}
                      >
                        Unblock
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreUser;
