# X și 0 cu minimax

Jocul X și 0 în browser, contra unui calculator care nu poate fi învins.

## Funcționalități

- calculatorul alege mutarea cu algoritmul **minimax**: explorează toate continuările posibile și preferă victoriile rapide și înfrângerile târzii
- jucătorii încep pe rând
- scor pentru victorii, înfrângeri și remize

## Structură

| Fișier | Rol |
|---|---|
| `game.js` | logica jocului, fără DOM: tabla, verificarea câștigătorului, minimax |
| `ui.js` | interfața: desenarea tablei, clicurile, scorul |
| `test/game.test.js` | teste pentru logică |

Tabla este imutabilă: fiecare mutare întoarce o tablă nouă, ceea ce simplifică minimax-ul.

## Rulare

Fișierele folosesc module ES, deci trebuie servite printr-un server local, nu deschise direct din disc:

```
npx serve .
```

sau

```
python -m http.server
```

apoi se deschide adresa afișată în browser.

Teste (Node.js 18 sau mai nou):

```
npm test
```
