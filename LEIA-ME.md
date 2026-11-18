# Patrulha dos Bigodes — aplicativo Android (APK)

O jogo fica em `www/index.html`. O ícone e a tela de abertura (com a Peta) ficam em `assets/`.
Nome do app: **Patrulha dos Bigodes** · identificador: `com.patrulhadosbigodes.app`

---

## Primeira vez — pelo GitHub Desktop

1. No GitHub Desktop, com o seu repositório aberto, clique em
   **Repository → Show in Explorer**. Abre a pasta do repositório no PC.
2. Descompacte este ZIP e copie **tudo o que está dentro dele** para essa pasta,
   direto na raiz (não dentro de outra subpasta). A pasta deve ficar assim:

```
(pasta do repositório)
├── .github/workflows/gerar-apk.yml
├── assets/          (ícones e tela de abertura)
├── ferramentas/     (fonte e assinatura do app)
├── www/index.html   (o jogo)
├── .gitignore
├── capacitor.config.json
├── package.json
└── LEIA-ME.md
```

3. Volte ao GitHub Desktop. Os arquivos aparecem na lista **Changes**.
   Embaixo, à esquerda, em **Summary**, escreva `Versão 1.0` e clique em **Commit to main**.
4. Clique em **Push origin** no topo (se aparecer **Publish repository**, clique nele;
   pode deixar marcado "Keep this code private").
5. No navegador, abra o repositório no github.com → aba **Actions**.
   O processo **Gerar APK** roda sozinho (5 a 10 minutos).
   Se pedir, clique em "I understand my workflows, go ahead and enable them".
6. Quando ficar com o ✓ verde, clique nele. Em **Artifacts**, baixe **PatrulhaDosBigodes-APK**
   (um ZIP com o `PatrulhaDosBigodes.apk` dentro).

### Instalar no celular
Mande o `.apk` para o celular (WhatsApp para você mesmo, Drive, cabo USB), toque nele,
permita **instalar apps desta fonte** e toque em **Instalar**.

---

## Toda vez que o jogo for atualizado

1. Baixe o `index.html` novo (ou o ZIP novo) que eu te mandar.
2. Na pasta do repositório, **substitua** o arquivo `www/index.html` pelo novo.
3. No GitHub Desktop aparece `www/index.html` modificado. Escreva o que mudou
   (ex.: `Músicas novas`), clique em **Commit to main** e depois em **Push origin**.
4. Na aba **Actions** sai um APK novo. Instale por cima do antigo:
   o progresso salvo no celular continua (o app sempre usa a mesma assinatura e o número da versão sobe sozinho).

Dica: se um dia o Actions ficar vermelho (✗), clique nele, abra a etapa com erro e me mande o texto.

---

## Jeito alternativo — gerar no próprio PC (Android Studio)

1. Instale o **Node.js** (LTS) e o **Android Studio** (abra uma vez e deixe terminar de baixar tudo).
2. No terminal, dentro da pasta, rode um por vez:

```
npm install
npm run fonte
npm run android
npx cap open android
```

3. No Android Studio: **Build → Build App Bundle(s) / APK(s) → Build APK(s)**.

---

## Observações

- Este APK é para uso pessoal e para mostrar aos amigos. Para publicar na **Play Store**,
  o próximo passo é gerar uma versão de loja (AAB) assinada com uma chave só sua.
- O progresso do app é separado do progresso no navegador.
- Mantenha o repositório **privado**: ele guarda a assinatura do app (`ferramentas/debug.keystore`).
