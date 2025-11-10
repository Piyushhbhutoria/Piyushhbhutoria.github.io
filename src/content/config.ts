import { defineCollection, z } from 'astro:content';

const site = defineCollection({
    type: 'content',
    // Accept mixed frontmatter from all sections
    schema: z.object({}).passthrough(),
});

export const collections = {
    site,
};

const heroCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        name: z.string(),
        description: z.string(),
        cta: z.object({
            primary: z.object({
                text: z.string(),
                href: z.string(),
            }),
            secondary: z.object({
                text: z.string(),
                href: z.string(),
            }),
        }),
        social: z.object({
            github: z.string(),
            linkedin: z.string(),
            email: z.string(),
        }),
    }),
});

const aboutCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        highlightWord: z.string(),
        paragraphs: z.array(z.object({
            text: z.string(),
            bold: z.boolean().optional(),
        })),
    }),
});

const experienceCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        experiences: z.array(z.object({
            company: z.string(),
            role: z.string(),
            duration: z.string(),
            location: z.string(),
            description: z.array(z.string()),
            techStack: z.string(),
            color: z.enum(["primary", "secondary", "accent"]),
        })),
    }),
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        projects: z.array(z.object({
            title: z.string(),
            description: z.string(),
            tech: z.string(),
            links: z.array(z.object({
                type: z.enum(["demo", "github"]),
                url: z.string(),
            })),
            color: z.string(),
        })),
    }),
});

const skillsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        iconType: z.enum(["code2", "wrench", "database", "award"]),
        skillCategories: z.array(z.object({
            iconType: z.enum(["code2", "wrench", "database", "award"]),
            title: z.string(),
            items: z.array(z.string()),
            color: z.enum(["primary", "secondary", "accent"]),
        })),
    }),
});

const certificationsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        certifications: z.array(z.object({
            name: z.string(),
            issuer: z.string(),
        })),
    }),
});

const achievementsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        achievements: z.array(z.object({
            name: z.string(),
            category: z.string(),
            year: z.string(),
            color: z.string(),
        })),
    }),
});

const educationCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        education: z.array(z.object({
            institution: z.string(),
            location: z.string(),
            degree: z.string(),
            duration: z.string(),
            cgpa: z.string(),
            color: z.enum(["primary", "secondary", "accent"]),
        })),
    }),
});

const contactCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        socialTitle: z.string(),
        contactItems: z.array(z.object({
            iconType: z.enum(["mail", "phone", "mappin"]),
            label: z.string(),
            value: z.string(),
            href: z.string().nullable(),
            color: z.string(),
        })),
        socialLinks: z.array(z.object({
            iconType: z.enum(["github", "linkedin"]),
            label: z.string(),
            href: z.string(),
            color: z.string(),
        })),
        ctaEmail: z.string(),
    }),
});

// export const collections = {
//     hero: heroCollection,
//     about: aboutCollection,
//     experience: experienceCollection,
//     projects: projectsCollection,
//     skills: skillsCollection,
//     certifications: certificationsCollection,
//     achievements: achievementsCollection,
//     education: educationCollection,
//     contact: contactCollection,
// };

