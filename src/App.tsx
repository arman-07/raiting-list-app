import React, { useState, useEffect } from "react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { getUsers } from "./services/userApi";
import UserList from "./components/UserList";
import RatingUserList from "./components/RatingUserList";
import { RatingUser, RatingAction, User } from "./types/index";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [ratingUsers, setRatingUsers] = useState<RatingUser[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const handleRateUser = (user: User, action: RatingAction) => {
    const updatedUsers = users.filter((u) => u.id !== user.id);
    const updatedRatingUsers = ratingUsers.filter((ru) => ru.id !== user.id);

    if (action === RatingAction.Positive) {
      const ratedUser: RatingUser = { ...user, rating: 1 };
      setRatingUsers([...updatedRatingUsers, ratedUser]);
    } else if (action === RatingAction.Negative) {
      const ratedUser: RatingUser = { ...user, rating: -1 };
      setRatingUsers([...updatedRatingUsers, ratedUser]);
    }

    setUsers(updatedUsers);
    setActiveTab(1);
    console.log(`Rated user ${user.name}`);
  };

  const handleRemoveUser = (user: RatingUser) => {
    const updatedRatingUsers = ratingUsers.filter((ru) => ru.id !== user.id);
    setRatingUsers(updatedRatingUsers);
    setUsers([...users, user]);
    console.log(`Removed user ${user.name}`);
  };

  const handleRateChange = (user: RatingUser, action: RatingAction) => {
    const updatedRatingUsers = ratingUsers.map((ru) => {
      if (ru.id === user.id) {
        if (action === RatingAction.Positive) {
          if (ru.rating < 5) {
            return { ...ru, rating: ru.rating + 1 };
          } else {
            console.log(`Confirm banning ${user.name}`);
          }
        } else if (action === RatingAction.Negative) {
          if (ru.rating > -5) {
            return { ...ru, rating: ru.rating - 1 };
          } else {
            console.log(`Confirm rewarding ${user.name}`);
          }
        }
      }
      return ru;
    });

    setRatingUsers(updatedRatingUsers);
  };

  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Список пользователей" />
        <Tab label="Пользователи с рейтингом" />
      </Tabs>

      {activeTab === 0 && (
        <UserList users={users} onRateUser={handleRateUser} />
      )}

      {activeTab === 1 && (
        <RatingUserList
          ratingUsers={ratingUsers}
          onRateChange={handleRateChange}
          onRemoveUser={handleRemoveUser}
        />
      )}

      <Box pl={5}>
        {activeTab === 0 && (
          <Button variant="outlined" color="primary" onClick={fetchUsers}>
            Обновить список
          </Button>
        )}
      </Box>
    </div>
  );
};

export default App;
