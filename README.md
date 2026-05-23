# zone-privacy

Static marketing, support, and privacy pages for Zone.

## Localization

The site is generated from `scripts/build-localized-site.mjs`.

Current launch locales:

- `en`
- `en-GB`
- `en-CA`
- `en-AU`
- `es`
- `es-MX`
- `pt-BR`
- `fr`
- `de`
- `it`

Run this after changing copy:

```sh
node scripts/build-localized-site.mjs
```

The English privacy policy is the source text for legal/privacy meaning. Localized privacy pages should stay close to it and avoid marketing rewrites that could change the scope of data collection, processing, or retention claims.
