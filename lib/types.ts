/** Stable URL segment and primary key, e.g. `"1998-05"`. */
export type IssueId = string;

/** Controlled-vocabulary tag slug, e.g. `"local-government"`. */
export type IssueTagSlug = string;

export type FeaturedArticle = {
  title: string;
  page: number;
  author?: string;
};

export type Issue = {
  id: IssueId;
  title: string;
  issue_number?: number;
  volume?: number;
  publication_date: string;
  cover_image: string;
  pdf_url: string;
  page_count?: number;
  summary?: string;
  tags: IssueTagSlug[];
  featured_articles: FeaturedArticle[];
};
