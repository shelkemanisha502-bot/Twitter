export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
}

export interface Tweet {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  likes: number;
  retweets: number;
  replies: number;
  isLiked?: boolean;
  image?: string;
}

export enum AISuggestionType {
  FIX_GRAMMAR = 'Fix Grammar',
  MAKE_FUNNY = 'Make it Funny',
  MAKE_PROFESSIONAL = 'Make Professional',
  GENERATE_HASHTAGS = 'Add Hashtags',
}