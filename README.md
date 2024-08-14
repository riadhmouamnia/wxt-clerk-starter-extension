This is a project contains [wxt](https://wxt.dev/) chrome extension project with [Next.js](https://nextjs.org/) frontend app.

The project uses [Clerk](https://clerk.com/) as an authentication system and sync the auth state between the extension and the frontend app.

---

You will need to run the frontend dev server first on port 3000
and then the extension will open port 3001 automatically or you can change the dev server for the frontend in

```
/extension/wxt.config.ts
then change:
host_permissions: ["http://localhost:3000/*"],
```

You will also to add your Chrome extension origin to your instance allowed_origins using BAPI:

```sh
curl  -X PATCH https://api.clerk.com/v1/instance \
      -H "Authorization: Bearer sk_secret_key" \
      -H "Content-type: application/json" \
      -d '{"allowed_origins": ["chrome-extension://extension_id_goes_here"]}'
```

visit to [learn more](https://clerk.com/docs/pr/1004/deployments/deploy-chrome-extension#add-the-extensions-id-to-your-instances-allowed-origins)
