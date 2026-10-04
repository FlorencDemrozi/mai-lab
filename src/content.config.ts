/**
 * Content schemas for the MMAI Lab site.
 *
 * Every lab-specific fact lives in src/content/ and is validated here at build time.
 * Relations are stored on ONE side only (see README "Content model"); reverse links
 * and cross-file checks (does the referenced id exist?) are done in src/lib/lab.ts.
 */
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { STATUSES, SYNC } from './lib/constants';


/** A text field with English and optional Norwegian. A plain string means English only. */
const localized = z
  .union([z.string(), z.object({ en: z.string(), no: z.string().optional() })])
  .transform((v) => (typeof v === 'string' ? { en: v } : v));

/** Marks dummy data. Anything with `placeholder: true` must be listed in TODO-content.md. */
const placeholder = z.boolean().default(false);

const devices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/devices' }),
  schema: ({ image }) =>
    z.object({
      name: localized,
      summary: localized,
      status: z.enum(STATUSES, {
        error: (issue) =>
          issue.input === undefined
            ? 'Every device needs a `status`: installed | acquiring | planned | retired.'
            : `Unknown status "${String(issue.input)}". Use installed | acquiring | planned | retired.`,
      }),
      /** For `acquiring`: when it is expected, e.g. "2027-01" or "Q1 2027". */
      expected: z.string().optional(),
      modalities: z
        .array(reference('modalities'))
        .min(1, 'Every device needs at least one modality (`modalities: [id]`).'),
      researchers: z
        .array(reference('researchers'), {
          error: 'Every device needs `researchers: [id, ...]` (at least one responsible researcher).',
        })
        .min(1, 'Every device needs at least one responsible researcher (`researchers: [id]`).'),
      applications: z.array(reference('applications')).default([]),
      manufacturer: z.string().optional(),
      model: z.string().optional(),
      quantity: z.number().int().positive().optional(),
      specs: z.record(z.string(), z.unknown()).default({}),
      sync: z.enum(SYNC).default('unknown'),
      acquired: z.coerce.date().optional(),
      booking_notes: localized.optional(),
      image: image().optional(),
      image_alt: localized.optional(),
      /** Name of the object (or group) in the 3D model / 2D hotspot layer. */
      twin_object: z.string().optional(),
      /** Sort order inside lists; lower first. */
      order: z.number().default(100),
      placeholder,
    }),
});

const modalities = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/modalities' }),
  schema: z.object({
    name: localized,
    subtitle: localized,
    /** Icon key, see src/components/Icon.astro. */
    icon: z.string(),
    order: z.number(),
  }),
});

const applications = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/applications' }),
  schema: ({ image }) =>
    z.object({
      name: localized,
      description: localized,
      image: image().optional(),
      order: z.number(),
      placeholder,
    }),
});

const researchers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/researchers' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: localized.optional(),
      photo: image().optional(),
      expertise: z.array(z.string()).default([]),
      email: z.email().optional(),
      profile_url: z.url().optional(),
      orcid: z
        .string()
        .regex(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/, 'ORCID must look like 0000-0002-1825-0097')
        .optional(),
      active: z.boolean().default(true),
      /** Only publish the photo once the person has agreed. */
      consent: z.boolean().default(false),
      order: z.number().default(100),
      placeholder,
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: localized,
    acronym: z.string().optional(),
    funder: z.string().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    summary: localized.optional(),
    url: z.url().optional(),
    devices: z.array(reference('devices')).default([]),
    researchers: z.array(reference('researchers')).default([]),
    applications: z.array(reference('applications')).default([]),
    placeholder,
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    doi: z.string().optional(),
    url: z.url().optional(),
    dataset_url: z.url().optional(),
    projects: z.array(reference('projects')).default([]),
    devices: z.array(reference('devices')).default([]),
    researchers: z.array(reference('researchers')).default([]),
    placeholder,
  }),
});

const zones = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/zones' }),
  schema: z.object({
    name: localized,
    description: localized.optional(),
    /** Floor rectangle in metres, origin at the room's reference corner. */
    rect: z.object({ x: z.number(), y: z.number(), width: z.number(), depth: z.number() }),
    devices: z.array(reference('devices')).default([]),
    placeholder,
  }),
});

const settings = defineCollection({
  loader: file('./src/content/settings.yaml'),
  schema: z.object({
    lab_name: z.string(),
    lab_full_name: localized,
    tagline: localized,
    lab_email: z.email(),
    institution: localized,
    institution_url: z.url(),
    department: localized,
    room: z.string(),
    address: z.array(z.string()),
    visiting: localized.optional(),
    optitrack_area_m: z.tuple([z.number(), z.number()]),
    social: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    placeholder_fields: z.array(z.string()).default([]),
  }),
});

/** Free-text pages (About, Accessibility, …). One file per language: pages/en/about.md, pages/no/about.md. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    placeholder,
  }),
});

export const collections = {
  devices,
  modalities,
  applications,
  researchers,
  projects,
  publications,
  zones,
  settings,
  pages,
};
