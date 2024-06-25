export const productValidator = [
    body('title', 'Title must be at least 3 characters long')
        .trim()
        .isLength({ min: 3 }),

    body('description', 'Description must be at least 10 characters long')
        .trim()
        .isLength({ min: 10 }),

    body('aboutProduct', 'About product must be at least 10 characters long')
        .optional()
        .trim()
        .isLength({ min: 10 }),

    body('imageURL', 'Please upload an image')
        .optional(),

    body('location', 'Location must be at least 3 characters long')
        .optional()
        .trim()
        .isLength({ min: 3 }),

    body('country', 'Country must be at least 3 characters long')
        .optional()
        .trim()
        .isLength({ min: 3 }),

    body('price', 'Price must be a valid number')
        .optional()
        .isNumeric()
];