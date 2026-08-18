import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nitdgplug.org',
    },
    {

      url: 'https://nitdgplug.org/blogs',
    },
    {

      url: 'https://nitdgplug.org/events',
    },
    {

      url: 'https://nitdgplug.org/members',
    },
    {

      url: 'https://nitdgplug.org/timeline',
    },
  ]
}
