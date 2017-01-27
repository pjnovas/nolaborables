
export default function(holidays, refs) {
  return holidays.map( holiday => {
    let h = Object.assign({}, refs[holiday.id], holiday)

    if (h.tipo === 'trasladable'){
      let { dia, mes, tipo, motivo, original } = h
      let [originalDay] = original.split('-');

      return {
        dia: Number(originalDay),
        mes,
        tipo,
        motivo,
        traslado: dia
      };
    }

    delete h.id;
    return h;
  });
}
