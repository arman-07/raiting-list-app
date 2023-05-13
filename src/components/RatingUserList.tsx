import React from "react";
import { Alert, Box, Button, Typography } from "@mui/material";

import { RatingAction, RatingUserListProps } from "../types/index";

const RatingUserList: React.FC<RatingUserListProps> = ({
  ratingUsers,
  onRateChange,
  onRemoveUser,
}) => {
  return (
    <Box p={5}>
      <Typography variant="h6">Пользователи с рейтингом</Typography>
      {ratingUsers.map((user) => (
        <Box key={user.id} my={2}>
          <Typography>{user.name}</Typography>
          <Typography>Рейтинг: {user.rating}</Typography>
          <Button
            sx={{ marginRight: "8px" }}
            variant="outlined"
            color="primary"
            onClick={() => onRateChange(user, RatingAction.Positive)}
          >
            +
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onRateChange(user, RatingAction.Negative)}
          >
            -
          </Button>
          {user.rating === 5 && (
            <Alert severity="info" sx={{ marginTop: 2 }}>
              Нужно вознаградить {user.name}. Сделать это?
              <Button
                sx={{ marginLeft: 1 }}
                variant="outlined"
                color="primary"
                onClick={() => onRemoveUser(user)}
              >
                Да
              </Button>
            </Alert>
          )}
          {user.rating === -5 && (
            <Alert severity="info" sx={{ marginTop: 2 }}>
              Пора забанить {user.name}. Сделать это?
              <Button
                sx={{ marginLeft: 1 }}
                variant="outlined"
                color="secondary"
                onClick={() => onRemoveUser(user)}
              >
                Да
              </Button>
            </Alert>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default RatingUserList;
