const BASE_URL = "http://127.0.0.1:5000/api";

function generateCupcakeHTML(cupcake) {
    return `
      <div data-cupcake-id=${cupcake.id}>
        <li>
          ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
          <button class="delete-button">X</button>
        </li>
        <img class="Cupcake-img"
              src="${cupcake.image}"
              alt="(no image provided)">
      </div>
    `;
 }


async function showInitialCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $("#cupcake-list").append(newCupcake);
    }
}

$('#new-cupcake-form').on('submit', async function (e) {
    e.preventDefault();

    let flavor = $('#new-cupcake-form input[name="flavor"]').val();
    let size = $('#new-cupcake-form input[name="size"]').val();
    let rating = $('#new-cupcake-form input[name="rating"]').val();
    let image = $('#new-cupcake-form input[name="image"]').val();

    const response = await axios.post('/api/cupcakes', {
        flavor, size, rating, image
    });

    let newCupcake = $(generateCupcakeHTML(response.data.cupcake));

    $("#cupcake-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});

$(showInitialCupcakes);
