export interface User {
  _id: string,
  username: string,
  name: string,
  email: string,
  avatar: {
    url: string,
    public_id: string
  }
  createdAt: string,
  updatedAt: string 
}

export interface Business {
  _id: string;
  name: string;
  slug: string;
  logo?: {
    url: string;
    public_id: string;
  };
  role: string;
}
