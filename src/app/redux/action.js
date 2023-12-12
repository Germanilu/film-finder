
export const updateYear = (year) => ({
  type: 'UPDATE_FILTER_DATA_YEAR',
  year,
});

export const updateReviewRating = (reviewRating) => ({
  type: 'UPDATE_FILTER_DATA_REVIEW_RATING',
  reviewRating,
});

export const updateCategory = (id) => ({
  type: 'UPDATE_FILTER_DATA_CATEGORY',
  id,
});

export const updateActors = (id) => ({
  type: 'UPDATE_FILTER_DATA_ACTORS',
  id,
});

export const nextStep = () => ({
  type: 'NEXT_STEP',
});

export const previousStep = () => ({
  type: 'PREVIOUS_STEP',
});
