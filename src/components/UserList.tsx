import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { RatingAction, UserListProps } from "../types/index";

const UserList: React.FC<UserListProps> = ({ users, onRateUser }) => {
  return (
    <Box p={5}>
      {users.map((user) => (
        <Box key={user.id} my={2}>
          <Typography>{user.name}</Typography>
          <Button
            sx={{ marginRight: "8px" }}
            variant="outlined"
            color="primary"
            onClick={() => onRateUser(user, RatingAction.Positive)}
          >
            +
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onRateUser(user, RatingAction.Negative)}
          >
            -
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default UserList;
