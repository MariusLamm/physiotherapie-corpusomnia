export interface TeamMember {
  id: string;
  name: string;
  image?: string;
  languageKeys: string[];
  qualificationKeys: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "goncagul-erol",
    name: "Goncagül Erol",
    image: "/team/goncagul-erol.jpg",
    languageKeys: [
      "goncagul-erol.languages.0",
      "goncagul-erol.languages.1",
      "goncagul-erol.languages.2",
    ],
    qualificationKeys: [
      "goncagul-erol.qualifications.0",
      "goncagul-erol.qualifications.1",
      "goncagul-erol.qualifications.2",
      "goncagul-erol.qualifications.3",
      "goncagul-erol.qualifications.4",
      "goncagul-erol.qualifications.5",
      "goncagul-erol.qualifications.6",
      "goncagul-erol.qualifications.7",
      "goncagul-erol.qualifications.8",
      "goncagul-erol.qualifications.9",
      "goncagul-erol.qualifications.10",
      "goncagul-erol.qualifications.11",
    ],
  },
];
