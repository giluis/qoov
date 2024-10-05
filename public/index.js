const pricing_tiers =
    [
        {},
        { precoBase: 12.00, total: 12.00, totalWithDiscount: 12.00, discount: "0%", difference: 0.00 },
        { precoBase: 12.00, total: 24.00, totalWithDiscount: 24.00, discount: " 0%", difference: 0.00 },
        { precoBase: 12.00, total: 36.00, totalWithDiscount: 36.00, discount: "0%", difference: 0.00 },
        { precoBase: 12.00, total: 48.00, totalWithDiscount: 48.00, discount: " 0%", difference: 0.00 },
        { precoBase: 12.00, total: 60.00, totalWithDiscount: 60.00, discount: " 0%", difference: 0.00 },
        { precoBase: 12.00, total: 72.00, totalWithDiscount: 72.00, discount: "0%", difference: 0.00 },
        { precoBase: 11.11, total: 84.00, totalWithDiscount: 77.78, discount: "8%", difference: 6.22 },
        { precoBase: 11.11, total: 96.00, totalWithDiscount: 88.89, discount: "8%", difference: 7.11 },
        { precoBase: 11.11, total: 108.00, totalWithDiscount: 100.00, discount: "8%", difference: 8.00 },
        { precoBase: 11.11, total: 120.00, totalWithDiscount: 111.11, discount: "8%", difference: 8.89 },
        { precoBase: 11.11, total: 132.00, totalWithDiscount: 122.22, discount: "8%", difference: 9.78 },
        { precoBase: 10.91, total: 144.00, totalWithDiscount: 130.91, discount: "10%", difference: 13.09 },
        { precoBase: 10.91, total: 156.00, totalWithDiscount: 141.82, discount: "10%", difference: 14.18 },
        { precoBase: 10.91, total: 168.00, totalWithDiscount: 152.73, discount: "10%", difference: 15.27 },
        { precoBase: 10.91, total: 180.00, totalWithDiscount: 163.64, discount: "10%", difference: 16.36 },
        { precoBase: 10.91, total: 192.00, totalWithDiscount: 174.55, discount: "10%", difference: 17.45 },
        { precoBase: 10.91, total: 204.00, totalWithDiscount: 185.45, discount: "10%", difference: 18.55 },
        { precoBase: 10.91, total: 216.00, totalWithDiscount: 196.36, discount: "10%", difference: 19.64 },
        { precoBase: 10.91, total: 228.00, totalWithDiscount: 207.27, discount: "10%", difference: 20.73 },
        { precoBase: 10.71, total: 240.00, totalWithDiscount: 214.29, discount: "12%", difference: 25.71 },
        { precoBase: 10.71, total: 252.00, totalWithDiscount: 225.00, discount: "12%", difference: 27.00 },
        { precoBase: 10.71, total: 264.00, totalWithDiscount: 235.71, discount: "12%", difference: 28.29 },
        { precoBase: 10.71, total: 276.00, totalWithDiscount: 246.43, discount: "12%", difference: 29.57 },
        { precoBase: 10.71, total: 288.00, totalWithDiscount: 257.14, discount: "12%", difference: 30.86 },
        { precoBase: 10.71, total: 300.00, totalWithDiscount: 267.86, discount: "12%", difference: 32.14 },
        { precoBase: 10.71, total: 312.00, totalWithDiscount: 278.57, discount: "12%", difference: 33.43 },
        { precoBase: 10.71, total: 324.00, totalWithDiscount: 289.29, discount: "12%", difference: 34.71 },
        { precoBase: 10.71, total: 336.00, totalWithDiscount: 300.00, discount: "12%", difference: 36.00 },
        { precoBase: 10.71, total: 348.00, totalWithDiscount: 310.71, discount: "12%", difference: 37.29 },
        { precoBase: 10.71, total: 360.00, totalWithDiscount: 321.43, discount: "12%", difference: 38.57 },
    ];
