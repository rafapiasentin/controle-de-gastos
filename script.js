document.addEventListener("DOMContentLoaded", () => {

    let gastos = []; // lista de gastos
    let editandoIndex = null; // controla se está editando algum item

    const form = document.getElementById("formGasto");
    const lista = document.getElementById("listaGastos");
    const totalSpan = document.getElementById("total");

    // quando envia o formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // impede recarregar a página

        const descricao = document.getElementById("descricao").value.trim();
        const valor = parseFloat(document.getElementById("valor").value);
        const categoria = document.getElementById("categoria").value;

        // validação básica
        if (!descricao || isNaN(valor) || valor <= 0 || !categoria) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const gasto = { descricao, valor, categoria };

        // se estiver editando, substitui
        if (editandoIndex !== null) {
            gastos[editandoIndex] = gasto;
            editandoIndex = null;
        } else {
            // senão, adiciona normalmente
            gastos.push(gasto);
        }

        form.reset(); // limpa o formulário
        renderizar(); // atualiza a tela
    });

    // função que mostra os gastos na tabela
    function renderizar() {
        lista.innerHTML = ""; // limpa a lista

        gastos.forEach((gasto, index) => {
            const tr = document.createElement("tr");

            // destaca valores altos
            if (gasto.valor > 100) {
                tr.classList.add("alto");
            }

            tr.innerHTML = `
                <td>${gasto.descricao}</td>
                <td>${gasto.categoria}</td>
                <td>R$ ${gasto.valor.toFixed(2)}</td>
                <td>
                    <button class="btn-editar" data-index="${index}">Editar</button>
                    <button class="btn-excluir" data-index="${index}">X</button>
                </td>
            `;

            lista.appendChild(tr);
        });

        calcularTotal(); // atualiza o total
    }

    // soma todos os valores
    function calcularTotal() {
        const total = gastos.reduce((acc, g) => acc + g.valor, 0);
        totalSpan.textContent = total.toFixed(2);
    }

    // clique nos botões da tabela
    lista.addEventListener("click", (e) => {

        const index = e.target.getAttribute("data-index");

        // remover item
        if (e.target.classList.contains("btn-excluir")) {
            gastos.splice(index, 1);
            renderizar();
        }

        // editar item
        if (e.target.classList.contains("btn-editar")) {
            const gasto = gastos[index];

            // joga os dados no formulário
            document.getElementById("descricao").value = gasto.descricao;
            document.getElementById("valor").value = gasto.valor;
            document.getElementById("categoria").value = gasto.categoria;

            editandoIndex = index; // ativa modo edição
        }
    });

});