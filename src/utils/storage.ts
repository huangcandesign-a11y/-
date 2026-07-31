import { AestheticTerm, SavedCollection } from '../types';

const FAVORITES_KEY = 'aesthetics_vocab_favorites';
const CUSTOM_TERMS_KEY = 'aesthetics_vocab_custom_terms';
const COLLECTIONS_KEY = 'aesthetics_vocab_collections';

export const getFavoriteIds = (): string[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading favorites:', e);
    return [];
  }
};

export const saveFavoriteIds = (ids: string[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
};

export const getCustomTerms = (): AestheticTerm[] => {
  try {
    const data = localStorage.getItem(CUSTOM_TERMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading custom terms:', e);
    return [];
  }
};

export const saveCustomTerms = (terms: AestheticTerm[]): void => {
  try {
    localStorage.setItem(CUSTOM_TERMS_KEY, JSON.stringify(terms));
  } catch (e) {
    console.error('Error saving custom terms:', e);
  }
};

export const getSavedCollections = (): SavedCollection[] => {
  try {
    const data = localStorage.getItem(COLLECTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading saved collections:', e);
    return [];
  }
};

export const saveCollections = (collections: SavedCollection[]): void => {
  try {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  } catch (e) {
    console.error('Error saving collections:', e);
  }
};
