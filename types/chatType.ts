export type chatType = {
  messages: messageType[];
  created: number;
};

export type messageType = {
  date: Date;
  display_name: string;
  email: string;
  text: string;
};
