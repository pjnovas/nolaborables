
export default function(holidays, refs) {
  return holidays.map( holiday => {

    if (refs[holiday.id].tipo === 'trasladable'){
      let { dia, mes, id } = holiday;
      let { tipo, motivo, original } = refs[id];
      let [originalDay] = original.split('-');

      return {
        dia: +originalDay,
        mes,
        tipo,
        motivo,
        traslado: dia
      };
    }

    let result = { ...refs[holiday.id], ...holiday };
    delete result.id;
    return result;
  });
}
