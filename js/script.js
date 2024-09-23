const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const fileInput = document.querySelector('input[name="imageFile"]');
  const file = fileInput.files[0];

  if (!file) {
    console.error("No file selected!");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = async () => {
    const imageBase64 = reader.result.split(",")[1];
    const data = {
      productID: formData.get("productID"),
      itemID: formData.get("itemID"),
      styleID: formData.get("styleID"),
      description: formData.get("description"),
      price: formData.get("price"),
      imageName: file.name,
      imageFile: imageBase64,
    };

    const response = await fetch(
      "https://ezzx57en9k.execute-api.us-east-2.amazonaws.com/PhotoToS3",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
  };

  reader.readAsDataURL(file);
});
