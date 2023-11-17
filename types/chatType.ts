export type chatType = {
  messages: messageType[];
  created: number;
};

export type messageType = {
  date: number;
  display_name: string;
  email: string;
  text: string;
};
