
(async function main() {
    let text = await (await fetch('pricing_tiers.csv')).text()
    const result = buildResult(text)

    let slider = document.querySelector(".motoristas_slider")

    slider.addEventListener('input', _ => {
        updateValue(slider.value, result)
    }, false);

    // initial update ensures consistency in prices
    updateValue(slider.value, result)

    setFAQs()
})()

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

function updateValue(value, result){
        let num_motoristas = value;
        let discount = document.querySelector(".discount");
        let precoBase = document.querySelector(".precoBase");
        discount.textContent ="-" + result[value].discount;
        precoBase.textContent = result[value].precoBase + "€";
        if(result[num_motoristas].precoBase === result[1].precoBase  ) {
            discount.style.opacity = 0;
            document.querySelector(".previous_price").style.display = "none";
        } else {
            discount.style.opacity = 1
            document.querySelector(".previous_price").style.display = "block";
        }
        document.querySelector(".num_motoristas_display").textContent = value;

}

