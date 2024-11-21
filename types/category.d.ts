// types/category.d.ts

export interface Category {
    id: number;
    title: string;
    slug: string;
    img: string | null;  // Nullable if the image can be missing
    bg: string | null;   // Nullable if the background can be missing
    item_count: number;
  }
  