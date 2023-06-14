let saldo = 90000
let edad = 40

let general = `select c.run, c.nombre, c.apellido, t.tipo, t.saldo from cliente c, cuenta t where c.id = t.id_cliente `


function consulta(a) {
    // condiciones dependiendo del tipo de consulta
    let cliente_saldo = `and t.saldo = ${saldo} `
    
    //let cliente_edad = `and `
    general += cliente_saldo
}

console.log(general)