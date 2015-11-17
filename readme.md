## No Laborables [![Build Status](https://secure.travis-ci.org/pjnovas/nolaborables.png?branch=master)](http://travis-ci.org/pjnovas/nolaborables)
API REST para exponer los feriados de Argentina

---
**Nuevo tipo de feriado `puente`**
---

### En que está desarrollado
Sitio web en NodeJS con Express y vistas en Jade. Tests con Mocha y Expect.js

### Como instalar
Primero instalar NodeJS (v. 0.10) y luego instalar las dependecias con NPM e iniciar el servicio web

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
o
grunt
```

#### Como contribuir
1. Correr los tests: Verde
2. Crear test para nueva funcionalidad
3. Correr el test: Rojo
4. Implementar codigo para la nueva funcionalidad
5. Correr los tests: Verde
6. git - Pull Request :)


## License

(The MIT License)

Copyright (c) 2012 Pablo Novas &lt;pjnovas@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
