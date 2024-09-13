export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  relavanceScore: number;
  date: string;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  duration: string;
  reviews: string[];
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};

export type PageDirection = "next" | "previous";

export type SortBy = "relevant" | "recent";
