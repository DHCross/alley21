import { z } from 'zod';
export const schemas = {
  ai_tech: z.object({
    "services": z.array(z.object({
      "title": z.string(),
      "description": z.string(),
      "id": z.string()
    }))
  }),
  furniture: z.object({
    "values": z.array(z.object({
      "title": z.string(),
      "description": z.string(),
      "id": z.string()
    })),
    "process": z.array(z.object({
      "step": z.string(),
      "title": z.string(),
      "description": z.string(),
      "id": z.string()
    }))
  }),
  self_discovery: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "subtitle": z.string()
    }),
    "intro": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "body": z.string()
    }),
    "products": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "items": z.array(z.object({
        "status": z.string(),
        "name": z.string(),
        "description": z.string(),
        "id": z.string()
      }))
    }),
    "cta": z.object({
      "heading": z.string(),
      "primaryLabel": z.string(),
      "secondaryLabel": z.string()
    })
  }),
  insight: z.object({
    "products": z.array(z.object({
      "name": z.string(),
      "description": z.string(),
      "status": z.string(),
      "id": z.string()
    }))
  }),
  classes: z.object({
    "formats": z.array(z.object({
      "title": z.string(),
      "description": z.string(),
      "id": z.string()
    }))
  }),
  contact: z.object({
    "areas": z.array(z.string())
  }),
  about: z.object({
    "principles": z.array(z.object({
      "heading": z.string(),
      "body": z.string(),
      "id": z.string()
    })),
    "channels": z.array(z.object({
      "href": z.string(),
      "label": z.string(),
      "body": z.string(),
      "id": z.string()
    }))
  }),
  home: z.object({
    "hero": z.object({
      "motto": z.string()
    }),
    "nav": z.object({
      "exploreLabel": z.string()
    }),
    "channels": z.array(z.object({
      "href": z.string(),
      "navLabel": z.string(),
      "label": z.string(),
      "tagline": z.string(),
      "description": z.string(),
      "cta": z.string(),
      "id": z.string()
    })),
    "mission": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "body": z.string(),
      "tagline": z.string()
    }),
    "cta": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "body": z.string(),
      "primaryLabel": z.string(),
      "secondaryLabel": z.string()
    }),
    "sectionLabel": z.string(),
    "sectionHeading": z.string()
  }),
  collections: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "headingAccent": z.string(),
      "subheading": z.string(),
      "ctaPrimary": z.string(),
      "ctaSecondary": z.string()
    }),
    "manifesto": z.object({
      "heading": z.string(),
      "body": z.string()
    }),
    "categoriesEyebrow": z.string(),
    "categoriesHeading": z.string(),
    "categories": z.array(z.object({
      "label": z.string(),
      "description": z.string(),
      "id": z.string()
    })),
    "pillarsEyebrow": z.string(),
    "pillarsHeading": z.string(),
    "pillars": z.array(z.object({
      "title": z.string(),
      "description": z.string(),
      "id": z.string()
    })),
    "imagePullQuote": z.string(),
    "imagePullQuoteAccent": z.string(),
    "ctaHeading": z.string(),
    "ctaBody": z.string(),
    "ctaPrimary": z.string(),
    "ctaSecondary": z.string()
  })
};
export type Schemas = typeof schemas;