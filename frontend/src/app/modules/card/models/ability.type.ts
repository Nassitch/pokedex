export interface Ability {
  effect_changes: EffectChange[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}

interface EffectChange {
  version_group: VersionGroup;
  effect_entries: EffectEntry[];
}

interface EffectEntry {
  effect: string;
  language: Language;
  short_effect: string;
}

interface Language {
  name: string;
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Language2;
  version_group: VersionGroup;
}

interface Language2 {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface Generation {
  name: string;
  url: string;
}

interface Name {
  language: Language3;
  name: string;
}

interface Language3 {
  name: string;
  url: string;
}

interface Pokemon {
  is_hidden: boolean;
  pokemon: Pokemon2;
  slot: number;
}

interface Pokemon2 {
  name: string;
  url: string;
}
