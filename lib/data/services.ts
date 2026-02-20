export interface Service {
  id: string;
  detailKeys?: string[];
}

export const services: Service[] = [
  {
    id: "allgemeine-physiotherapie",
  },
  {
    id: "geriatrie",
  },
  {
    id: "pravention",
  },
  {
    id: "sturzpravention",
  },
  {
    id: "domizilbehandlungen",
    detailKeys: ["domizilbehandlungen.details.0"],
  },
  {
    id: "orthopadie",
    detailKeys: [
      "orthopadie.details.0",
      "orthopadie.details.1",
      "orthopadie.details.2",
      "orthopadie.details.3",
      "orthopadie.details.4",
      "orthopadie.details.5",
      "orthopadie.details.6",
      "orthopadie.details.7",
      "orthopadie.details.8",
    ],
  },
  {
    id: "chirurgie",
    detailKeys: [
      "chirurgie.details.0",
      "chirurgie.details.1",
      "chirurgie.details.2",
      "chirurgie.details.3",
      "chirurgie.details.4",
    ],
  },
  {
    id: "lymphologie",
    detailKeys: [
      "lymphologie.details.0",
      "lymphologie.details.1",
      "lymphologie.details.2",
      "lymphologie.details.3",
      "lymphologie.details.4",
      "lymphologie.details.5",
      "lymphologie.details.6",
    ],
  },
  {
    id: "innere-medizin",
  },
  {
    id: "neurologie",
    detailKeys: [
      "neurologie.details.0",
      "neurologie.details.1",
      "neurologie.details.2",
      "neurologie.details.3",
      "neurologie.details.4",
      "neurologie.details.5",
      "neurologie.details.6",
      "neurologie.details.7",
      "neurologie.details.8",
    ],
  },
  {
    id: "sportphysiotherapie",
  },
  {
    id: "massage",
  },
  {
    id: "senioren-turnen",
  },
  {
    id: "fachliche-beratung",
  },
  {
    id: "zusatzliche-angebote",
    detailKeys: [
      "zusatzliche-angebote.details.0",
      "zusatzliche-angebote.details.1",
      "zusatzliche-angebote.details.2",
      "zusatzliche-angebote.details.3",
      "zusatzliche-angebote.details.4",
      "zusatzliche-angebote.details.5",
    ],
  },
];
