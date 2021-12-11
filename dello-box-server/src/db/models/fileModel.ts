export interface File {
  id: number;
  is_public: boolean;
  user_id: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
}
