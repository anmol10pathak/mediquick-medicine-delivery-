const medicines = [];

for (let i = 1; i <= 400; i++) {
  medicines.push({
    id: i,
    name: `Paracetamol ${i}mg`,
    price: Math.floor(Math.random() * 500) + 50,
    description: "Used for fever, headache and mild pain relief.",
    composition: "Paracetamol IP",
    category: "Fever",
    stock: Math.floor(Math.random() * 200),
    image: `https://picsum.photos/200?random=${i}` // working images
  });
}

module.exports = medicines;