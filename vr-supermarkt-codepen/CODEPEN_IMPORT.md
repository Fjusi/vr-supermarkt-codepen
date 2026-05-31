# CodePen Import ohne 1300-Zeilen-Copy-Paste

Empfohlener Weg: CodePen bleibt nur die kurze HTML-Shell. `script.js` und
`styles.css` liegen extern, z. B. in GitHub, und werden per CDN geladen.

## Variante A: GitHub + jsDelivr

1. Lade den Ordner `vr-supermarkt-codepen` in ein GitHub-Repo hoch.
2. Ersetze in `codepen-external-shell.html` diese Platzhalter:
   - `USER` durch deinen GitHub-Namen
   - `REPO` durch den Repo-Namen
   - `BRANCH` durch `main` oder deinen Branch
3. Kopiere nur den Inhalt von `codepen-external-shell.html` in das HTML-Panel.
4. Lasse CSS- und JS-Panel in CodePen leer.

Beispiel-URLs:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/deinname/deinrepo@main/vr-supermarkt-codepen/styles.css">
<script src="https://cdn.jsdelivr.net/gh/deinname/deinrepo@main/vr-supermarkt-codepen/script.js"></script>
```

Wichtig: Nicht `raw.githubusercontent.com` für `<script src>` verwenden. Das kann
wegen MIME-Type/Browser-Schutz zicken. `cdn.jsdelivr.net/gh/...` ist für diesen
CodePen-Fall robuster.

## Variante B: Ein zweiter CodePen als Library

1. Erstelle einen Pen `supermarkt-library`.
2. Füge dort einmal `styles.css` ins CSS-Panel und `script.js` ins JS-Panel ein.
3. Im eigentlichen Demo-Pen:
   - Settings -> CSS -> External Stylesheets/Pens:
     `https://codepen.io/DEIN_USER/pen/PEN_ID.css`
   - Settings -> JS -> External Scripts/Pens:
     `https://codepen.io/DEIN_USER/pen/PEN_ID.js`
4. Im Demo-Pen bleibt nur das kurze HTML aus `html-panel.html`.

Das ist praktisch, wenn ihr Varianten bauen wollt: Der große Code liegt im
Library-Pen, und mehrere Demo-Pens können ihn wiederverwenden.

## Variante C: CodePen Asset Hosting

Falls euer CodePen-Account Asset Hosting hat: `script.js` und `styles.css`
hochladen, die Asset-URLs kopieren und in der HTML-Shell verwenden.

## Wenn Paste trotzdem nötig ist

Vor dem Einfügen in CodePen `Auto-Updating Preview` ausschalten. Danach erst
speichern und die Preview wieder aktivieren. Bei großen A-Frame-Szenen verhindert
das oft Hänger während CodePen nach jedem Paste-Schritt neu rendert.
