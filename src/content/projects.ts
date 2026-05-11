export type AspectRatio = "9:16" | "16:9" | "1:1" | "4:5";

export interface ProjectItem {
  id: string;
  title: string;
  drive_id: string;
}

export interface ProjectCategory {
  label: string;
  aspect: AspectRatio;
  items: ProjectItem[];
}

export const projectCategories: Record<string, ProjectCategory> = {
  ads: {
    label: "Ads",
    aspect: "9:16",
    items: [
      { id: "ad-01", title: "Ad Cut 01", drive_id: "1xDvs5W6TGn4AldrZnhNQriT2IjyALALG" },
      { id: "ad-02", title: "Ad Cut 02", drive_id: "1VxZZmTzRpNF4optIdqMaQ3j01bafk81a" },
      { id: "ad-03", title: "Ad Cut 03", drive_id: "1833zRzYavIlYFbUL0e6m51GQYoam-r4M" },
      { id: "ad-04", title: "Ad Cut 04", drive_id: "1zEodM8JwTA7YYIudtg2Feie9OvYHibb9" },
      { id: "ad-05", title: "Ad Cut 05", drive_id: "1eYYBvqIN1S3oobeyzbACZ15kmaHUNbYt" },
      { id: "ad-06", title: "Ad Cut 06", drive_id: "1Wr4TWSI66zRCWN5CPWJYuk-ay54Q96VF" },
      { id: "ad-07", title: "Ad Cut 07", drive_id: "1qjVIsIgmTs7oFNgAZpCTsiXdnT9a_kf1" },
      { id: "ad-08", title: "Ad Cut 08", drive_id: "1XBRzcl9gxTn53ha0ImT6qhhPjHTgfGYm" },
      { id: "ad-09", title: "Ad Cut 09", drive_id: "12PeJHHolGzy05lr8wQMu0fZsyFnP_l8-" },
      { id: "ad-10", title: "Ad Cut 10", drive_id: "1h4rOoQmE02H9VfzZDP3TH_3jCJiX08S4" },
      { id: "ad-11", title: "Ad Cut 11", drive_id: "1pK3mTZxQK-3wHwiG8MrEC7RUlNZwfnsi" },
      { id: "ad-12", title: "Ad Cut 12", drive_id: "1vIHKXKL2HBh6fikVNsckTL1A5UtUIYIU" },
      { id: "ad-13", title: "Ad Cut 13", drive_id: "1fNQEJNThYSRS7_KjvDMFM59jy5h1wllF" },
    ],
  },
  short_form: {
    label: "Short-form",
    aspect: "9:16",
    items: [
      { id: "sf-01", title: "Short-form Reel 01", drive_id: "1q5OaWXbmaLRaIXnZxXEj6_tWCINydnTa" },
      { id: "sf-02", title: "Short-form Reel 02", drive_id: "1VSHb8iIkwDDwHn0jXR5SbYxvModjlFTe" },
      { id: "sf-03", title: "Short-form Reel 03", drive_id: "1IgENCIBDse6fLip7Q_ZEMYyxl5apq-RL" },
      { id: "sf-04", title: "Short-form Reel 04", drive_id: "14KznwKu5cuVhQNDd-iSTrKlrk9ioWdtl" },
      { id: "sf-05", title: "Short-form Reel 05", drive_id: "1ZjTcMGbPYcTuTzIvncNuwag0_lPyY5s1" },
      { id: "sf-06", title: "Short-form Reel 06", drive_id: "1PFhzgRE-9_gXR_Z2PL_0h7QjYm-mGAiW" },
      { id: "sf-07", title: "Short-form Reel 07", drive_id: "1gNYmU8tkGDF-HL7qGK0uiOGsy4Rzp10o" },
    ],
  },
  shot_and_edit: {
    label: "Shot & Edit",
    aspect: "9:16",
    items: [
      { id: "se-01", title: "Shot & Edit 01", drive_id: "1fEAGHzYqfFelNLiOydNci-SpNZKhzc7C" },
      { id: "se-02", title: "Shot & Edit 02", drive_id: "1j_ESpkeSYq4zeokF9oyQDlCQmCAm4HLV" },
      { id: "se-03", title: "Shot & Edit 03", drive_id: "1FmXJ1TzndYfRGC5pl0-H816N-YthgAD4" },
      { id: "se-04", title: "Shot & Edit 04", drive_id: "1_nHViaKW4UFfwLAFoPvN1L0i1-3T8A-v" },
      { id: "se-05", title: "Shot & Edit 05", drive_id: "14bcG39L27Qgz4txM3OumNiACmpYqU8m6" },
    ],
  },
  long_form: {
    label: "Long-form",
    aspect: "16:9",
    items: [
      { id: "lf-01", title: "Long-form 01", drive_id: "1SbBktEaFIU1iJaNJpAkJYj89OcrCABTL" },
      { id: "lf-02", title: "Long-form 02", drive_id: "1Rhvo7SkhJVG4vQnfkPiv9Pz_fY2vWiyn" },
      { id: "lf-03", title: "Long-form 03", drive_id: "1gCoz0My41HwSvq51JgM6MR6nXy9US-zY" },
      { id: "lf-04", title: "Long-form 04", drive_id: "19p6m1hsm6dHsnCXWvdWsLQoRxUDOy-Lm" },
      { id: "lf-05", title: "Long-form 05", drive_id: "1-FyOH1sfdlq9JZEBmOoRsaTrVIis9CcX" },
      { id: "lf-06", title: "Long-form 06", drive_id: "1Ewp3Z4cMtCzzdUonEGxyVelmKfuCyejV" },
      { id: "lf-07", title: "Long-form 07", drive_id: "14tYSBo6-wAfpKpBCCy0D7mcvnB6UIMVR" },
    ],
  },
  product: {
    label: "Product",
    aspect: "1:1",
    items: [
      { id: "pr-01", title: "Product Spot 01", drive_id: "1eJijwL8W8jGvhEi8yU_R1k-aehGmezj9" },
      { id: "pr-02", title: "Product Spot 02", drive_id: "1ihxtzQMBL801c4KjRRai9wFZ6q3ayfbw" },
    ],
  },
  bkfc: {
    label: "BKFC",
    aspect: "16:9",
    items: [
      { id: "bk-01", title: "BKFC Edit 01", drive_id: "1HWapBJFf1J2pmQ3zV28qs4tS5d3qWfR9" },
      { id: "bk-02", title: "BKFC Edit 02", drive_id: "1Zax1e0kfwMAF4xnYhW85JPhJDMRNrezM" },
      { id: "bk-03", title: "BKFC Edit 03", drive_id: "1PHvcFEGHUmAT-bnBtLvJvzFz21F_MQGi" },
      { id: "bk-04", title: "BKFC Edit 04", drive_id: "1biIbx58AnRk7jmNNjbQYLXL8IcD__uRK" },
      { id: "bk-05", title: "BKFC Edit 05", drive_id: "1Bbr1E0Lx8fqebAyI9qbRgiM8dk10GeLr" },
    ],
  },
  real_estate: {
    label: "Real Estate",
    aspect: "9:16",
    items: [
      { id: "re-01", title: "Real Estate Short 01", drive_id: "1PIgk0kFDlOhGZ-FGV3NZmvx8-sq1WOu2" },
      { id: "re-02", title: "Real Estate Short 02", drive_id: "1bkoEn-GvWiWx8PmYE2LYUfhVlwbzEB8Q" },
      { id: "re-03", title: "Real Estate Short 03", drive_id: "1RhGb08dFQIUlteH7SI-5G2SPLT7pC63m" },
      { id: "re-04", title: "Real Estate Short 04", drive_id: "1ad0wmhsxbIXdwCcKBMQ3m4k0aP1brfkf" },
    ],
  },
  graphic_design: {
    label: "Graphic Design",
    aspect: "4:5",
    items: [],
  },
};

export interface FlatProject extends ProjectItem {
  categoryKey: string;
  categoryLabel: string;
  aspect: AspectRatio;
}

export function getFlatProjects(): FlatProject[] {
  return Object.entries(projectCategories).flatMap(([key, cat]) =>
    cat.items.map((item) => ({
      ...item,
      categoryKey: key,
      categoryLabel: cat.label,
      aspect: cat.aspect,
    }))
  );
}

export const categoryChips = [
  "All",
  "Ads",
  "Short-form",
  "Long-form",
  "Shot & Edit",
  "Product",
  "BKFC",
  "Real Estate",
  "Graphic Design",
];
