export type Ability = {
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
};

type EffectEntry = {
  effect: string;
  language: Language;
  short_effect: string;
};

type Language = {
  name: string;
  url: string;
};

type FlavorTextEntry = {
  flavor_text: string;
  language: Language2;
  version_group: VersionGroup;
};

type Language2 = {
  name: string;
  url: string;
};

type VersionGroup = {
  name: string;
  url: string;
};

type Generation = {
  name: string;
  url: string;
};

type Name = {
  language: Language3;
  name: string;
};

type Language3 = {
  name: string;
  url: string;
};

type Pokemon = {
  is_hidden: boolean;
  pokemon: Pokemon2;
  slot: number;
};

type Pokemon2 = {
  name: string;
  url: string;
};
