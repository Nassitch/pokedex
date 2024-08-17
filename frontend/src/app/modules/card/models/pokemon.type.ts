export type PokemonType = {
  abilities: Abilities[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: [];
  id: number;
  id_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: Form[];
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

type Abilities = {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
};

type Ability = {
  name: string;
  url: string;
};

type Cries = {
  latest: string;
  legacy: string;
};

type Form = {
  name: string;
  url: string;
};

type GameIndice = {
  game_index: number;
  version: Form;
};

type Moves = {
  move: Form;
  version_group_details: VersionGroupDetail[];
};

type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_methode: Form;
  version_group: Form;
};

type Sprites = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: Other;
  versions: Version;
};

type Other = {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
  showdown: ShowDown;
};

type DreamWorld = {
  front_default: string;
  front_female: string | null;
};

type Home = {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type OfficialArtwork = {
  front_default: string;
  front_shiny: string;
};

type ShowDown = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type Version = {
  'generation-i': GenerationI;
  'generation-ii': GenerationII;
  'generation-iii': GenerationIII;
  'generation-iv': GenerationIV;
  'generation-v': GenerationV;
  'generation-vi': GenerationVI;
  'generation-vii': GenerationVII;
  'generation-viii': GenerationVIII;
};

type GenerationI = {
  'red-blue': RedBlue;
  yellow: Yellow;
};

type RedBlue = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

type Yellow = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

type GenerationII = {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
};

type Crystal = {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
};

type Gold = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
};

type Silver = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
};

type GenerationIII = {
  emerald: Emerald;
  'firered-leafgreen': FireredLeafgreen;
  'ruby-sapphire': RubySapphire;
};

type Emerald = {
  front_default: string;
  front_shiny: string;
};

type FireredLeafgreen = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

type RubySapphire = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

type GenerationIV = {
  'diamond-pearl': DiamondPearl;
  'heartgold-soulsilver': DiamondPearl;
  platinum: DiamondPearl;
};

type DiamondPearl = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type GenerationV = {
  'black-white': BlackWhite;
};

type BlackWhite = {
  animated: Animated;
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type Animated = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type GenerationVI = {
  'omega-ruby-alphasapphire': OmegaRubyAlphasapphire;
  'x-y': OmegaRubyAlphasapphire;
};

type OmegaRubyAlphasapphire = {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type GenerationVII = {
  icons: Icons;
  'ultra-sun-ultra-moon': UltraSunUltraMoon;
};

type Icons = {
  front_default: string;
  front_female: string | null;
};

type UltraSunUltraMoon = {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type GenerationVIII = {
  icons: Icons;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: Form;
};

type Type = {
  slot: number;
  type: Form;
};
