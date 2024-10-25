document.getElementById('startScan').addEventListener('click', () => {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.getElementById('interactive'), // El elemento donde se mostrará el video
            constraints: {
                facingMode: "environment" // Usar la cámara trasera (en dispositivos móviles)
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "upc_reader", "upc_e_reader"]
        }
    }, (err) => {
        if (err) {
            console.error("Error al inicializar Quagga: ", err);
            return;
        }
        console.log("Escáner iniciado");
        Quagga.start();
    });

    Quagga.onDetected((data) => {
        const code = data.codeResult.code;
        document.getElementById('result').innerText = `Código escaneado: ${code}`;
        Quagga.stop();
    });
});
