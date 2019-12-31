export interface UserNewsInterface {
  sharedBy: number;
  url: string;
  savedAt: Date;
}

export interface UserSharedNewsInterface {
  shared: Date;
  to: string;
  url: string;
}
