## No Laborables [![Build Status](https://secure.travis-ci.org/pjnovas/nolaborables.png?branch=feature-v2)](http://travis-ci.org/pjnovas/nolaborables)
API REST para exponer los feriados de Argentina

---
**Nuevo tipo de feriado `puente`**
---

### En que está desarrollado
Sitio web en NodeJS con HapiJS. Tests con Mocha y Expect.js.

### Como instalar
Primero instalar NodeJS (v4.0+) y luego instalar las dependecias con NPM e iniciar el servicio web

```bash
npm install --production
npm start
```

### Implementación
Los feriados están en la carpeta ./data en formato JSON, con un 1 archivo por año y un archivo fijos.json con los feriados que no cambian nunca

#### Formato

Array de dias:

```javascript
{
  "dia": [number],
  "mes": [number],
  "motivo": [string],
  "tipo": [string] // inamovible | trasladable | nolaborable | puente
  "traslado": [number] //en caso de trasladable: el dia del traslado
  "opcional": [object] // en caso de ser opcional: su detalle
}
```

Objeto opcional:

```javascript
// Religión
{
	"tipo": "religion",
	"religion": "judaísmo"
}

// Origen
{
	"tipo": "origen",
	"origen": "armenia"
}
```

### Metodología de desarrollo
Tests (BDD) en Mocha y Expect.js.

#### Instalar Grunt

```bash
npm install grunt-cli -g
```

#### Para correr los tests:

```bash
npm install
npm test
```

#### Como contribuir
1. Correr los tests: Verde
2. Crear test para nueva funcionalidad
3. Correr el test: Rojo
4. Implementar código para la nueva funcionalidad
5. Correr los tests: Verde
6. git - Pull Request :)

## Contribuidores ( Gracias! )
* Bruno Cascio [@brunocascio](https://github.com/brunocascio)
* Tomás Boccardo [@tomasboccardo](https://github.com/tomasboccardo)

## License
BSD-Clause 2 - Ver archivo LICENCE
