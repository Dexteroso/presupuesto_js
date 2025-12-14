let incomes = [
    new Ingreso("Quincena", 9000),
    new Ingreso("Venta", 400)
];

let expenses = [
    new Egreso("Renta", 900),
    new Egreso("Ropa", 400)
];

const totalIncomes = () => {
    let totalIncome = 0;
    for (let transaction of incomes) {
        totalIncome += transaction.valor;
    }
    return totalIncome;
};

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(ingreso.valor/totalIncomes())}</div>
                <div class="elemento_eliminar">
                    <ion-icon 
                        name="close-circle-outline" 
                        onclick="eliminarIngreso(${ingreso.id})">
                    </ion-icon>
                </div>
            </div>
        </div>
    `;
    return ingresoHTML;
};

const eliminarIngreso = (id) => {
    let indiceEliminar = incomes.findIndex(ingreso => ingreso.id === id);
    incomes.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
};

const cargarIngresos = () => {
    let ingresosHTML = "";
    for (let transaction of incomes) {
        ingresosHTML += crearIngresoHTML(transaction);
    }
    document.getElementById("lista-ingresos:").innerHTML = ingresosHTML;
};

const totalExpenses = () => {
    let totalExpense = 0;
    for (let transaction of expenses) {
        totalExpense += transaction.valor;
    }
    return totalExpense;
};

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalExpenses())}</div>
                <div class="elemento_eliminar">
                    <ion-icon 
                        name="close-circle-outline" 
                        onclick="eliminarEgreso(${egreso.id})">
                    </ion-icon>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
};

const eliminarEgreso = (id) => {
    let indiceEliminar = expenses.findIndex(egreso => egreso.id === id);
    expenses.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
};

const cargarEgresos = () => {
    let egresosHTML = "";
    for (let transaction of expenses) {
        egresosHTML += crearEgresoHTML(transaction);
    }
    document.getElementById("lista-egresos:").innerHTML = egresosHTML;
};


const formatoMoneda = (value) => {
    return value.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2
    });
};

const formatoPorcentaje = (value) => {
    return value.toLocaleString("es-MX", {
        style: "percent",
        minimumFractionDigits: 2
    });
};

const cargarCabecero = () => {
    let budget = totalIncomes() - totalExpenses();
    let expensePercentage = totalExpenses() / totalIncomes();

    document.getElementById("presupuesto").innerHTML = formatoMoneda(budget);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(expensePercentage);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIncomes());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalExpenses());

    // console.log(formatoMoneda(budget));
    // console.log(formatoPorcentaje(expensePercentage));
    // console.log(formatoMoneda(totalIncomes()));
    // console.log(formatoMoneda(totalExpenses()));
};

const agregarDato = () => {
    const forma = document.getElementById("forma");

    let tipo = forma.tipo.value;
    let descripcion = forma.descripcion.value;
let valor = parseFloat(
  forma.valor.value.replace(/[^0-9.-]+/g, '')
);

    if (descripcion !== "" && valor > 0) {

        if (tipo === "ingreso") {
            incomes.push(new Ingreso(descripcion, valor));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo === "egreso") {
            expenses.push(new Egreso(descripcion, valor));
            cargarCabecero();
            cargarEgresos();
        }
        forma.reset();
    }
};

const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

document.addEventListener('DOMContentLoaded', () => {
  const valorInput = document.getElementById('valor');
  if (!valorInput) return;

  // Valor inicial
  valorInput.value = '$0.00';

  valorInput.addEventListener('input', () => {
    // 1. Quitar todo excepto números
    let raw = valorInput.value.replace(/\D/g, '');

    // 2. Si está vacío
    if (raw === '') {
      valorInput.value = '$0.00';
      return;
    }

    // 3. Convertir a número con 2 decimales
    let number = parseInt(raw, 10) / 100;

    // 4. Formatear como moneda MXN
    valorInput.value = number.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    });
  });
});