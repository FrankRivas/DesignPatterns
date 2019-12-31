export interface GuardianNews {
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  fields: {
    byline: string;
  };
}

export interface NYTNews {
  web_url: string;
  headline: {
    main: string;
  };
  pub_date: string;
  byline: {
    original: string;
  };
}

export interface NewsAPI {
  author: string;
  title: string;
  url: string;
  publishedAt: string;
}

export interface MyNews {
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  author: string;
}
