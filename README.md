# Landing Page — Santiago González | Asesor Totalplay

Informe de negocio y requerimientos de diseño para la construcción de la landing page. Este documento resume la información del negocio (extraída de los materiales en la carpeta `imagenes/`) y las especificaciones de diseño, estilo y funcionalidad que debe cumplir el proyecto final.

---

## 0. Cómo usar este documento

- Este proyecto **parte de una plantilla base en HTML** que ya se te compartió junto con un **prompt inicial** para adaptarla a este negocio.
- Usa este README como contexto/briefing adicional para Claude (o para ti mismo) al iterar sobre esa plantilla: aquí está la información del negocio, el branding y los requisitos de estilo/funcionalidad que el resultado final debe cumplir.
- **Puedes iterar libremente con Claude sobre el proyecto.** Dale instrucciones, pídele ajustes, corrige lo que no te convenza y vuelve a pedir cambios las veces que sea necesario hasta lograr el resultado deseado. No hay límite de iteraciones — el objetivo es la calidad final, no acertar a la primera.
- La carpeta `imagenes/` contiene el material fuente (flyers promocionales) usado para extraer marca, colores, contacto y planes. **No repliques el estilo visual de esos flyers** (fondos saturados, brillantina, texto multicolor tipo "post de WhatsApp") — de ahí solo se debe tomar la información y la paleta de marca, reinterpretada en un estilo premium (ver sección 3).

---

## 1. Información del negocio

| Campo | Dato |
|---|---|
| Nombre del asesor | **Santiago González** |
| Rol | Asesor / distribuidor independiente de **Totalplay** |
| Giro | Venta y contratación de servicios de Internet de fibra óptica, TV de paga y paquetes combinados Totalplay, con instalación a domicilio |
| Teléfono / WhatsApp | **777 340 1844** (formato para link: `wa.me/527773401844`, probar también `wa.me/5217773401844` por si el número requiere el "1" de celular) |
| Zona de servicio | Lada 777 corresponde a la zona de Cuernavaca/Jiutepec, Morelos — **confirmar con el cliente** la cobertura exacta antes de publicarla en el sitio |
| Marca representada | Totalplay (el sitio promociona los servicios de Totalplay a través de este asesor independiente; conviene aclararlo en el footer, ej. "Asesor autorizado independiente") |

> **Pendiente de confirmar con el cliente:** ciudad/zona de cobertura exacta, vigencia de las promociones (ver sección 2), si existen redes sociales u otros canales de contacto, y si hay testimonios/reseñas reales que se puedan usar.

---

## 2. Servicios y planes (contenido para la sección de precios)

Los precios provienen de flyers promocionales, por lo que **deben confirmarse con el cliente antes de publicarse** (Totalplay actualiza sus promociones periódicamente).

### Solo Internet (100% Fibra Óptica, simétrico)

| Velocidad | Precio promocional | Precio a partir del 6º mes | Extra |
|---|---|---|---|
| 100 Megas | $390/mes | $370/mes | — |
| 150 Megas | $460/mes | $440/mes | Netflix y HBO gratis por 3 meses |
| 250 Megas | $559/mes | $539/mes | Netflix y HBO gratis por 5 meses |

### Internet + TV (más de 185/190 canales)

| Velocidad | Precio promocional | Precio a partir del 6º mes | Extra |
|---|---|---|---|
| 100 Megas | $490/mes | $460/mes | — |
| 150 Megas | $599/mes | $569/mes | Netflix y HBO gratis por 5 meses |
| 250 Megas | $699/mes | $669/mes | Netflix y HBO gratis por 5 meses |

### Beneficios transversales (usar como bullets/íconos en "por qué elegirnos")

- 100% Fibra óptica
- Instalación inmediata / el mismo día
- Sin costo de instalación
- Precios fijos (no suben, solo bajan al 6º mes)
- Bono de portabilidad al cambiarte de compañía
- Contratación fácil y rápida por WhatsApp
- App Totalplay con múltiples beneficios (Club WiFi Totalplay: acceso a red WiFi en distintos puntos)

---

## 3. Estilo visual requerido

El sitio debe verse **premium, corporativo y de nivel enterprise/big tech**: elegante, minimalista y con acabado de marca cuidado. **No** debe parecer un flyer promocional de WhatsApp.

