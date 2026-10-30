# parienta-web · frente Parienta del Núcleo Care

Este es el **frente Parienta**. La lógica vive en **nucleo-api** con `PROGRAM_ID=parienta`.

```
parienta-web (:3003) ──► nucleo-api :4000  PROGRAM_ID=parienta  DB=nucleo_parienta
```

Marca visible: solo **Parienta** (ver `src/lib/brand.ts`, `public/parienta/`).
