export interface OpenClose {
  open: string;
  close: string;
}

export interface HoursOfOperation {
  sunday?: OpenClose;
  monday?: OpenClose;
  tuesday?: OpenClose;
  wednesday?: OpenClose;
  thursday?: OpenClose;
  friday?: OpenClose;
  saturday?: OpenClose;
}

export interface SocialMediaLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  snapchat?: string;
}

export interface Review {
  _id: string;
  user: string;
  displayName: string;
  studySpot: string;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudySpot {
  _id: string;
  partner: string;
  name: string;
  description: string;
  address: string;
  location: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  phoneNumber: string;
  hours: HoursOfOperation;
  logo?: string;
  photos?: string[];
  hasFreeWifi: boolean;
  website?: string;
  socialMedia?: SocialMediaLinks;
  reviews?: Review[];
}