- **Paleta base:** fondos predominantemente oscuros (negro/carbón, ej. `#0A0A0F`–`#121214`) o blanco puro, usados como base neutra premium.
- **Acentos de marca (del isotipo Totalplay):** el ícono de Totalplay son 4 triángulos tipo "play"/pinwheel en magenta/rosa, morado/púrpura, naranja y azul. Usa estos colores **con moderación**: en gradientes sutiles, íconos, bordes, botones CTA y detalles de hover — no como fondo saturado.
  - Aproximados de referencia (ajustar con selector de color sobre el logo real para precisión): Magenta `#E5007D`, Morado `#5B2A86`, Naranja `#F6921E`, Azul `#00AEEF`.
- **Tipografía:** tipografía moderna, limpia, tipo sans-serif corporativa (ej. Inter, Manrope, Sora, o similar) — nada de fuentes "cartoon" o con efectos 3D como en los flyers.
- **Tarjetas de planes:** considerar un acabado tipo *glassmorphism* o tarjetas con bordes sutiles y sombra suave para reforzar el look "high-tech".
- **Mobile-first:** buena parte de los leads llegarán desde celular vía WhatsApp/redes sociales.

---

## 4. Logo

- En `imagenes/` el logotipo de Totalplay **viene incrustado en flyers con fondo** (no hay un archivo de marca limpio/aislado).
- **Se debe aislar el logotipo y quitarle el fondo**, generando un PNG transparente (idealmente también SVG) para usarlo en:
  - Header / navbar
  - Favicon
  - Pantalla de carga (loading spinner, ver sección 5)
- Herramientas sugeridas: remove.bg, Photoshop (selección + borrado de fondo), o cualquier herramienta de remoción de fondo con la que ya trabajes.
- Si el cliente cuenta con el logotipo oficial de Totalplay en alta resolución (vector o PNG con fondo transparente), es preferible usar ese en vez de recortarlo de los flyers.

---

## 5. Efectos, animaciones e interacciones requeridas

- **Pantalla de carga inicial (loading screen):** spinner animado con el logo de Totalplay al centro; transición suave (fade out) hacia el contenido del sitio cuando termina de cargar.
- **Animaciones de scroll:** revelado de secciones al hacer scroll (fade-in, slide-up, parallax sutil). Puede lograrse con Intersection Observer nativo, AOS, GSAP ScrollTrigger, o similar.
- **Sección Hero (título principal):**
  - Efecto **máquina de escribir** (typewriter) sobre el texto del título.
  - Efecto de **cambio de color en las letras** del título (gradiente animado o transición de color letra por letra) usando la paleta de marca.
  - CTA prominente con botón de WhatsApp.
- **Micro-interacciones:** hover states en botones y tarjetas, transiciones suaves, sombras sutiles.
- **Botón flotante de WhatsApp**, visible en todo momento (esquina inferior, siguiendo el scroll).

---

## 6. Estructura sugerida de la landing page

1. **Header/Navbar** — logo + menú + botón CTA ("Contratar" / WhatsApp)
2. **Hero** — título con efectos (typewriter + color), subtítulo, CTA principal a WhatsApp
3. **Planes y precios** — tarjetas comparativas de los 6 planes (sección 2)
4. **Beneficios / Por qué elegirnos** — bullets de la sección 2
5. **Cómo contratar** — pasos simples (1. Escríbenos por WhatsApp → 2. Agenda tu instalación → 3. Disfruta tu servicio)
6. **Cobertura / zona de servicio** (pendiente de confirmar, ver sección 1)
7. **Preguntas frecuentes** (opcional)
8. **Footer** — datos de contacto, aviso de "asesor autorizado independiente de Totalplay"
9. **Botón flotante de WhatsApp** en todas las secciones

---

## 7. Flujo de trabajo

1. Partir de la plantilla base HTML ya compartida + el prompt inicial de adaptación.
2. Usar este README como contexto de negocio/branding/estilo al iterar con Claude.
3. Iterar con Claude cuantas veces sea necesario (contenido, estilo, animaciones, ajustes finos) hasta cumplir con todo lo descrito en las secciones 3, 4 y 5.
4. Antes de publicar: confirmar con el cliente los precios vigentes, la zona de cobertura y el número de WhatsApp final.
