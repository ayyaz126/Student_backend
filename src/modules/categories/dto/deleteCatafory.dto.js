import z from "zod";

export const deleteCategorySchema = z.object({
    id: z
      .string()
      .regex(/^\d+$/, "Category ID must be a valid number"), 
  });

//   Regex: /^\d+$/

// / ... /

// Ye regex ka delimiter hai.

// Matlab regex pattern iske andar hota hai.

// ^

// Ye string ki shuruaat (start) ko represent karta hai.

// Matlab pattern tabhi match hoga agar string bilkul start se yahi ho.

// \d

// Ye ek digit (0–9) ko represent karta hai.

// Agar \d hai to wo ek single digit match karega.

// +

// Ye quantifier hai, matlab "ek ya usse zyada".

// To \d+ ka matlab hai → ek ya zyada digits (ex: 1, 12, 12345).

// $

// Ye string ke end ko represent karta hai.

// Matlab string ke end tak sirf wahi hona chahiye jo pattern define karta hai.