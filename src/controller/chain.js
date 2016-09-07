import Series from 'hapi-next';

export default function() {
  let funcs = Array.prototype.slice.call(arguments);
  return function (request, reply){
    (new Series(funcs)).execute(request, reply);
  }
}
