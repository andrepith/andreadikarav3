interface bioInterface {
  bio: {
    firstName: string;
    lastName: string;
    birthName: string;
    birthDate: number;
    city: string;
    country: string;
    nationality: string;
    email: string;
    phone: string;
    resumeLink: string;
    jobTitle: string;
    aboutMe: string;
    social: [
      {
        name: string;
        url: string;
      }
    ];
    experience: [
      {
        title: string;
        company: string;
        location: string;
        from: number;
        to: number;
        current: boolean;
        description: string[];
        url: string;
      }
    ];
    portofolio: [
      {
        url: string;
        image: string;
        alt: string;
        name: string;
        type: string;
      }
    ];
    skillset: [
      {
        name: string;
        image: string;
        link: string;
      }
    ];
  };
}

export default bioInterface;
