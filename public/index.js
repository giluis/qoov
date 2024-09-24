(async function main() {
    let text = await (await fetch('../pricing_tiers.csv')).text()
    if (text) {
        const result = buildResult(text)
        let slider = document.querySelector(".motoristas_slider")
        if (slider) {
            slider?.addEventListener('input', _ => {
                updateValue(slider.value, result)
            }, false);

            // initial update ensures prices start out consistent
            updateValue(slider.value, result)
        }

    }


    setupFAQs()

    setupItemList()

    setupPaymentButtons()
})()

const actionItems = [
    {
        src: "assets/icon_target.jpeg",
        title: "Centralizar o seu negócio",
        text: " Todas as plataformas (Uber, Bolt, Via Verde e mais) reunidas num único lugar "
    },

    {
        src: "assets/icon_calculator.jpeg",
        title: "Calcular instantaneamente o seu lucro",
        text: "Insira todas as suas despesas (manutençoes, leasing/renting, combustível e mais)"
    },


    {
        src: "assets/icon_coin.jpeg",
        title: "Faturação geral",
        text: "Agrupe a faturação de ambas as plataformas (Uber e Bolt) e controle tudo simultaneamente"
    },

    {
        src: "assets/icon_plus.jpeg",
        title: "Apurar o vencimento dos seus motoristas",
        text: "Saiba o que pagar ao seu motorista para qualquer intervalo de tempo"
    },


    {
        src: "assets/icon_star.jpeg",
        title: "Comparar os seus motoristas",
        text: "Compare os ganhos e os gastos dos seus motoristas"
    },


    {
        src: "assets/icon_chat.jpeg",
        title: "Comunicar diretamente com os seus motoristas",
        text: "Envie relatórios para os seus motoritsas de forma instantânea"
    }];

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
    for (const b of buttons) {
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
    for (const e of document.querySelectorAll(".question_container")) {
        e.addEventListener("click", _ => {
            collapseFAQs()
            e.classList.add("selected")
        })
    }
}

function collapseFAQs() {
    for (const e of document.querySelectorAll(".question_container")) {
        e.classList.remove("selected")
    }
}

function buildResult(text) {
    const result = {}
    text.split('\n')
        .slice(1)
        .filter(l => l.trim().length > 0)
        .map(l => l.split(","))
        .forEach(items => {
            result[parseInt(items[0].trim())] = {
                precoBase: parseFloat(items[1].trim()),
                total: parseFloat(items[2].trim()),
                totalWithDiscount: parseFloat(items[3].trim()),
                discount: items[4].trim(),
                difference: parseFloat(items[5].trim())
            }
        });
    return result;
}

function updateValue(value, result) {
    let num_motoristas = Math.ceil(value / 1000 * 30);
    let discount = document.querySelector(".discount");
    let precoBase = document.querySelector(".precoBase");
    let pricing = result[num_motoristas < 29 ? num_motoristas : 29]
    discount.textContent = "-" + pricing.discount;
    precoBase.textContent = pricing.precoBase + "€";
    if (pricing.precoBase === result[1].precoBase) {
        discount.style.opacity = 0;
        document.querySelector(".previous_price").style.display = "none";
    } else {
        discount.style.opacity = 1
        document.querySelector(".previous_price").style.display = "block";
    }
    document.querySelector(".num_motoristas_display").textContent = num_motoristas;

}
const faqItems = document.querySelectorAll('.question_item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});