const actionItems = [
    {
        src: "public/assets/icon_target.jpeg",
        title: "Centralizar o seu negócio",
        text: "Todas as plataformas (Uber, Bolt, Via Verde e mais) reunidas num único lugar "
    },

    {
        src: "public/assets/icon_calculator.jpeg",
        title: "Calcular instantaneamente o seu lucro",
        text: "Insira todas as suas despesas (manutençoes, leasing/renting, combustível e mais)"
    },


    {
        src: "public/assets/icon_coin.jpeg",
        title: "Faturação geral",
        text: "Agrupe a faturação de ambas as plataformas (Uber e Bolt) e controle tudo simultaneamente"
    },

    {
        src: "public/assets/icon_plus.jpeg",
        title: "Apurar o vencimento dos seus motoristas",
        text: "Saiba o que pagar ao seu motorista para qualquer intervalo de tempo"
    },


    {
        src: "public/assets/icon_star.jpeg",
        title: "Comparar os seus motoristas",
        text: "Compare os ganhos e os gastos dos seus motoristas"
    },


    {
        src: "public/assets/icon_chat.jpeg",
        title: "Comunicar diretamente com os seus motoristas",
        text: "Envie relatórios para os seus motoritsas de forma instantânea"
    }];

(async function main() {
    // let text = await (await fetch('./pricing_tiers.csv')).text()
    let slider = document.querySelector(".motoristas_slider")
    if (slider) {
        slider?.addEventListener('input', _ => {
            updateValue(slider.value, pricing_tiers)
        }, false);

        // initial update ensures prices start out consistent
        updateValue(slider.value, pricing_tiers)
    }



    setupFAQs()

    setupItemList()

    setupPaymentButtons()
})()


function setupItemList() {
    for (const { src, title, text } of actionItems) {
        createItem(src, title, text)
    }
}

function grabButtons() {
    const images = document.querySelectorAll(".register_container4  .alternatives img");
    const creditcard_button = document.querySelector(".register_container4 .creditcard");
    const buttons = [creditcard_button, ...images]
    return buttons;
}

function setupPaymentButtons() {
    const buttons = grabButtons();
    if (!buttons) {
        return
    }
    for (const b of buttons) {
        if (!b) { continue; }
        b.addEventListener("click", _ => {
            deselectPaymentButtons(buttons)
            selectPaymentButton(b)
        })
    }
}

/**
 * 
 * @param {HTMLCollection} buttons 
 */
function deselectPaymentButtons(buttons) {
    for (const button of buttons) {
        button.classList.remove("selected");
    }
}

/**
 * 
 * @param {Element} button 
 */
function selectPaymentButton(button) {
    button.classList.add("selected");
}


function redirectFromPayment() {
    const buttons = grabButtons();
    // assumes at least one will be selected
    let a = buttons.filter(b => b.classList.contains("selected"));

    if (a[0]) {
        switch ([...a[0].classList].filter(c => c.includes("redirect"))[0].split("_")[1]) {
            case "paypal":
                alert("pagar com paypal")
                break;
            case "google":
                alert("pagar com google")
                break;
            case "apple":
                alert("pagar com apple")
                break;
            case "card":
                window.location.href = "card_payment.html"
                break;

        }
    }
}
// <div class="actionitem">
//     <img src="assets/icon_calculator.jpeg" alt="calculator item">
//     <div class="actioniteminfo">
//         <div class="itemtitle">Calcular instantaneamente o seu lucro</div>
//         <div class="itemtext">Insira todas as suas despesas (manutençoes, leasing/renting, combustível e
//             mais)</div>
//     </div>
// </div>

function createItem(imgsrc, inputTitle, inputText) {
    const root = document.createElement('div');
    root.classList.add("actionitem");

    const img = document.createElement('img');
    img.setAttribute('src', imgsrc);

    root.appendChild(img)

    const iteminfo = document.createElement('div');
    iteminfo.classList.add('actioniteminfo');

    const itemtitle = document.createElement('div');
    itemtitle.classList.add('itemtitle');
    itemtitle.innerText = inputTitle

    const itemtext = document.createElement('div');
    itemtext.classList.add('itemtext');
    itemtext.innerText = inputText;

    iteminfo.appendChild(itemtitle)
    iteminfo.appendChild(itemtext)

    root.appendChild(iteminfo)

    document.querySelector("#actionitemlist")?.appendChild(root)
}

function setupFAQs() {
    for (const e of document.querySelectorAll(".question_item")) {
        e.addEventListener("click", _ => {
            collapseFAQs()
            e.classList.add("active")
        })
    }
}

function collapseFAQs() {
    for (const e of document.querySelectorAll(".question_item")) {
        e.classList.remove("active")
    }
}

// function buildResult(text) {
//     const result = {}
//     text.split('\n')
//         .slice(1)
//         .filter(l => l.trim().length > 0)
//         .map(l => l.split(","))
//         .forEach(items => {
//             result[parseInt(items[0].trim())] = {
//                 precoBase: parseFloat(items[1].trim()),
//                 total: parseFloat(items[2].trim()),
//                 totalWithDiscount: parseFloat(items[3].trim()),
//                 discount: items[4].trim(),
//                 difference: parseFloat(items[5].trim())
//             }
//         });
//     return result;
// }

