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

export interface StudySpot {
  partner: string;
  name: string;
  description: string;
  location: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    properties: {
      name: string;
      address: string;
    };
  };
  phoneNumber: string;
  hours: HoursOfOperation;
  logo?: string;
  photos?: string[];
  hasFreeWifi: boolean;
  website?: string;
  socialMedia?: SocialMediaLinks;
}
