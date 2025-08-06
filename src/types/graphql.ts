export interface Specs {
  bodyWood: string;
  neckWood: string;
  fingerboardWood: string;
  pickups: string;
  tuners: string;
  scaleLength: string;
  bridge: string;
}

export interface Musician {
  name: string;
  musicianImage: string;
  bands: string[];
}

export interface Model {
  id: string;
  name: string;
  type: string;
  image: string;
  description?: string;
  price?: number;
  specs: Specs;
  musicians: Musician[];
}

export interface Brand {
  id: string;
  name: string;
  origin?: string;
  image: string;
  categories?: string[];
  models?: Model[];
}


export const __fix = true;