function updateValue(value, result) {
    let num_motoristas = Math.ceil(value / 1000 * 30);
    let desconto = document.querySelector(".desconto");
    let a = document.querySelectorAll(".desconto > *");
    for (const old_element of a) {
        if (old_element.classList.contains("num_motoristas_container")) {
            continue;
        }
        desconto.removeChild(old_element);
    }

    if (num_motoristas > 29.9) {
        desconto.dataset.over30 = "over";
        document.querySelector(".num_motoristas_display").textContent = `30+`;
        let plano = document.createElement("div");
        plano.innerText = "O seu plano";
        plano.classList.add("plano");

        let subtitle = document.createElement("div");
        subtitle.innerText = "Contacte a equipa comercial para obter o seu plano detalhadamente";
        subtitle.classList.add("subtitle");

        let but = document.createElement("a");
        but.innerText = "Contactar a equipa comercial";
        but.classList.add("bigbutton", "bitbutton-animated");

        desconto.append(plano, subtitle, but)

        // num_motoristas = 30;
        // let discount = document.querySelector(".discount");
        // let precoBase = document.querySelector(".precoBase");
        // let pricing = result[num_motoristas < 29 ? num_motoristas : 29]
        // discount.textContent = "-" + pricing.discount;
        // precoBase.textContent = pricing.precoBase + "€";
        // if (pricing.precoBase === result[1].precoBase) {
        //     discount.style.opacity = 0;
        //     document.querySelector(".previous_price").style.display = "none";
        // } else {
        //     discount.style.opacity = 1
        //     document.querySelector(".previous_price").style.display = "block";
        // }
    } else {
        num_motoristas = Math.min(num_motoristas, 30);
        desconto.dataset.over30 = "under";

        let pricing = result[num_motoristas < 29 ? num_motoristas : 29]

        let discount = document.createElement("div");
        discount.classList.add("discount");
        discount.textContent = "-" + pricing.discount;

        let plano = document.createElement("div");
        plano.classList.add("plano");
        plano.textContent = "O seu plano"

        let precoBase = document.createElement("div");
        precoBase.classList.add("precoBase")
        precoBase.textContent = pricing.precoBase + "€";

        let previous_price = document.createElement("div");
        previous_price.classList.add("previous_price")
        previous_price.textContent = 12 + "€";

        let diffPrecos = document.createElement("div");
        diffPrecos.classList.add("diferencaPrecos")
        diffPrecos.append(precoBase, previous_price);

        let pormotorista = document.createElement("div");
        pormotorista.classList.add("pormotorista")
        pormotorista.textContent = "por motorista";

        let mensalmente = document.createElement("div");
        mensalmente.classList.add("mensalmente")
        mensalmente.textContent = "cobrado mensalmente";

        desconto.append(discount, plano, diffPrecos, pormotorista, mensalmente);
        if (pricing.precoBase === result[1].precoBase) {
            discount.style.opacity = 0;
            document.querySelector(".previous_price").style.display = "none";
        } else {
            discount.style.opacity = 1
            document.querySelector(".previous_price").style.display = "block";
        }
        document.querySelector(".num_motoristas_display").textContent = num_motoristas;
    }

}
const faqItems = document.querySelectorAll('.question_item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});


// TODO: Add dynamically introduced opinions
function setupOpinions() {

}
const opinions = [
    {
        title: "Empresa XPTO 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat sed cras ornare arcu. Consequat semper viverra nam libero justo laoreet sit amet cursus..",
        prof_pic_placement: "FM",
        author_name: "Francisco Martins",
        author_role: "Diretor Geral"
    },
    {
        title: "Empresa XPTO 2",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat sed cras ornare arcu. Consequat semper viverra nam libero justo laoreet sit amet cursus..",
        prof_pic_placement: "GM",
        author_name: "Gonçalo Martins",
        author_role: "CEO"
    },
    {
        title: "Empresa XPTO 3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat sed cras ornare arcu. Consequat semper viverra nam libero justo laoreet sit amet cursus..",
        prof_pic_placement: "AM",
        author_name: "Bernardo Martins",
        author_role: "CFO"
    },
    {
        title: "Empresa XPTO 4",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat sed cras ornare arcu. Consequat semper viverra nam libero justo laoreet sit amet cursus..",
        prof_pic_placement: "PM",
        author_name: "Pedro Martins",
        author_role: "CTO"
    },
]

