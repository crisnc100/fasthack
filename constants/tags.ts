export const dietaryTags = [
  { id: 'highest-protein', name: 'Highest protein', isPremium: false },
  { id: 'under-400-cal', name: 'Under 400 cal', isPremium: false },
  { id: 'low-carb', name: 'Low carb', isPremium: false },
  { id: 'keto', name: 'Keto', isPremium: true },
  { id: 'gluten-free', name: 'Gluten free', isPremium: true },
  { id: 'carnivore', name: 'Carnivore', isPremium: true },
  { id: 'conservative-cheat-meal', name: 'Conservative cheat meal', isPremium: true },
  { id: 'seed-oil-free', name: 'Seed oil free', isPremium: true }
];

export const getTagByName = (name: string) => {
  return dietaryTags.find(tag => tag.name.toLowerCase() === name.toLowerCase());
};

export const getFreeTags = () => {
  return dietaryTags.filter(tag => !tag.isPremium);
};

export const getPremiumTags = () => {
  return dietaryTags.filter(tag => tag.isPremium);
};