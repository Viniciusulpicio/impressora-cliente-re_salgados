const axios = require("axios");
const { printer: ThermalPrinter, types: PrinterTypes } = require("node-thermal-printer");

const removerAcentos = texto =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "");

async function imprimirPedido(pedido) {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: '\\\\localhost\\knup',
    options: { timeout: 5000 },
  });

  printer.setCharacterSet("PC860_PORTUGUESE");

  printer.alignCenter();
  await printer.printImage('./logo.png');
  printer.newLine();
  printer.println(removerAcentos("**** NOVO PEDIDO ****"));
  printer.drawLine();

  printer.alignLeft();
  printer.println(`Pedido nº: ${pedido.id_pedido}`);
  printer.println(`Feito em: ${pedido.data_pedido}`);
  printer.newLine();

  pedido.itensPedido.forEach(item => {
    const totalItem = (item.quantidade * item.produto.preco).toFixed(2);
    printer.print(`${item.quantidade}x `);
    printer.println(removerAcentos(item.produto.nome));
    printer.print("   R$ ");
    printer.println(totalItem);
    printer.newLine();
  });

  printer.drawLine();
  printer.println(`TOTAL: R$ ${pedido.totalPedido.toFixed(2)}`);
  printer.println(`Status: ${pedido.status_pedido}`);
  printer.println(`Pagamento: ${pedido.forma_pagamento}`);
  printer.newLine();

  printer.println("Agendamento:");
  printer.println(`Data: ${pedido.data_agendada}`);
  printer.println(`Horario: ${pedido.hora_agendada}`);
  printer.newLine();

  if (pedido.cep && pedido.numero_casa) {
    printer.println("Tipo de pedido: ENTREGA");
    printer.println(`Endereço: CEP ${pedido.cep}, Nº ${pedido.numero_casa}`);
  } else {
    printer.println("Tipo de pedido: RETIRADA NO LOCAL");
  }

  printer.drawLine();
  await printer.execute();
}

async function verificarFila() {
  try {
    const { data: pedidos } = await axios.get("https://tiaresalgados.com.br/impressao/pendentes");

    for (const pedido of pedidos) {
      console.log(`🖨️ Imprimindo pedido ${pedido.id_pedido}`);
      await imprimirPedido(pedido);
      await axios.post(`https://tiaresalgados.com.br/impressao/concluido/${pedido.id_pedido}`);
    }
  } catch (err) {
    console.error("❌ Erro ao consultar/imprimir:", err.message);
  }
}

setInterval(verificarFila, 2000);
