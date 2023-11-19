export interface InternationalizationType {
  root: {
    rules: string;
    google: string;
    join: string;
    create: string;
    open: string;
    exit: string;
  };
  room: {
    title: string;
    subtitle: string;
    character: string;
    toggle: string;
    private: string;
    public: string;
  };
  input: string;
  copy: string;
  joinRoom: {
    keyInput: string;
  };
  connect: string;
  cards: {
    titles: string[];
    info: {
      [key: string]: string;
    };
    street: {
      rent: string[];
      prices: string[];
    };
    train: {
      rent: string[];
      prices: string[];
    };
    resources: {
      rent: string[];
      prices: string[];
    };
  };
}
