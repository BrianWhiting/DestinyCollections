export interface CollectionData {
  sections: SectionData[];
}

export interface SectionData {
  name: string;
  groups: GroupData[];
}

export interface GroupData {
  name: string;
  sets: SetData[];
}

export interface SetData {
  name: string;
  season: number;
  items: number[] | number[][];
}