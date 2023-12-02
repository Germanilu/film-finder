
export const updateYear = (year) => ({
  type: 'UPDATE_FILTER_DATA_YEAR',
  year,
});

export const updateReviewRating = (reviewRating) => ({
  type: 'UPDATE_FILTER_DATA_REVIEW_RATING',
  reviewRating,
});

export const updateCategory = (category) => ({
  type: 'UPDATE_FILTER_DATA_CATEGORY',
  category,
});

export const updateActors = (actors) => ({
  type: 'UPDATE_FILTER_DATA_ACTORS',
  actors,
});

export const nextStep = () => ({
  type: 'NEXT_STEP',
});

export const previouseStep = () => ({
  type: 'PREVIOUSE_STEP',
});
