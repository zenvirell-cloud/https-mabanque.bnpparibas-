```markdown
# Banking demo (éducatif)

Ceci est un projet démonstratif et factice. N'utilisez aucune donnée réelle.

Étapes rapides pour déployer :

1) Crée un repo GitHub (nom neutre, sans marque).
2) Colle les fichiers de ce dépôt et pousse sur main.
3) Configure Vercel :
   - Importer le repo depuis GitHub.
   - Dans Project → Settings → Environment Variables ajouter :
     - SENDGRID_API_KEY  = (clé SendGrid)
     - FROM_EMAIL        = no-reply@ton-domaine.example
4) Déployer. Vercel installera les dépendances (package.json).
5) Tester l'envoi :
   - POST /api/send (voir index.html form) ou :
     curl -X POST https://<TON-PROJET>.vercel.app/api/send \
       -H "Content-Type: application/json" \
       -d '{"to":"ton@mail.com","subject":"Test","text":"Bonjour"}'

Notes de conformité :
- Le nom du repo et le contenu ne doivent pas contenir de marques protégées.
- Ne pas utiliser de logos ou images propriétaires sans autorisation.
- Mentionner clairement que le site est factice dans l'interface et le README.
```
