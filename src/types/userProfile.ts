export interface UserProfile {
  syncId: string;
  data: Data;
}

interface Data {
  nickname: string;
  email: string;
  age: number;
  level: number;
  sign: string;
  sex: string;
}