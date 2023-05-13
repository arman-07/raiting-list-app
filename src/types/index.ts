export interface User {
    id: number;
    name: string;
  }
  
  export interface RatingUser extends User {
    rating: number;
  }
  
  export enum RatingAction {
    Positive = "positive",
    Negative = "negative",
  }
  
  export interface UserListProps {
    users: User[];
    onRateUser: (user: User, action: RatingAction) => void;
  }

  export interface RatingUserListProps {
    ratingUsers: RatingUser[];
    onRateChange: (user: RatingUser, action: RatingAction) => void;
    onRemoveUser: (user: RatingUser) => void;
  }