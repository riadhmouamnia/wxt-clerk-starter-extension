---
name: React Content Script UI - WXT
description: Basic example of using createShadowRootUi with React.
apis:
  - createShadowRootUi
---

Add your Chrome extension origin to your instance allowed_origins using BAPI:

```sh
curl  -X PATCH https://api.clerk.com/v1/instance \
      -H "Authorization: Bearer sk_secret_key" \
      -H "Content-type: application/json" \
      -d '{"allowed_origins": ["chrome-extension://extension_id_goes_here"]}'
```

visit to [learn more](https://clerk.com/docs/pr/1004/deployments/deploy-chrome-extension#add-the-extensions-id-to-your-instances-allowed-origins)

```sh
pnpm i
pnpm dev
```
