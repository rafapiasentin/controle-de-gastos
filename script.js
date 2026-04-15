document.addEventListener("DOMContentLoaded", function () {

    let gastos = [];

    const form = document.getElementById("formGasto");
    const lista = document.getElementById("listaGastos");
    const totalSpan = document.getElementById("total");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const descricao = document.getElementById("descricao").value;
        const valor = parseFloat(document.getElementById("valor").value);
        const categoria = document.getElementById("categoria").value;

        if (!descricao || isNaN(valor) || !categoria) {
            alert("Preencha tudo corretamente!");
            return;
        }

        gastos.push({ descricao, valor, categoria });

        form.reset();

        renderizar();
    });

    function renderizar() {
        lista.innerHTML = "";

        gastos.forEach((gasto, index) => {
            const tr = document.createElement("tr");

            if (gasto.valor > 100) {
                tr.classList.add("alto");
            }

            tr.innerHTML = `
                <td>${gasto.descricao}</td>
                <td>${gasto.categoria}</td>
                <td>R$ ${gasto.valor.toFixed(2)}</td>
                <td>
                    <button class="btn-excluir" data-index="${index}">X</button>
                </td>
            `;

            lista.appendChild(tr);
        });

        calcularTotal();
    }

    function calcularTotal() {
        let total = gastos.reduce((acc, g) => acc + g.valor, 0);
        totalSpan.textContent = total.toFixed(2);
    }

    // EVENTO DE EXCLUSÃO (melhor prática)
    lista.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-excluir")) {
            const index = e.target.getAttribute("data-index");
            gastos.splice(index, 1);
            renderizar();
        }
    });

});